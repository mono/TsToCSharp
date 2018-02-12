[Export(EventTarget)]
interface EventTarget {
    bool dispatchEvent(Event evt);
}

[Export(Node)]
interface Node :  EventTarget {
    string nodeName { get; }
    double nodeType { get; }
}

[Export(GlobalEventHandlers)]
interface GlobalEventHandlers {
}

[Export(ElementTraversal)]
interface ElementTraversal {
    double childElementCount { get; }
}

[Export(NodeSelector)]
interface NodeSelector {
}

[Export(ChildNode)]
interface ChildNode {
    void remove();
}

[Export(ParentNode)]
interface ParentNode {
    HTMLCollection children { get; }
    double childElementCount { get; }
}

[Export(Element)]
interface Element :  Node,  GlobalEventHandlers,  ElementTraversal,  NodeSelector,  ChildNode,  ParentNode {
    DOMTokenList classList { get; }
    string className { get; set; }
    double clientHeight { get; }
    double clientLeft { get; }
    double clientTop { get; }
    double clientWidth { get; }
    string id { get; set; }
    string innerHTML { get; set; }
    double msContentZoomFactor { get; set; }
    string msRegionOverflow { get; }
}
