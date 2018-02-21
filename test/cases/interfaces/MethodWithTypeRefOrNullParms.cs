interface Document :  Node,  GlobalEventHandlers,  NodeSelector,  DocumentEvent,  ParentNode,  DocumentOrShadowRoot {
    [Export("evaluate")]
    XPathResult evaluate(string expression, Node contextNode, XPathNSResolver resolver, double type, XPathResult result);

}
