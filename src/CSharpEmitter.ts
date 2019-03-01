
import * as sast from "ts-morph";
import {ts, SyntaxKind, TypeGuards } from 'ts-morph';
import {ContextInterface} from "./Context";
import * as cc from "change-case";
import * as os from "os";

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
      case SyntaxKind.FunctionType:
        return emitFunctionType(node, context); 
      case SyntaxKind.TypeQuery:
        return emitTypeQuery(node, context); 
      case SyntaxKind.LastTypeNode:
        return emitLastTypeNodeAsType(node, context); 
      case SyntaxKind.TypeLiteral:
        return emitTypeLiteral(node, context);        
      default:
        throw new Error(`Unknown TypeNode kind ${SyntaxKind[node.getKind()]}`);
    }
  }

  // This is a little weird but we will treat it as a string for now untill we run across something different.
  export function emitLastTypeNodeAsType(node: sast.Node, context: ContextInterface): string {
    
    // const source: string[] = [];
    // addWhitespace(source, node, context);
    
    // if (TypeGuards.isLiteralTypeNode(node))
    // {
    //   const literal = node.getLiteral();
    //   source.push(emit(literal, context));
    // }
    // endNode(node, context);
    
    // return source.join('');
    return _emitType("string", node, context);
  }

  // This needs some more analysis but for now we will just output an object type
  export function emitTypeLiteral(node: sast.Node, context: ContextInterface): string {
    const source: string[] = [];
    // addTrailingComment(source, context.offset, node, context);
    // addWhitespace(source, context.offset, node, context);

    // if (TypeGuards.isTypeLiteralNode(node))
    // {
    //   emitStatic(source, "{", node, context);

    //   const members = node.getMembers();
    //   for (let i = 0, n = members.length; i < n; i++) {
    //     addWhitespace(source, node, context);
    //     source.push(emit(members[i],context));
    //     addLeadingComment(source, context.offset, node, context);
    //   }

    //   emitStatic(source, "}", node, context);

    // }
    
    //endNode(node, context);
    //source.push("object");
    return _emitType("object", node, context);
    //return source.join('');

  }  

  export function emitTypeQuery(node: sast.Node, context: ContextInterface): string {
    const source: string[] = [];

    addWhitespace(source, node, context);

    const tq = node.compilerNode;
    if (ts.isTypeQueryNode(tq))
    {
      const nn = tq.exprName;
      const nnn = sast.createWrappedNode(nn);
      source.push(emitEntityName(nnn, context));
    }
    return source.join('');
  }

  function emitEntityName(node: sast.Node, context: ContextInterface): string {
    switch (node.getKind()) {
      case SyntaxKind.Identifier:
        return emitIdentifier(<sast.Identifier>node, context);
        
    }
  }
  
  function emitExpressionWithTypeArguments(node: sast.ExpressionWithTypeArguments,
    context: ContextInterface): string {
    
    const source: string[] = [];
    addWhitespace(source, node, context);
    source.push(emit(node.getExpression(), context));
    
    emitTypeArguments(source, node, context);

    endNode(node, context);
    return source.join('');
  }  

  function emitTypeArguments(source: string[], node: sast.ExpressionWithTypeArguments, context: ContextInterface): void {

    
    const typeArgs = node.getTypeArguments();
    if (typeof typeArgs !== "undefined"  && typeArgs.length > 0)
    {
      emitStatic(source, '<', node, context);
      for (let i = 0, n = typeArgs.length; i < n; i++) {
        addWhitespace(source, node, context);
        source.push(emit(typeArgs[i], context));
        if ((i < n - 1)) {
          emitStatic(source, ',', node, context);
        }
      }
      emitStatic(source, '>', node, context);
      
    }
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
      if (node.getSourceFile().getInterface(literal))
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

  export function emitClassName(node: sast.Identifier, context: ContextInterface, changeCase?: boolean): string {

    const source: string[] = [];
    addLeadingComment(source, node, context);
    addWhitespace(source, node, context);

    let literal = (node.getText().trim().length > 0)
    ? node.getText().trim()
    : node.getFullText().substring(node.getStart(), node.getEnd()).trim()

    if (changeCase)
      literal = cc.pascalCase(literal);

    source.push(literal);
    endNode(node, context);
    addTrailingComment(source, node, context);
    return source.join('');
  }

  export function emitClassDefinitionOfInterfaceDeclaration(source: string[], 
                                                            node: sast.VariableDeclaration, 
                                                            context: ContextInterface,
                                                            changeCase?: boolean): void {

    source.push("public sealed class");
  
    addWhitespace(source, node.getPos(), node, context);
    source.push(emitClassName(node.getNameNode(), context, changeCase));
    source.push(" : JSObject")
  }

  export function emitClassConstructor(source: string[], 
    node: sast.TypeLiteralNode, 
    context: ContextInterface): void {

      // emit our constructor type which is at the end.
      const savePrefixInterface = context.genOptions.isPrefixInterface;
      const saveCaseChangeInterfaces = context.genOptions.isCaseChangeInterfaces;
      context.genOptions.isPrefixInterface = false;
      context.genOptions.isCaseChangeInterfaces = false;
    
      const parent = node.getParent();
      if (TypeGuards.isVariableDeclaration(parent))
      {
        const parenta = emitClassName(parent.getNameNode(), context, false);
        // the constructors in this case do not allow modifiers so we will make this internal by default
        source.push("internal ", parenta, "  (int handle) : base (handle) {}", os.EOL);
        
    
      }
      
      context.genOptions.isCaseChangeInterfaces = saveCaseChangeInterfaces;
      context.genOptions.isPrefixInterface = savePrefixInterface;
    
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

  export function emitFunctionType(node: sast.Node, context: ContextInterface): string {
    // We will need to do some more checking here probaly to return 'Action' or 'Func'
    // so let's think of this as a place holder for now until we get some more examples.
    return _emitType('Action', node, context);
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

    // Special processing for DOM Event Handlers
    if (typeRefLiteral === "EventListenerOrEventListenerObject")
      typeRefLiteral = "DOMEventHandler";

      // Let's check if it is an interface that we need to prefix
    if (context.genOptions.isPrefixInterface)
    {
      if (node.getSourceFile().getInterface(typeRefLiteral))
      {
        typeRefLiteral = context.genOptions.interfacePrefix.concat(typeRefLiteral);
      }
    }

    source.push(emitTypeRefLiteral(typeRefLiteral));
    endNode(node, context);
    return source.join('');
  }


// Int8Array 		| int8_t	| byte or SByte (signed byte)
// Uint8Array		| uint8_t	| byte or Byte (unsigned byte)
// Uint8ClampedArray| uint8_t	| byte or Byte (unsigned byte)
// Int16Array		| int16_t	| short (signed short)
// Uint16Array		| uint16_t	| ushort (unsigned short)
// Int32Array		| int32_t	| int (signed integer)
// Uint32Array		| uint32_t	| uint (unsigned integer)
// Float32Array		| float		| float
// Float64Array		| double	| double
  function emitTypeRefLiteral(literal: string ): string
  {
      switch (literal)
      {
        case 'Int8Array':
          return 'sbyte[]';
        case 'Uint8Array':
        case 'Uint8ClampedArray':
          return 'byte[]';
        case 'Int16Array':
          return 'short[]';
        case 'UInt16Array':
          return 'ushort[]';
        case 'Int32Array':
          return 'int[]';
        case 'UInt32Array':
          return 'uint[]';
        case 'Float32Array':
          return 'float[]';
        case 'Float64Array':
          return 'double[]';
        default:
          return literal;
      }
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

  // at this time UnionTypeNode is not wrapped by ts-morph
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
          if (typeof typeParameters[i].getDefaultNode() !== 'undefined')
          {
            context.diagnostics.pushWarningAtLoc("C# does not support default generic types", typeParameters[i].getDefaultNode() );
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
    endNode(node, context);
    return source.join('');
  }

  export function emitPropertyBody(node: sast.PropertySignature, context: ContextInterface) : string {

    const source: string[] = [];

    if (node.isReadonly())
    {
      if (context.emitImplementation)
      {
        pushContext(context);
        const caseChange = context.genOptions.isCaseChange;
        const prefix = context.genOptions.isPrefixInterface;
        context.genOptions.isCaseChange = false;
        context.genOptions.isPrefixInterface = false;
        
        const nodeType = emitTypeNode(node.getTypeNode(), context);
        const propertyName = emitPropertyName(node.getNameNode(), context);
    
        context.genOptions.isCaseChange = caseChange;
        context.genOptions.isPrefixInterface = prefix;

        source.push(" => GetProperty<" + nodeType + ">(\"" + propertyName + "\");");
        popContext(context);
      }
      else
        source.push(" { get; }");
    }
    else
    {
      if (context.emitImplementation)
      {

        pushContext(context);
        const caseChange = context.genOptions.isCaseChange;
        const prefix = context.genOptions.isPrefixInterface;
        context.genOptions.isCaseChange = false;
        context.genOptions.isPrefixInterface = false;
        
        const nodeType = emitTypeNode(node.getTypeNode(), context);
        const propertyName = emitPropertyName(node.getNameNode(), context);
    
        source.push(" { get => GetProperty<" + nodeType + ">(\"" + propertyName + "\"); set => SetProperty<" + nodeType + ">(\"" + propertyName + "\", value); }");

        context.genOptions.isCaseChange = caseChange;
        context.genOptions.isPrefixInterface = prefix;

        popContext(context);
      }
      else
        source.push(" { get; set; }");
    }
    return source.join('');
  }

  export function emitMethodBody(node: sast.MethodSignature, context: ContextInterface) : string {

    const source: string[] = [];
    
    if (context.emitImplementation)
    {
      pushContext(context);
      
      context.offset = node.getPos();
      const ws = getWhitespace(node, context, true); 
      
      source.push(os.EOL, ws);
      addWhitespace(source, node, context);
      source.push("{");
      source.push(os.EOL, ws);

      const caseChange = context.genOptions.isCaseChange;
      const prefix = context.genOptions.isPrefixInterface;
      context.genOptions.isCaseChange = false;
      context.genOptions.isPrefixInterface = false;
    
      const returnType = emitTypeNode(node.getReturnTypeNode(), context);
      const name = emitMethodName(node.getNameNode(), context);
      // source.push("\t", "throw new NotImplementedException();");
      if (returnType !== "void")
      {
        source.push("\t", "return InvokeMethod<" + returnType + ">(\"" + name + "\"");
      }
      else
      {
        source.push("\t", "InvokeMethod<object>(\"" + name + "\"");
      }

      const parmList = node.getParameters();

      let n = node.getParameters().length;
  
      if (n > 0)
      {
        source.push(", ");
        for (let p = 0; p < n; p++)
        {
          const parmDecl = parmList[p];
          // We have to take into account that the type follows the name
          // let's push the parameter name node offset so spacing will be ok.
          // The comma separator will mess the spacing up with whitespace
          context.offset = parmDecl.getStart();
          pushContext(context);

    // // First check if it is a rest parameter
    // if (parmDecl.isRestParameter())
    // {
    //   // emit our parameter type which is at the end.
    //   source.push(emitRestParameter(parmDecl.getTypeNode(), context));

    // }
    // else
    // {
    //   // emit our parameter type which is at the end.
    //   source.push(visitTypeNode(node.getTypeNode(), context));
    // }
    // // let's also put a spacer in there
    // source.push(" ");

    // // now reposition back to the start
    // swapContext(context);

        source.push(emitParameterName(parmDecl.getNameNode(), context));

        // now reposition back to the start
        popContext(context);

            if (p < n - 1)
            {
              source.push(", ");
            }
        }
      }
  
      source.push(");")
      context.genOptions.isCaseChange = caseChange;
      context.genOptions.isPrefixInterface = prefix;

      source.push(os.EOL, ws);
      source.push("}");
      popContext(context);
    }
    else
      addSemicolon(source, node, context);
    
    return source.join('');
  }

  export function emitDOMEventHandler(node: sast.PropertySignature, context: ContextInterface) : string {

    const source: string[] = [];

    const eventName = node.getName().substr(2);

    if (context.emitImplementation)
    {
      pushContext(context);
      context.offset = node.getPos();
      const ws = getWhitespace(node, context, true); 
      popContext(context);
      addWhitespace(source, node, context);
      source.push("public event DOMEventHandler ");
      source.push("On",cc.pascalCase(eventName),os.EOL);
      source.push(ws,"{",os.EOL);
      source.push(ws,"\t", "add => AddEventListener(\"",eventName,"\", value, false);",os.EOL);
      source.push(ws,"\t", "remove => RemoveEventListener(\"",eventName,"\", value, false);",os.EOL);
      source.push(ws,"}");
    }
    else
    {
      addWhitespace(source, node, context);
      source.push("event DOMEventHandler ");
      source.push("On" + cc.pascalCase(eventName) + ";");
    }
    
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
    [SyntaxKind.TypeReference]: emitTypeReference,
  };