
import * as sast from "ts-simple-ast";
import {ts, SyntaxKind, TypeGuards } from 'ts-simple-ast';
import {ContextInterface} from "./Context";
import * as cc from "change-case";

import {
  addWhitespace,
  getWhitespace,
  emitStatic,
  addLeadingComment,
  addTrailingComment,
  addSemicolon,
  addComma,
  endNode,
  pushContext,
  popContext,
} from './GeneratorHelpers';
import { InterfaceTrackingMap } from './DataStructures';

const ReferenceTypeMap = [
  SyntaxKind.StringKeyword
]

const ValueTypeMap = [
  SyntaxKind.NumberKeyword,
  SyntaxKind.BooleanKeyword
]

const ValueTypeTextMap = [
  "double",
  "bool"
]

  export function emit(node: sast.Node, context: ContextInterface): string {
    if ((emitter as any)[node.getKind()]) {
      return (emitter as any)[node.getKind()](node, context);
    } 
    throw new Error(`Unknown node kind ${SyntaxKind[node.getKind()]}`);
  }

  export function emitTypeNode(node: sast.Node, context: ContextInterface) : string {
    
    // tslint:disable-next-line cyclomatic-complexity
    switch (node.getKind()) {
      case SyntaxKind.TypeReference:
        return emitTypeReference(<sast.TypeReferenceNode>node, context);
      case SyntaxKind.VoidKeyword:
        return emitVoidType(node, context);
      case SyntaxKind.NumberKeyword:
        return emitNumberType(node, context);
      case SyntaxKind.BooleanKeyword:
        return emitBooleanType(node, context);
      case SyntaxKind.UnionType:
        return emitUnionType(<sast.UnionTypeNode>node, context);
      case SyntaxKind.StringKeyword:
        return emitStringType(node, context);
      case SyntaxKind.AnyKeyword:
        return emitAnyType(node, context);
      case SyntaxKind.ArrayType:
        return emitArrayType(node, context);        
      case SyntaxKind.DotDotDotToken:
        return emitRestParameter(node, context);        
      case SyntaxKind.NeverKeyword:
        return emitNeverType(node, context);
      default:
        throw new Error(`Unknown TypeNode kind ${SyntaxKind[node.getKind()]}`);
    }
  }

  function emitExpressionWithTypeArguments(node: sast.ExpressionWithTypeArguments,
    context: ContextInterface): string {
    const source: string[] = [];
    addWhitespace(source, node, context);
    source.push(emit(node.getExpression(), context));
    endNode(node, context);
    return source.join('');
  }  
  
export function emitPropertyName(node: (sast.PropertyName 
                                        | sast.StringLiteral
                                        | sast.ComputedPropertyName
                                        | sast.NumericLiteral), context: ContextInterface): string {
    switch (node.getKind()) {
      case SyntaxKind.Identifier:
        return emitIdentifier(node, context, context.genOptions.isCaseChange && context.genOptions.isCaseChangeProperties);
      case SyntaxKind.StringLiteral:
        return emitStringLiteral(<sast.StringLiteral>node, context);
      case SyntaxKind.ComputedPropertyName:
        return emitComputedPropertyName(<sast.ComputedPropertyName>node, context);
      case SyntaxKind.FirstLiteralToken:
        return emitFirstLiteralToken(<sast.NumericLiteral>node, context);
      default:
        throw new Error(`Unknown PropertyName kind '${SyntaxKind[node.getKind()]}'`);
    }
  }

  export function emitMethodName(node: (sast.PropertyName 
    | sast.StringLiteral
    | sast.ComputedPropertyName
    | sast.NumericLiteral), context: ContextInterface): string {

    switch (node.getKind()) {
      case SyntaxKind.Identifier:
        return emitIdentifier(node, context, context.genOptions.isCaseChange && context.genOptions.isCaseChangeMethods);
      case SyntaxKind.StringLiteral:
        return emitStringLiteral(<sast.StringLiteral>node, context);
      case SyntaxKind.ComputedPropertyName:
        return emitComputedPropertyName(<sast.ComputedPropertyName>node, context);
      case SyntaxKind.FirstLiteralToken:
        return emitFirstLiteralToken(<sast.NumericLiteral>node, context);
      default:
        throw new Error(`Unknown MethodName kind '${SyntaxKind[node.getKind()]}'`);
    }
  }

  export function emitParameterName(node: (sast.PropertyName 
    | sast.StringLiteral
    | sast.ComputedPropertyName
    | sast.NumericLiteral), context: ContextInterface): string {

    switch (node.getKind()) {
      case SyntaxKind.Identifier:
        return emitIdentifier(node, context, context.genOptions.isCaseChange && context.genOptions.isCaseChangeParameters);
      case SyntaxKind.StringLiteral:
        return emitStringLiteral(<sast.StringLiteral>node, context);
      case SyntaxKind.ComputedPropertyName:
        return emitComputedPropertyName(<sast.ComputedPropertyName>node, context);
      case SyntaxKind.FirstLiteralToken:
        return emitFirstLiteralToken(<sast.NumericLiteral>node, context);
      default:
        throw new Error(`Unknown ParameterName kind '${SyntaxKind[node.getKind()]}'`);
    }
  }


export function emitComputedPropertyName(node: sast.ComputedPropertyName,
    context: ContextInterface): string {
    const source: string[] = [];
    emitStatic(source, '[', node, context);
    addWhitespace(source, node, context);
    //source.push(emitExpression(node.expression, context));
    emitStatic(source, ']', node, context);
    endNode(node, context);
    return source.join('');
  }

  export function emitModifierable(node: sast.Node, context: ContextInterface): string {
    if ((emitter as any)[node.getKind()]) {
      return (emitter as any)[node.getKind()](node, context);
    }
    throw new Error(`Unknown Modifierable node kind ${SyntaxKind[node.getKind()]}`);
  }

  export function emitPublicKeyword(node: sast.Node, context: ContextInterface): string {
    return _emitKeyword('public', node, context);
  }

  export function emitInterfaceKeyword(node: sast.Node, context: ContextInterface): string {
    return _emitKeyword('interface', node, context);
  }

  // We will not emit the readonly keyword but we do need to update the context
  export function emitReadonlyKeyword(node: sast.Node, context: ContextInterface): string {
    const source: string[] = [];
    addWhitespace(source, node, context);
    context.offset = node.getEnd();
    return source.join('');
  }

  function _emitKeyword(keyword: string, node: sast.Node, context: ContextInterface): string {
    const source: string[] = [];
    addWhitespace(source, node, context);
    source.push(keyword);
    context.offset += node.getWidth();
    return source.join('');
  }

  function _emitType(type: string, node: sast.Node, context: ContextInterface): string {
    const source: string[] = [];
    source.push(type);
    context.offset = node.getEnd();
    return source.join('');
  }  

  export function emitIdentifier(node: (sast.Identifier 
                                        | sast.PropertyName
                                        | sast.EntityName), 
                                context: ContextInterface,
                              changeCase?: boolean): string {
    const source: string[] = [];
    addLeadingComment(source, node, context);
    addWhitespace(source, node, context);
    
    let literal = (node.getText().trim().length > 0)
      ? node.getText().trim()
      : node.getFullText().substring(node.getStart(), node.getEnd()).trim()

    if (changeCase)
      literal = cc.pascalCase(literal);

    // Let's check if it is an interface that we need to prefix
    if (context.genOptions.isPrefixInterface)
    {
      if (InterfaceTrackingMap.has(literal))
      {
        literal = context.genOptions.interfacePrefix.concat(literal);
      }
    }

    source.push(literal);
    endNode(node, context);
    addTrailingComment(source, node, context);
    return source.join('');
  }

  export function emitInterfaceName(node: sast.Identifier, context: ContextInterface): string {

    const source: string[] = [];
    addLeadingComment(source, node, context);
    addWhitespace(source, node, context);

    let literal = (node.getText().trim().length > 0)
    ? node.getText().trim()
    : node.getFullText().substring(node.getStart(), node.getEnd()).trim()

    if (context.genOptions.isPrefixInterface && context.genOptions.interfacePrefix)
    {
      literal = context.genOptions.interfacePrefix.concat(literal);
    }
    source.push(literal);
    endNode(node, context);
    addTrailingComment(source, node, context);
    return source.join('');
  }

export function emitStringLiteral(node: sast.StringLiteral, context: ContextInterface): string {
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
  
  export function emitFirstLiteralToken(node: sast.NumericLiteral, context: ContextInterface): string {
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

  export function emitVoidType(node: sast.Node, context: ContextInterface): string {
    return _emitType('void', node, context);
  }  

  export function emitNeverType(node: sast.Node, context: ContextInterface): string {
    return _emitType('void', node, context);
  }  

  export function emitBooleanType(node: sast.Node, context: ContextInterface): string {
    return _emitType('bool', node, context);
  }

  export function emitNumberType(node: sast.Node, context: ContextInterface): string {
    return _emitType('double', node, context);
  }
    
  export function emitStringType(node: sast.Node, context: ContextInterface): string {
    return _emitType('string', node, context);
  }
  
  export function emitAnyType(node: sast.Node, context: ContextInterface): string {
    return _emitType('Object', node, context);
  }

  export function emitArrayType(node: sast.Node, context: ContextInterface): string {
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

  export function emitTypeReference(node: sast.TypeReferenceNode, context: ContextInterface): string {
    const source: string[] = [];

    let typeRefLiteral = node.getText();

    // Let's check if it is an interface that we need to prefix
    if (context.genOptions.isPrefixInterface)
    {
      if (InterfaceTrackingMap.has(typeRefLiteral))
      {
        typeRefLiteral = context.genOptions.interfacePrefix.concat(typeRefLiteral);
      }
    }

    source.push(typeRefLiteral);
    endNode(node, context);
    return source.join('');
  }

  export function emitRestParameter(node: sast.Node, context: ContextInterface): string {
    const source: string[] = [];
    const at = <sast.ArrayTypeNode>node;
    const element = at.getElementTypeNode();
    source.push("params ");
    emitTypeNode(element, context);
    source.push(emitTypeNode(element, context));
    source.push("[");
    source.push("]");
    endNode(node, context);
    return source.join('');
  }
  

  export function emitNumberKeyword(node: sast.Node, context: ContextInterface): string {
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
  export function emitUnionType(node: sast.UnionTypeNode, context: ContextInterface): string {
    const source: string[] = [];

    addTrailingComment(source, context.offset, node, context);
    addWhitespace(source, context.offset, node, context);
    
    const isNullable = isUnionNullable(node);
    
    var typeMap = [];
    
    for (let i = 0, n = node.getTypeNodes().length; i < n; i++) {
      if (node.getTypeNodes()[i].getKind() !== SyntaxKind.NullKeyword &&
      node.getTypeNodes()[i].getKind() !== SyntaxKind.UndefinedKeyword)
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

  export function emitTypeParameters(source: string[], node: sast.Node, context: ContextInterface): void {

    if (TypeGuards.isTypeParameteredNode(node))
    {
      const typeParameters = node.getTypeParameters();
      if (typeof typeParameters !== 'undefined' && typeParameters.length > 0)
      {
        emitStatic(source, '<', node, context);

        for (let i = 0, n = typeParameters.length; i < n; i++) {
          addTrailingComment(source, context.offset, node, context);
          addWhitespace(source, node, context);
          source.push(emit(typeParameters[i], context));
          if ((i < n - 1)) {
            emitStatic(source, ',', node, context);
          }
        }
        emitStatic(source, '>', node, context);
      } 
    }
  }

  export function emitTypeConstraints(source: string[], node: sast.Node, context: ContextInterface): void {

    // Since we are appending the constraints we need to save off our context and restore it afterwards
    pushContext(context);

    if (TypeGuards.isTypeParameteredNode(node))
    {

      const typeParameters = node.getTypeParameters();
      if (typeof typeParameters !== 'undefined' && typeParameters.length > 0)
      {
        for (let i = 0, n = typeParameters.length; i < n; i++) {
          if (typeof typeParameters[i].getConstraintNode() !== 'undefined')
          {
            source.push(' where ');
            source.push(emit(typeParameters[i], context));
            source.push(' : ');
            source.push(emitTypeNode(typeParameters[i].getConstraintNode(), context));
          }
        }        

      }
    }

    // Restore our context
    popContext(context);
  }

  function _emitToken(source: string[], token: string, node: sast.Node, context: ContextInterface): void {
    addLeadingComment(source, node, context);
    emitStatic(source, token, node, context);
  }

  export function emitCloseBraceToken(node: sast.Node, context: ContextInterface): string {
    const source: string[] = [];
    _emitToken(source, '}', node, context);
    endNode(node, context);
    return source.join('');
  }  
  
  export function emitFirstPunctuation(node: sast.Node, context: ContextInterface): string {
    const source: string[] = [];
    _emitToken(source, node.getText(), node, context);
    endNode(node, context);
    return source.join('');
  }  

  export function emitTypeParameter(node: sast.TypeParameterDeclaration, context: ContextInterface): string {
    const source: string[] = [];
    addWhitespace(source, node, context);
    source.push(emitIdentifier(node.getNameNode(), context));
    // if (node.constraint) {
    //   emitStatic(source, 'extends', node, context);
    //   addWhitespace(source, node, context);
    //   source.push(emitTypeNode(node.constraint, context));
    // }
    // if (node.default) {
    //   emitStatic(source, '=', node, context);
    //   addWhitespace(source, node, context);
    //   source.push(emitTypeNode(node.default, context));
    // }
    endNode(node, context);
    return source.join('');
  }

  const emitter = {
    [SyntaxKind.CloseBraceToken]: emitCloseBraceToken,
    [SyntaxKind.FirstPunctuation]: emitFirstPunctuation,
    [SyntaxKind.Identifier]: emitIdentifier,
    [SyntaxKind.PublicKeyword]: emitPublicKeyword,
    [SyntaxKind.ReadonlyKeyword]: emitReadonlyKeyword, 
    [SyntaxKind.ExpressionWithTypeArguments]: emitExpressionWithTypeArguments,   
    [SyntaxKind.InterfaceKeyword]: emitInterfaceKeyword,
    [SyntaxKind.TypeParameter]: emitTypeParameter,
  };