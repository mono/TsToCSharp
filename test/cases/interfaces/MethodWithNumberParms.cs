interface Document :  Node,  GlobalEventHandlers,  NodeSelector,  DocumentEvent,  ParentNode,  DocumentOrShadowRoot {
    [Export("caretRangeFromPoint")]
    Range caretRangeFromPoint(double x, double y);
}
