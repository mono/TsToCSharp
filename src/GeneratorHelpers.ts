
import * as sast from "ts-simple-ast";
import {ts, SyntaxKind, TypeGuards} from "ts-simple-ast"
import {ContextInterface} from "./Context";
import {Stack} from "./DataStructures";
import {emitPropertyName, emitMethodName, emitClassName} from "./CSharpEmitter";
import { InterfaceTrackingMap } from './DataStructures';

const ContextStack = new Stack<number>();

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

  source.push("[Export(\"",exportClass.trim(),"\", typeof(Mono.WebAssembly.JSObject))]\n");
  

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

  source.push("[Export(\"",exportClass.trim(),"\")]\n");
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

    source.push("[Export(\"",exportProperty.trim(),"\")]\n");
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

    source.push("[Export(\"",exportMethod.trim(),"\")]\n");
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
    InterfaceTrackingMap.set(intercara.getName(), intercara);
  });
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

}
