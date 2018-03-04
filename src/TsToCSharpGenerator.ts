
import * as sast from "ts-simple-ast"

import {SourceFile, SyntaxKind, TypeGuards, ts} from "ts-simple-ast";

import * as emitter from "./CSharpEmitter";
import {ContextInterface} from "./Context";

import {
  addWhitespace,
  getWhitespace,
  emitStatic,
  addLeadingComment,
  addTrailingComment,
  addSemicolon,
  addComma,
  endNode,
  generateExportForClass,
  generateExportForProperty,
  generateExportForMethod,
  pushContext,
  swapContext,
  popContext,
  identifyInterfaces,
  isDeclarationOfInterface,
  generateExportForInterfaceDeclaration,
  loadInterfaceProperties,
  loadInterfaceMethods,
  loadInterfaceIndexers,
} from './GeneratorHelpers';

export function TsToCSharpGenerator(node: SourceFile, context: ContextInterface): string {
    const source: string[] = [];

    //console.log("Identifying interfaces for later class implementations")
    identifyInterfaces(node, context);
    //console.log("Total interfaces identified: %d", context.diagnostics.identifiedInterfaces);


    visitStatements(source, node, context);
    addWhitespace(source, node, context);
    endNode(node, context);
    return source.join('');
}

function visit(node: sast.Node, context: ContextInterface): string {
  if ((visitor as any)[node.getKind()]) {
    return (visitor as any)[node.getKind()](node, context);
  }
  throw new Error(`Unknown node kind ${SyntaxKind[node.getKind()]}`);
}

// tslint:disable-next-line cyclomatic-complexity
function visitStatements(source: string[], node: sast.SourceFile, context: ContextInterface): void {
  node.getStatements().forEach(statement =>
    source.push(visitStatement(statement, context))
  );
}

// tslint:disable-next-line cyclomatic-complexity
function visitStatement(node: sast.Statement, context: ContextInterface): string {

   switch (node.getKind()) {
     case SyntaxKind.VariableStatement:
       return visitVariableStatement(node as sast.VariableStatement, context);
    case SyntaxKind.InterfaceDeclaration:
      return visitInterfaceDeclaration(node as sast.InterfaceDeclaration, context);
    default:
      throw new Error(`Unknown statement kind '${SyntaxKind[node.getKind()]}'`);
  }
}

function visitModifiers(source: string[], node: sast.ModifierableNode, context: ContextInterface): void {
    node.getModifiers().forEach(modifier => {
      source.push(emitter.emitModifierable(modifier, context));
    });
}

function visitTypeParameters(source: string[], node: sast.TypeParameteredNode, context: ContextInterface): void {
  node.getTypeParameters().forEach(typeParameter => {
    source.push(emitter.emitTypeParameter(typeParameter, context));
  });
}

function visitMembers(source: string[],
  node: (sast.InterfaceDeclaration | sast.ClassDeclaration | sast.TypeLiteralNode),
  context: ContextInterface): void {

    const members = node.getMembers();
    for (let x = 0; x < members.length; x++)
    {
      let member = members[x];
      source.push(visit(member, context));
      addTrailingComment(source, context.offset, node, context);
    }
}

function visitIndexSignature(node: sast.IndexSignatureDeclaration, context: ContextInterface): string {
  const source: string[] = [];

  addLeadingComment(source, node, context);
  addWhitespace(source, node, context);

  // visit the modifiers.
  visitModifiers(source, node, context);

  if (node.compilerNode.modifiers) {
    node.compilerNode.modifiers.forEach(modifier => {
      source.push(emitter.emitModifierable(sast.createWrappedNode(modifier), context));
    });
  }

  // let's push the name node offset so spacing will be ok.
  // Modifiers seem to mess the spacing up with whitespace
  context.offset = node.getKeyNameNode().getStart();
  pushContext(context);

  // // emit our property type which is at the end.
  source.push(visitTypeNode(node.getReturnTypeNode(), context));

  // make sure we put a spacer in there but we do not have optional properties.
  // if (node.hasQuestionToken()) {
  //   source.push("? ");
  // }
  // else
  // {
    source.push(" ");
  //}

  // now reposition back to the start
  swapContext(context);

  emitStatic(source, 'this[', node, context);

  source.push(visitTypeNode(node.getKeyTypeNode(), context));
  source.push(" ");
  source.push(emitter.emitParameterName(node.getKeyNameNode(), context));

  emitStatic(source, ']', node, context);

  if (node.isReadonly())
  {
    if (context.emitImplementation)
    {
      source.push(" => throw new NotImplementedException();");
    }
    else
      source.push(" { get; }");
  }
  else
  {
    if (context.emitImplementation)
    {
      source.push(" { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }");
    }
    else
      source.push(" { get; set; }");
  }

  // Now reposition to the end of the indexer type
  popContext(context);

  endNode(node, context);
  addTrailingComment(source, node, context);
  return source.join('');
}

function visitHeritageClause(node: sast.HeritageClause, context: ContextInterface): string {
  const source: string[] = [];
  addLeadingComment(source, node, context);

  const clauseTypes = node.getTypeNodes();
  const n = clauseTypes.length;

  if (n > 0)
  {
    for (let t = 0; t < n; t++)
    {
      source.push(emitter.emit(clauseTypes[t], context));
      if ((t < n - 1)) {
        source.push(", ");
      }
    };
  }
  return source.join('');
}

function visitHeritageClauses(source: string[],
  node: (sast.HeritageClauseableNode),
  context: ContextInterface): void {

    const ancestors = node.getHeritageClauses();
    const n = ancestors.length;
    if (ancestors.length > 0)
    {
      source.push(" : ");
      for (let x = 0; x < n; x++)
      {
        const leaf = ancestors[x];
        source.push(visit(leaf, context));
        if ((x < n - 1)) {
          source.push(", ");
        }
      }
    }
  }

  function visitInterfaceDeclaration(node: sast.InterfaceDeclaration, context: ContextInterface): string {
    const source: string[] = [];
    addLeadingComment(source, node, context);
    addWhitespace(source, node, context);

    if (node.getModifiers().length == 0)
    {
      if (context.genOptions.interfaceAccessModifier && context.genOptions.interfaceAccessModifier.length > 0)
      {
        source.push(context.genOptions.interfaceAccessModifier, " ");
      }
    }
    else 
    {
      visitModifiers(source, node, context);
    }

    // emit first punctuation which should be an opening brace.
    source.push(emitter.emit(node.getFirstChildByKind(SyntaxKind.InterfaceKeyword), context));

    addWhitespace(source, node, context);
    source.push(emitter.emitInterfaceName(node.getNameNode(), context));

    emitter.emitTypeParameters(source, node, context);

    visitHeritageClauses(source, node, context);

    emitter.emitTypeConstraints(source, node, context);

    addTrailingComment(source, context.offset, node, context);

    // emit first punctuation which should be an opening brace.
    source.push(emitter.emit(node.getFirstChildByKind(SyntaxKind.FirstPunctuation), context));

    addTrailingComment(source, context.offset, node, context);

    visitMembers(source, node, context);
    addLeadingComment(source, context.offset, node, context);

    // emit the closing brace
    source.push(emitter.emit(node.getLastToken(), context));
    endNode(node, context);
    addTrailingComment(source, node, context);
    return source.join('');
 }

  function visitTypeNode(node: sast.Node,
                          context: ContextInterface): string {
    return emitter.emitTypeNode(node, context);
  }



  function visitPropertySignature(node: sast.PropertySignature, context: ContextInterface): string {

    const source: string[] = [];
    addLeadingComment(source, node, context);

    // This will generate an Export attribute as well as takes into account whitespace
    source.push(generateExportForProperty(node, context));

    visitModifiers(source, node, context);

    // let's push the name node offset so spacing will be ok.
    // Modifiers seem to mess the spacing up with whitespace
    context.offset = node.getNameNode().getStart();
    pushContext(context);

    // emit our property type which is at the end.
    source.push(visitTypeNode(node.getTypeNode(), context));

    // make sure we put a spacer in there but we do not have optional properties.
    // if (node.hasQuestionToken()) {
    //   source.push("? ");
    // }
    // else
    // {
      source.push(" ");
    //}

    // now reposition back to the start
    swapContext(context);

    source.push(emitter.emitPropertyName(node.getNameNode(), context));

    // Emit the C# Body code of the property
    source.push(emitter.emitPropertyBody(node, context));

    // Now reposition to the end of the method type
    popContext(context);    

    endNode(node, context);
    addTrailingComment(source, node, context);
    return source.join('');
 }

 function visitParameter(source: string[], node: sast.ParameterDeclaration, context: ContextInterface): void {

    // We have to take into account that the type follows the name
    // let's push the parameter name node offset so spacing will be ok.
    // The comma separator will mess the spacing up with whitespace
    context.offset = node.getStart();
    pushContext(context);

    // First check if it is a rest parameter
    if (node.isRestParameter())
    {
      // emit our parameter type which is at the end.
      source.push(emitter.emitRestParameter(node.getTypeNode(), context));

    }
    else
    {
      // emit our parameter type which is at the end.
      source.push(visitTypeNode(node.getTypeNode(), context));
    }
    // let's also put a spacer in there
    source.push(" ");

    // now reposition back to the start
    swapContext(context);

    source.push(emitter.emitParameterName(node.getNameNode(), context));

    // now reposition back to the start
    popContext(context);

 }

 function visitParameters(source: string[], node: sast.ParameteredNode, context: ContextInterface): void {

    const parmList = node.getParameters();

    let n = node.getParameters().length;

    if (n > 0)
    {
      for (let p = 0; p < n; p++)
      {
          visitParameter(source, parmList[p], context);
          if (p < n - 1)
          {
            source.push(", ");
          }
      }
    }
}


 // tslint:disable-next-line cyclomatic-complexity
 function visitMethodSignature(node: sast.MethodSignature, context: ContextInterface): string {
    const source: string[] = [];
    addLeadingComment(source, node, context);

    // This will generate an Export attribute as well as takes into account whitespace
    source.push(generateExportForMethod(node, context));

    // let's push the name node offset so spacing will be ok.
    // Modifiers seem to mess the spacing up with whitespace
    context.offset = node.getNameNode().getStart();
    pushContext(context);


    // emit our method type which is at the end.
    source.push(visitTypeNode(node.getReturnTypeNode(), context));
    // make sure we put a spacer in there
    source.push(" ");

    // now reposition back to the start
    swapContext(context);

    visitTypeParameters(source, node, context);

    source.push(emitter.emitMethodName(node.getNameNode(), context));

    emitStatic(source, '(', node, context);

    visitParameters(source, node, context);

    emitStatic(source, ')', node, context);

    // Now reposition to the end of the method type
    popContext(context);

    source.push(emitter.emitMethodBody(node, context));

    endNode(node, context);
    addTrailingComment(source, context.offset, node, context);
    return source.join('');
  }


function visitVariableStatement(node: sast.VariableStatement, context: ContextInterface): string {
  const source: string[] = [];
  addLeadingComment(source, node, context);

  visitVariableDeclarationList(source, node.getDeclarationList(), context);
  endNode(node, context);
  addTrailingComment(source, node, context);
  return source.join('');
}

function visitVariableDeclarationList(source: string[], node: sast.VariableDeclarationList, context: ContextInterface) : void {

  switch(node.getDeclarationTypeKeyword().getKind())
  {
    case SyntaxKind.VarKeyword:
      visitVariableDeclarations(source, node, context);
      break;
    default:
      context.diagnostics.pushErrorAtLoc("Declaration type " + node.getDeclarationTypeKeyword().getKindName() + " is not yet supported", node);

  }
}

function visitVariableDeclarations(source: string[], node: sast.VariableDeclarationList, context: ContextInterface) : void {

const declarations = node.getDeclarations();

for (let x = 0; x < declarations.length; x++)
{
  let declaration = declarations[x];
  source.push(visit(declaration, context));
  addTrailingComment(source, context.offset, node, context);
}

}

function visitVariableDeclaration(node: sast.VariableDeclaration, context: ContextInterface): string {

  const source: string[] = [];
  addLeadingComment(source, node, context);

  if (isDeclarationOfInterface(node))
  {
    source.push(visitDeclarationOfInterface(node, context));
  }
  else
  {
    context.diagnostics.pushWarningAtLoc("Variable Declarations other than Interfaces are not supported", node);
  }

  endNode(node, context);
  addTrailingComment(source, node, context);
  return source.join('');
}

function visitDeclarationOfInterface(node: sast.VariableDeclaration, context: ContextInterface): string {

  const source: string[] = [];
  addLeadingComment(source, node, context);

  // This will generate an Export attribute as well as takes into account whitespace
  source.push(generateExportForInterfaceDeclaration(node, context));

  // Here we emit the C# definition
  emitter.emitClassDefinitionOfInterfaceDeclaration(source, node, context, context.genOptions.isCaseChange && context.genOptions.isCaseChangeClasses);

  source.push(visit(node.getTypeNode(), context));

  return source.join('');
}

// A TypeLiteral is the declaration node for an anonymous symbol.
function visitTypeLiteral(node: sast.TypeLiteralNode, context: ContextInterface) : string {

  const source: string[] = [];

  addLeadingComment(source, node, context);
  addWhitespace(source, node, context);

  // emit first punctuation which should be an opening brace.
  source.push(emitter.emit(node.getFirstChildByKind(SyntaxKind.FirstPunctuation), context));

  addTrailingComment(source, node.getFirstChildByKind(SyntaxKind.FirstPunctuation), context );
  addWhitespace(source, node, context);

  // Emit the constructors of the anonymous symbol
  visitConstructors(source, node, context);
  
  // Tell the emitter that we will be emitting implementations
  context.emitImplementation = true;


  // First process properties.

  // create a property signature bag 
  const propertiesBag = new Map<string, sast.PropertySignature>();

  // accumulate all the existing properties defined in the type.
  const propertySignatures = node.getDescendantsOfKind(SyntaxKind.PropertySignature);

  let prototypeDefinition : sast.InterfaceDeclaration = null;

  // load all the properties except for the "prototype" property which defines the interface implementation
  for (let x = 0; x < propertySignatures.length; x++)
  {
    let property = propertySignatures[x];
    if (property.getName() === "prototype")
    {
      const propertyTypeNode = property.getTypeNode();

      if (TypeGuards.isTypeReferenceNode(propertyTypeNode))
      {
        const interfaceName = propertyTypeNode.getText();
        prototypeDefinition = propertyTypeNode.getSourceFile().getInterface(interfaceName);
      }
      
    }
    else
    {
      propertiesBag.set(property.getName(), property);
    }
  }

  // We now need to load all the properties of the interface defined by the "prototype" property
  // definition for the TypeLiteralNode.
  if (prototypeDefinition)
  {
    loadInterfaceProperties(propertiesBag, prototypeDefinition)
  }

  for (const property of propertiesBag.values()) {

    pushContext(context);
    
    context.offset = property.getPos();
    source.push(visit(property, context));
    addTrailingComment(source, context.offset, node, context);
    
    popContext(context);
  }

  // Then process functions.
  const methods = node.getDescendantsOfKind(SyntaxKind.MethodSignature);

  // create a method signature bag 
  const methodsBag = new Map<string, sast.MethodSignature>();

  for (let x = 0; x < methods.length; x++)
  {
    let method = methods[x];
    methodsBag.set(method.getName(), method);

  }
  // We now need to load all the methods of the interface defined by the "prototype" property
  // definition for the TypeLiteralNode.
  if (prototypeDefinition)
  {
    loadInterfaceMethods(methodsBag, prototypeDefinition)
  }
  
  for (const method of methodsBag.values()) {

    pushContext(context);
    
    context.offset = method.getPos();
    source.push(visit(method, context));
    addTrailingComment(source, context.offset, node, context);
  
    popContext(context);
  }

  // Then process indexers.
  const indexers = node.getDescendantsOfKind(SyntaxKind.IndexSignature);

  // create an index signature bag 
  const indexersBag = new Map<string, sast.IndexSignatureDeclaration>();

  for (let x = 0; x < indexers.length; x++)
  {
    let indexer = indexers[x];
    indexersBag.set("this[]", indexer);

  }
  // We now need to load all the inexers of the interface defined by the "prototype" property
  // definition for the TypeLiteralNode.
  if (prototypeDefinition)
  {
    loadInterfaceIndexers(indexersBag, prototypeDefinition)
  }
  
  for (const indexer of indexersBag.values()) {

    pushContext(context);
    
    context.offset = indexer.getPos();
    source.push(visit(indexer, context));
    addTrailingComment(source, context.offset, node, context);
  
    popContext(context);
  }


  // Reset the flag for emitting implementations
  context.emitImplementation = false;

  source.push(emitter.emit(node.getFirstChildByKind(SyntaxKind.CloseBraceToken), context));
  endNode(node, context);
  return source.join('');

}

function visitConstructors(source: string[], node: sast.TypeLiteralNode, context: ContextInterface) : void {

  const constructors = node.getConstructSignatures();
  for (let c = 0; c < constructors.length; c++)
  {
    source.push(visit(constructors[c], context));
  }
}

// tslint:disable-next-line cyclomatic-complexity
function visitConstructSignature(node: sast.ConstructSignatureDeclaration, context: ContextInterface): string {
  
  const source: string[] = [];
  
  // We may be jumping around processing AST nodes out of order so we need to actually set the 
  // context offset ourselves.  Here we set the context offset to be the begging of the node.
  context.offset = node.getPos();
  addLeadingComment(source, node.getPos(), node, context);
  addWhitespace(source, node, context);

  const parameters = node.getTypeParameters();

  pushContext(context);

  // the constructors in this case do not allow modifiers so we will make it public by default
  source.push("public");

  // emit our constructor type which is at the end.
  const savePrefixInterface = context.genOptions.isPrefixInterface;
  const saveCaseChangeInterfaces = context.genOptions.isCaseChangeInterfaces;
  context.genOptions.isPrefixInterface = false;
  context.genOptions.isCaseChangeInterfaces = false;
  
  addWhitespace(source, node.getReturnTypeNode(), context);
  source.push(visitTypeNode(node.getReturnTypeNode(), context));
  
  context.genOptions.isCaseChangeInterfaces = saveCaseChangeInterfaces;
  context.genOptions.isPrefixInterface = savePrefixInterface;

  // make sure we put a spacer in there
  source.push(" ");

  // now reposition back to the start
  swapContext(context);

  visitTypeParameters(source, node, context);

  emitStatic(source, '(', node, context);

  visitParameters(source, node, context);

  emitStatic(source, ')', node, context);

  // Now reposition to the end of the method type
  popContext(context);

  // Make sure we add a body
  source.push(" { }");

  //addSemicolon(source, node, context);
  endNode(node, context);
  addTrailingComment(source, context.offset, node, context);
  return source.join('');
}

const visitor = {
  [SyntaxKind.SourceFile]: TsToCSharpGenerator,
  [SyntaxKind.PropertySignature]: visitPropertySignature,
  [SyntaxKind.MethodSignature]: visitMethodSignature,
  [SyntaxKind.HeritageClause]: visitHeritageClause,
  [SyntaxKind.IndexSignature]: visitIndexSignature,
  [SyntaxKind.VariableDeclaration]: visitVariableDeclaration,
  [SyntaxKind.ConstructSignature]: visitConstructSignature,
  [SyntaxKind.TypeLiteral]: visitTypeLiteral,

};