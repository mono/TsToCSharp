
import * as sast from "ts-simple-ast"

import {SourceFile, SyntaxKind, TypeGuards} from "ts-simple-ast";

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
} from './GeneratorHelpers';

import { InterfaceTrackingMap } from './DataStructures';

export function TsToCSharpGenerator(node: SourceFile, context: ContextInterface): string {
    const source: string[] = [];

    //console.log("Identifying interfaces for later class implementations")
    const total = identifyInterfaces(node, context);
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
    emitter.emitTypeParameter(source, typeParameter, context);
  });
}

function visitMembers(source: string[], 
  node: (sast.InterfaceDeclaration | sast.ClassDeclaration), 
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
  source.push(emitter.emitPropertyName(node.getKeyNameNode(), context));
  
  emitStatic(source, ']', node, context);

  if (node.isReadonly())
  {
    source.push(" { get; }");
  }
  else
  {
    source.push(" { get; set; }");
  }

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
    
    visitModifiers(source, node, context);

    // emit first punctuation which should be an opening brace.
    source.push(emitter.emit(node.getFirstChildByKind(SyntaxKind.InterfaceKeyword), context));    
    
    addWhitespace(source, node, context);
    source.push(emitter.emitInterfaceName(node.getNameNode(), context));

    if (!InterfaceTrackingMap.has(node.getName()))
      InterfaceTrackingMap.set(node.getName(), node);

    visitHeritageClauses(source, node, context);    

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
    
    if (node.isReadonly())
    {
      source.push(" { get; }");
    }
    else
    {
      source.push(" { get; set; }");
    }
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

    addSemicolon(source, node, context);
    endNode(node, context);
    addTrailingComment(source, context.offset, node, context);
    return source.join('');
  }


function visitVariableStatement(node: sast.VariableStatement, context: ContextInterface): string {
   const source: string[] = [];
   addLeadingComment(source, node, context);
//   emitModifiers(source, node, context);
//   source.push(emitVariableDeclarationList(node.declarationList, context));
   addSemicolon(source, node, context);
   endNode(node, context);
   addTrailingComment(source, node, context);
   return source.join('');
 }


// function visitTypeParameter(node: sast.TypeParameterDeclaration, context: VisitorContext): string {
//   const source: string[] = [];
//   addWhitespace(source, node, context);
//   //source.push(emitter.emitIdentifier(node., context));
//   // if (node.constraint) {
//   //   emitStatic(source, 'extends', node, context);
//   //   addWhitespace(source, node, context);
//   //   source.push(emitTypeNode(node.constraint, context));
//   // }
//   // if (node.default) {
//   //   emitStatic(source, '=', node, context);
//   //   addWhitespace(source, node, context);
//   //   source.push(emitTypeNode(node.default, context));
//   // }
//   endNode(node, context);
//   return source.join('');
// }


const visitor = {
  [SyntaxKind.SourceFile]: TsToCSharpGenerator,
  [SyntaxKind.PropertySignature]: visitPropertySignature,
  [SyntaxKind.MethodSignature]: visitMethodSignature,
  [SyntaxKind.HeritageClause]: visitHeritageClause,
  [SyntaxKind.IndexSignature]: visitIndexSignature,
};