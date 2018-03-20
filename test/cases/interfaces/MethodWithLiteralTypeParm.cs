interface Element :  Node,  GlobalEventHandlers,  ElementTraversal,  NodeSelector,  ChildNode,  ParentNode {
    [Export("getElementsByTagNameNS")]
    HTMLCollectionOf<HTMLElement> getElementsByTagNameNS(string namespaceURI, string localName);
    [Export("getElementsByTagNameNS")]
    HTMLCollectionOf<SVGElement> getElementsByTagNameNS(string namespaceURI, string localName);
    [Export("getElementsByTagNameNS")]
    HTMLCollectionOf<Element> getElementsByTagNameNS(string namespaceURI, string localName);
}
