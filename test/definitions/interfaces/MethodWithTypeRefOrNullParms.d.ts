interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent, ParentNode, DocumentOrShadowRoot {
    evaluate(expression: string, contextNode: Node, resolver: XPathNSResolver | null, type: number, result: XPathResult | null): XPathResult;

}
