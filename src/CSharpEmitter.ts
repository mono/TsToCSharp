import * as ts from 'typescript';

import * as sast from "ts-simple-ast";
import { TypeGuards } from 'ts-simple-ast';
import {Context} from "./Context";

import {
  addWhitespace,
  emitStatic,
  addLeadingComment,
  addTrailingComment,
  addSemicolon,
  addComma,
  endNode,
} from './GeneratorHelpers';

const ReferenceTypeMap = [
  ts.SyntaxKind.StringKeyword
]

const ValueTypeMap = [
  ts.SyntaxKind.NumberKeyword,
  ts.SyntaxKind.BooleanKeyword
]

const ValueTypeTextMap = [
  "double",
  "bool"
]

  export function emit(node: sast.Node, context: Context): string {
    if ((emitter as any)[node.getKind()]) {
      return (emitter as any)[node.getKind()](node, context);
    } 
    throw new Error(`Unknown node kind ${ts.SyntaxKind[node.getKind()]}`);
  }

  export function emitTypeNode(node: sast.Node, context: Context) : string {
    
    // tslint:disable-next-line cyclomatic-complexity
    switch (node.getKind()) {
      case ts.SyntaxKind.TypeReference:
        return emitTypeReference(<sast.TypeReferenceNode>node, context);
      case ts.SyntaxKind.VoidKeyword:
        return emitVoidType(node, context);
      case ts.SyntaxKind.NumberKeyword:
        return emitNumberType(node, context);
      case ts.SyntaxKind.BooleanKeyword:
        return emitBooleanType(node, context);
      case ts.SyntaxKind.UnionType:
        return emitUnionType(<sast.UnionTypeNode>node, context);
      case ts.SyntaxKind.StringKeyword:
        return emitStringType(node, context);
      case ts.SyntaxKind.AnyKeyword:
        return emitAnyType(node, context);
      case ts.SyntaxKind.ArrayType:
        return emitArrayType(node, context);        
      default:
        throw new Error(`Unknown TypeNode kind ${ts.SyntaxKind[node.getKind()]}`);
    }
  }

  function emitExpressionWithTypeArguments(node: sast.ExpressionWithTypeArguments,
    context: Context): string {
    const source: string[] = [];
    addWhitespace(source, node, context);
    source.push(emit(node.getExpression(), context));
    endNode(node, context);
    return source.join('');
  }  
  
export function emitPropertyName(node: (sast.PropertyName 
                                        | sast.StringLiteral
                                        | sast.ComputedPropertyName
                                        | sast.NumericLiteral), context: Context): string {
    switch (node.getKind()) {
      case ts.SyntaxKind.Identifier:
        return emitIdentifier(node, context);
      case ts.SyntaxKind.StringLiteral:
        return emitStringLiteral(<sast.StringLiteral>node, context);
      case ts.SyntaxKind.ComputedPropertyName:
        return emitComputedPropertyName(<sast.ComputedPropertyName>node, context);
      case ts.SyntaxKind.FirstLiteralToken:
        return emitFirstLiteralToken(<sast.NumericLiteral>node, context);
      default:
        throw new Error(`Unknown PropertyName kind '${ts.SyntaxKind[node.getKind()]}'`);
    }
  }

  export function emitComputedPropertyName(node: sast.ComputedPropertyName,
    context: Context): string {
    const source: string[] = [];
    emitStatic(source, '[', node, context);
    addWhitespace(source, node, context);
    //source.push(emitExpression(node.expression, context));
    emitStatic(source, ']', node, context);
    endNode(node, context);
    return source.join('');
  }

  export function emitModifierable(node: sast.Node, context: Context): string {
    if ((emitter as any)[node.getKind()]) {
      return (emitter as any)[node.getKind()](node, context);
    }
    throw new Error(`Unknown Modifierable node kind ${ts.SyntaxKind[node.getKind()]}`);
  }

  export function emitPublicKeyword(node: sast.Node, context: Context): string {
    return _emitKeyword('public', node, context);
  }

  export function emitInterfaceKeyword(node: sast.Node, context: Context): string {
    return _emitKeyword('interface', node, context);
  }

  // We will not emit the readonly keyword but we do need to update the context
  export function emitReadonlyKeyword(node: sast.Node, context: Context): string {
    const source: string[] = [];
    addWhitespace(source, node, context);
    context.offset = node.getEnd();
    return source.join('');
  }

  function _emitKeyword(keyword: string, node: sast.Node, context: Context): string {
    const source: string[] = [];
    addWhitespace(source, node, context);
    source.push(keyword);
    context.offset += node.getWidth();
    return source.join('');
  }

  function _emitType(type: string, node: sast.Node, context: Context): string {
    const source: string[] = [];
    source.push(type);
    context.offset = node.getEnd();
    return source.join('');
  }  

  export function emitIdentifier(node: (sast.Identifier 
                                        | sast.PropertyName
                                        | sast.EntityName), 
                                context: Context): string {
    const source: string[] = [];
    addLeadingComment(source, node, context);
    addWhitespace(source, node, context);
    
    const literal = (node.getText().trim().length > 0)
      ? node.getText().trim()
      : node.getFullText().substring(node.getStart(), node.getEnd()).trim()
  
    source.push(literal);
    endNode(node, context);
    addTrailingComment(source, node, context);
    return source.join('');
  }

  export function emitStringLiteral(node: sast.StringLiteral, context: Context): string {
    const source: string[] = [];
    addLeadingComment(source, node, context);
    addWhitespace(source, node, context);
    const literal: string = (node as any).newText
      ? (node as any).newText
      : node.getFullText().substring(node.getStart(), node.getEnd()).trim();
    source.push(literal);
    endNode(node, context);
    return source.join('');
  }
  
  export function emitFirstLiteralToken(node: sast.NumericLiteral, context: Context): string {
    const source: string[] = [];
    addLeadingComment(source, node, context);
    addWhitespace(source, node, context);
    const literal = (node as any).newText
      ? (node as any).newText
      : node.getFullText().substring(node.getStart(), node.getEnd()).trim();
    source.push(literal);
    endNode(node, context);
    return source.join('');
  }

  export function emitVoidType(node: sast.Node, context: Context): string {
    return _emitType('void', node, context);
  }  

  export function emitBooleanType(node: sast.Node, context: Context): string {
    return _emitType('bool', node, context);
  }

  export function emitNumberType(node: sast.Node, context: Context): string {
    return _emitType('double', node, context);
  }
    
  export function emitStringType(node: sast.Node, context: Context): string {
    return _emitType('string', node, context);
  }
  
  export function emitAnyType(node: sast.Node, context: Context): string {
    return _emitType('Object', node, context);
  }

  export function emitArrayType(node: sast.Node, context: Context): string {
    const source: string[] = [];
    const at = <sast.ArrayTypeNode>node;
    const element = at.getElementTypeNode();
    emitTypeNode(element, context);
    source.push(emitTypeNode(element, context));
    source.push("[");
    source.push("]");
    endNode(node, context);
    return source.join('');
  }

  export function emitTypeReference(node: sast.TypeReferenceNode, context: Context): string {
    const source: string[] = [];
    source.push(node.getText());
    endNode(node, context);
    return source.join('');
  }

  export function emitNumberKeyword(node: sast.Node, context: Context): string {
    return _emitKeyword('double', node, context);
  }

  function isUnionNullable(node: sast.UnionTypeNode): boolean {
    
    for (let i = 0, n = node.getTypeNodes().length; i < n; i++) {
      if (TypeGuards.isNullLiteral(node.getTypeNodes()[i]) || TypeGuards.isUndefinedKeyword(node.getTypeNodes()[i]))
        return true;
    }
    return false;
  }

  // at this time UnionTypeNode is not wrapped by ts-simple-ast
  export function emitUnionType(node: sast.UnionTypeNode, context: Context): string {
    const source: string[] = [];

    addTrailingComment(source, context.offset, node, context);
    addWhitespace(source, context.offset, node, context);
    const isNullable = isUnionNullable(node);
    
    var typeMap = [];
    
    for (let i = 0, n = node.getTypeNodes().length; i < n; i++) {
      if (node.getTypeNodes()[i].getKind() !== ts.SyntaxKind.NullKeyword &&
      node.getTypeNodes()[i].getKind() !== ts.SyntaxKind.UndefinedKeyword)
        {
          typeMap.push(node.getTypeNodes()[i]);
        }
    }

    // If we only have one left the output the strongly typed union
    if (typeMap.length === 1)
    {
      var mappedType = typeMap[0];

      // We need to treat arrays a little different to insert the "?" nullable.
      if (TypeGuards.isArrayTypeNode(mappedType))
      {
        const arrayDef = emitTypeNode(mappedType, context);
        const arrayDefBracket = arrayDef.indexOf("[");

        // if the union type was nullable then insert the "?" for value types.
        if (isNullable && ValueTypeTextMap.indexOf(arrayDef.substring(0,arrayDefBracket)) !== -1)
        {
          source.push(arrayDef.substr(0, arrayDefBracket) + "?" + arrayDef.substr(arrayDefBracket));
        } 
        else
        {
          source.push(arrayDef);
        }       
      } 
      else 
      {     
        source.push(emitTypeNode(mappedType, context));
        if (isNullable && ValueTypeMap.indexOf(mappedType.getKind()) !== -1)
        {
          source.push("?");
        }
      }
    }
    else
    {
      // or output a generic object
      source.push("object");
    }

    context.offset = node.getEnd();
    addTrailingComment(source, node, context);
    return source.join('');
  }  

  export function emitTypeParameter(source: string[], node: sast.TypeParameterDeclaration, context: Context): void {
    // if (node.typeParameters) {
    // emitStatic(source, '<', node, context);
    //   for (let i = 0, n = node.typeParameters.length; i < n; i++) {
    //     addTrailingComment(source, context.offset, node, context);
    //     addWhitespace(source, node, context);
    //     source.push(emit(node.typeParameters[i], context));
    //     if ((i < n - 1) || node.typeParameters.hasTrailingComma) {
    //       emitStatic(source, ',', node, context);
    //     }
    //   }
    //   emitStatic(source, '>', node, context);
    // }
  }

  function _emitToken(source: string[], token: string, node: sast.Node, context: Context): void {
    addLeadingComment(source, node, context);
    emitStatic(source, token, node, context);
  }

  export function emitCloseBraceToken(node: sast.Node, context: Context): string {
    const source: string[] = [];
    _emitToken(source, '}', node, context);
    endNode(node, context);
    return source.join('');
  }  
  
  export function emitFirstPunctuation(node: sast.Node, context: Context): string {
    const source: string[] = [];
    _emitToken(source, node.getText(), node, context);
    endNode(node, context);
    return source.join('');
  }  

  const emitter = {
    [ts.SyntaxKind.CloseBraceToken]: emitCloseBraceToken,
    [ts.SyntaxKind.FirstPunctuation]: emitFirstPunctuation,
    [ts.SyntaxKind.Identifier]: emitIdentifier,
    [ts.SyntaxKind.PublicKeyword]: emitPublicKeyword,
    [ts.SyntaxKind.ReadonlyKeyword]: emitReadonlyKeyword, 
    [ts.SyntaxKind.ExpressionWithTypeArguments]: emitExpressionWithTypeArguments,   
    [ts.SyntaxKind.InterfaceKeyword]: emitInterfaceKeyword,
  };