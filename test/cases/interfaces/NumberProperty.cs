interface Element :  Node,  GlobalEventHandlers,  ElementTraversal,  NodeSelector,  ChildNode,  ParentNode {
    [Export("scrollLeft")]
    double scrollLeft { get; set; }
    [Export("scrollTop")]
    double scrollTop { get; set; }
}
