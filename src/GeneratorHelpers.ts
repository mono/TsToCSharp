
import * as sast from "ts-simple-ast";
import {ts, SyntaxKind, TypeGuards, Node} from "ts-simple-ast"
import {ContextInterface} from "./Context";
import {Stack} from "./DataStructures";
import {emitPropertyName, emitMethodName, emitClassName} from "./CSharpEmitter";
import * as os from "os";

const ContextStack = new Stack<number>();
const StringLiteralMap = new Map<string, sast.Node>();

export function emitStatic(source: string[], text: string, node: sast.Node, context: ContextInterface): void {
  addWhitespace(source, node, context);
  source.push(text);
  context.offset += text.length;
}

const whitespaces = /^([ \f\n\r\t\v\u0085\u00A0\u2028\u2029\u3000]+)/;
export function addWhitespace(source: string[], node: sast.Node, context: ContextInterface): void;
export function addWhitespace(source: string[], pos: number, node: sast.Node, context: ContextInterface): void;
// tslint:disable-next-line:cyclomatic-complexity
export function addWhitespace(source: string[], posOrNode: number|sast.Node, nodeOrContext: sast.Node|ContextInterface,
  optionalContext?: ContextInterface): void {
  const context = optionalContext || (nodeOrContext as ContextInterface);
  const node = optionalContext ? nodeOrContext as sast.Node : posOrNode as sast.Node;
  const pos = optionalContext ? posOrNode as number : node.getFullStart();

  if (context.offset > node.getEnd()) {
    return;
  }

  if (context.offset <= node.getFullStart()) {
    const text = node.getSourceFile().getFullText().substring(pos, node.getEnd());
    const leadingWhitespace = text.match(whitespaces);
    if (leadingWhitespace) {
      context.offset = pos + leadingWhitespace[1].length;
      source.push(leadingWhitespace[1]);
    }
  } else {
    const text = node.getSourceFile().getFullText().substring(context.offset, node.getEnd());
    const trailingWhitespace = text.match(whitespaces);
    if (trailingWhitespace) {
      context.offset = context.offset + trailingWhitespace[1].length;
      source.push(trailingWhitespace[1]);
    }
  }
}

export function getWhitespace(node: sast.Node, context: ContextInterface, stripReturn: boolean): string;
export function getWhitespace(pos: number, node: sast.Node, context: ContextInterface, stripReturn: ContextInterface | boolean): string;
// tslint:disable-next-line:cyclomatic-complexity
export function getWhitespace(posOrNode: number|sast.Node, nodeOrContext: sast.Node|ContextInterface, 
  stripOrContext: ContextInterface | boolean,
  optionalContext?: ContextInterface): string {

  const context = optionalContext || (nodeOrContext as ContextInterface);
  const node = optionalContext ? nodeOrContext as sast.Node : posOrNode as sast.Node;
  const pos = optionalContext ? posOrNode as number : node.getFullStart();
  const stripReturn = stripOrContext as boolean ; 

  if (context.offset > node.getEnd()) {
    return;
  }

  if (context.offset <= node.getFullStart()) {
    const text = node.getSourceFile().getFullText().substring(pos, node.getEnd());
    const leadingWhitespace = text.match(whitespaces);
    if (leadingWhitespace) {
      let leadingWS = leadingWhitespace[1];
      context.offset = pos + leadingWS.length;
      if (stripReturn)
      {
        // Strip all line break combinations so spacing looks correct
        leadingWS = leadingWS.replace(/(\r\n|\n|\r)/gm,"");
      }
      return leadingWS;
    }
  } else {
    const text = node.getSourceFile().getFullText().substring(context.offset, node.getEnd());
    const trailingWhitespace = text.match(whitespaces);
    if (trailingWhitespace) {
      let trailingWS = trailingWhitespace[1];
      context.offset = pos + trailingWS.length;
      if (stripReturn)
      {
        // Strip all line break combinations so spacing looks correct
        trailingWS = trailingWS.replace(/(\r\n|\n|\r)/gm,"");
      }
      return trailingWS;

    }
  }
}


export function addLeadingComment(source: string[], node: sast.Node, context: ContextInterface): void;
export function addLeadingComment(source: string[], pos: number, node: sast.Node, context: ContextInterface): void;
export function addLeadingComment(source: string[], posOrNode: number|sast.Node, nodeOrContext: sast.Node|ContextInterface,
    optionalContext?: ContextInterface): void {
  const context = optionalContext || (nodeOrContext as ContextInterface);
  const node = optionalContext ? nodeOrContext as sast.Node : posOrNode as sast.Node;
  const pos = optionalContext ? posOrNode as number : node.getFullStart();

  const text = node.getSourceFile().getFullText();
  const ranges = ts.getLeadingCommentRanges(text, pos);
  if (ranges) {
    source.push(ranges
      .map(range => {
        if (context.offset <= range.pos) {
          const prefix = text.substring(context.offset, range.pos);
          const comment = prefix + text.substring(range.pos, range.end);
          context.offset += comment.length;
          if (!context.genOptions.emitComments) 
            return null;
          return comment;
        }
        return '';
      })
      .join(''));
  }
}

export function addTrailingComment(source: string[], node: sast.Node, context: ContextInterface): void;
export function addTrailingComment(source: string[], pos: number, node: sast.Node, context: ContextInterface): void;
export function addTrailingComment(source: string[], posOrNode: number|sast.Node, nodeOrContext: sast.Node|ContextInterface,
    optionalContext?: ContextInterface): void {
  var context = optionalContext || (nodeOrContext as ContextInterface);
  const node = optionalContext ? nodeOrContext as sast.Node : posOrNode as sast.Node;
  const pos = optionalContext ? posOrNode as number : node.getEnd();

  const text = node.getSourceFile().getFullText();
  const ranges = ts.getTrailingCommentRanges(text, pos);
  if (ranges) {
    source.push(ranges
      .map(range => {
        if (context.offset <= range.pos) {
          const prefix = text.substring(context.offset, range.pos);
          const comment = prefix + text.substring(range.pos, range.end);
          context.offset += comment.length;
          if (!context.genOptions.emitComments) 
            return null;
          return comment;
        }
        return '';
      })
      .join(''));
  }
  
}

export function addSemicolon(source: string[], node: sast.Node, context: ContextInterface): void {
  
  if (node.getSourceFile().getFullText().substring(context.offset).trim().startsWith(';')) {
    emitStatic(source, ';', node, context);
  }
}

export function addComma(source: string[], node: sast.Node, context: ContextInterface): void {
  if (node.getSourceFile().getFullText().substring(context.offset).trim().startsWith(',')) {
    emitStatic(source, ',', node, context);
  }
}

export function endNode(node: sast.Node, context: ContextInterface): void {
  const end = node.getEnd();
  if (context.offset < end) {
    context.offset = end;
  }
}

export function generateExportForInterfaceDeclaration(node: sast.VariableDeclaration, context: ContextInterface): string {
  const source: string[] = [];
  pushContext(context);
  
  const variableStatement = node.getParentWhile((parent) => 
  {
    if (parent.getKind() !== SyntaxKind.VariableStatement)
      return true;
    return false;

  }).getParentIfKind(SyntaxKind.VariableStatement);

  addWhitespace(source, variableStatement, context);
  
  const exportClass = node.getName();
  popContext(context);

  source.push("[Export(\"",exportClass.trim(),"\", typeof(Mono.WebAssembly.JSObject))]",os.EOL);
  

  var len = source.length;
  addWhitespace(source, variableStatement, context);

  if (source.length > len)
  {
    // Strip all line break combinations so spacing looks correct
    source[source.length - 1] = source[source.length - 1].replace(/(\r\n|\n|\r)/gm,"");
  }

  return source.join('');  
}

export function generateExportForClass(node: sast.ClassDeclaration, context: ContextInterface): string {
  const source: string[] = [];
  pushContext(context);
  addWhitespace(source, node, context);
  const exportClass = emitPropertyName(node.getNameNode(), context);
  popContext(context);

  source.push("[Export(\"",exportClass.trim(),"\")]",os.EOL);
  var len = source.length;
  addWhitespace(source, node, context);

  if (source.length > len)
  {
    // Strip all line break combinations so spacing looks correct
    source[source.length - 1] = source[source.length - 1].replace(/(\r\n|\n|\r)/gm,"");
  }
  
  return source.join('');  
}

export function generateExportForProperty(node: sast.PropertySignature, context: ContextInterface): string {
  const source: string[] = [];
  if (context.genOptions.emitExports && context.genOptions.emitPropertyExport)
  {
    pushContext(context);
    addWhitespace(source, node, context);

    const caseChange = context.genOptions.isCaseChange;
    context.genOptions.isCaseChange = false;
    
    const exportProperty = emitPropertyName(node.getNameNode(), context);

    context.genOptions.isCaseChange = caseChange;
    
    popContext(context);

    source.push("[Export(\"",exportProperty.trim(),"\")]", os.EOL);
    var len = source.length;
    addWhitespace(source, node, context);

    if (source.length > len)
    {
      // Strip all line break combinations so spacing looks correct
      source[source.length - 1] = source[source.length - 1].replace(/(\r\n|\n|\r)/gm,"");
    }
  }
  else
  {
    addWhitespace(source, node, context);
  }
  
  return source.join('');  
}

export function generateExportForMethod(node: sast.MethodSignature, context: ContextInterface): string {
  const source: string[] = [];
  if (context.genOptions.emitExports && context.genOptions.emitMethodExport)
  {  
    pushContext(context);
    addWhitespace(source, node, context);

    const caseChange = context.genOptions.isCaseChange;
    context.genOptions.isCaseChange = false;

    const exportMethod = emitMethodName(node.getNameNode(), context);

    context.genOptions.isCaseChange = caseChange;

    popContext(context);

    source.push("[Export(\"",exportMethod.trim(),"\")]", os.EOL);
    var len = source.length;
    addWhitespace(source, node, context);

    if (source.length > len)
    {
      // Strip all line break combinations so spacing looks correct
      source[source.length - 1] = source[source.length - 1].replace(/(\r\n|\n|\r)/gm,"");
    }
  }
  else
  {
    addWhitespace(source, node, context);
  }
  
  return source.join('');  
}

export function pushContext(context: ContextInterface): void
{
   // save off our original context
   ContextStack.push(context.offset);
}

export function swapContext(context: ContextInterface)
{

   // save off our original context
   var swap:number = ContextStack.pop();
   pushContext(context);
   context.offset = swap;
}

export function popContext(context: ContextInterface)
{
  context.offset = ContextStack.pop();
}

// This is simplistic right now and will need to be expanded to include namespaces
export function identifyInterfaces(sourceFile: sast.SourceFile, context: ContextInterface)
{
  const interfaces = sourceFile.getDescendantsOfKind(SyntaxKind.InterfaceDeclaration);
  interfaces.forEach(intercara => {
    context.diagnostics.identifiedInterfaces++;
  });
}

// For ModifierableNodes we can specify access modifiers
// we only account for non readonly modifiers.
export function hasAccessModifiers(node: sast.ModifierableNode) : boolean {
  const modifiers = node.getModifiers();
  let hasAccessModifiers = false;
  modifiers.forEach(modifier => {
    if (modifier.getKind() !== SyntaxKind.ReadonlyKeyword)
      hasAccessModifiers = true;
  });
  return hasAccessModifiers;
}

export function isDeclarationOfInterface(node: sast.VariableDeclaration) : boolean {

  const properties = node.getDescendantsOfKind(SyntaxKind.PropertySignature);

  for (let i = 0; i < properties.length; i++)
  {
    const propName = properties[i].getName();
    if (properties[i].getName() === "prototype")
    {
      const propType = properties[i].getTypeNode();

      if (TypeGuards.isTypeReferenceNode(propType))
      {
        const typeName = propType.getText();
        const interfaceDec = propType.getSourceFile().getInterface(typeName);
        return (typeof interfaceDec !== "undefined");
      }
        
    }
  }
  return false;
}

export function loadInterfaceProperties(bag: Map<string, sast.PropertySignature>, node: sast.InterfaceDeclaration) : void {

  const properties = node.getProperties();
  for (let x = 0; x < properties.length; x++)
  {
    const property = properties[x];
    if (!bag.has(property.getName()))
    {
      bag.set(property.getName(), property);
    }
  }

  loadHeritageInterfaces(node, (interfaceDecl) => {
    loadInterfaceProperties(bag, interfaceDecl);
  });
}

export function loadInterfaceMethods(bag: Map<string, sast.MethodSignature>, node: sast.InterfaceDeclaration) : void {

  const methods = node.getMethods();
  for (let x = 0; x < methods.length; x++)
  {
    const method = methods[x];
    if (!bag.has(method.getName()))
    {
      bag.set(method.getName(), method);
    }
  }

  loadHeritageInterfaces(node, (interfaceDecl) => {
    loadInterfaceMethods(bag, interfaceDecl);
  });

}

export function loadInterfaceIndexers(bag: Map<string, sast.IndexSignatureDeclaration>, node: sast.InterfaceDeclaration) : void {

  const indexers = node.getIndexSignatures();
  for (let x = 0; x < indexers.length; x++)
  {
    const indexer = indexers[x];
    if (!bag.has("this[]"))
    {
      bag.set("this[]", indexer);
    }
  }

  loadHeritageInterfaces(node, (interfaceDecl) => {
    loadInterfaceIndexers(bag, interfaceDecl);
  });
  
}

function loadHeritageInterfaces(node: sast.InterfaceDeclaration, loadDelegate: (node: sast.InterfaceDeclaration) => void) : void 
{
  const ancestors = node.getHeritageClauses();
  const n = ancestors.length;
  if (ancestors.length > 0)
  {
    for (let x = 0; x < n; x++)
    {
      const leaf = ancestors[x];
      const clauseTypes = leaf.getTypeNodes();
      const nn = clauseTypes.length;
    
      if (nn > 0)
      {
        for (let t = 0; t < nn; t++)
        {
          // We are going to assume right now that the expression is an identifier
          const clauseType = clauseTypes[t];
          const expression = clauseType.getExpression();
          if (TypeGuards.isIdentifier(expression))
          {
            const interfaceName = expression.getText();
            const interfaceDecl = node.getSourceFile().getInterface(interfaceName);
            if (interfaceDecl)
            {
              //loadInterfaceProperties(bag, interfaceDecl);
              loadDelegate(interfaceDecl);
            }
            
          }

        };
      }
    }
  }

}

// some interfaces are used as a Map in the keyof definitions.
// These types we will not want to output but process the string literals that make up
// the map.
export function isMap(node: (sast.InterfaceDeclaration | sast.ClassDeclaration | sast.TypeLiteralNode)) : boolean {
  const members = node.getMembers();
  
  if (members.length === 0)
    return false;

  let isMap : boolean = true;
  for (let m = 0; m < members.length; m++)
  {
    const member = members[m];
    if (TypeGuards.isPropertySignature(member))
    {
      const name = member.getName();
      const memberType = member.getNameNode();
      if (!TypeGuards.isStringLiteral(memberType))
      {
        isMap = false;
        break;
      }
      
    }
    else
    {
      isMap = false;
      break;
    }
  }
  return isMap;
}

export function emitDefaultNameSpace(source: string[], context: ContextInterface, begin?: boolean): void {

  if (context.genOptions.defaultNameSpace)
  {
    if (begin)
    {
      source.push("namespace ", context.genOptions.defaultNameSpace, " ", os.EOL, "{",os.EOL);
    }
    else
    {
      source.push(os.EOL, "}");
    }
  }

}

export function emitUsings(source: string[], context: ContextInterface): void {

  if (context.genOptions.isEmitUsings)
  {
      source.push("using System;",os.EOL);
      source.push("using System.ComponentModel.Composition;",os.EOL);
      source.push("using Mono.WebAssembly;",os.EOL, os.EOL);
  }

}
