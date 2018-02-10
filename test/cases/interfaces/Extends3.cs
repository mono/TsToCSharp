interface EventTarget {
    bool dispatchEvent(Event evt);
}

interface Node :  EventTarget {
    string nodeName { get; }
    double nodeType { get; }
}

interface GlobalEventHandlers {
}

interface ElementTraversal {
    double childElementCount { get; }
}

interface NodeSelector {
}

interface ChildNode {
    void remove();
}

interface ParentNode {
    HTMLCollection children { get; }
    double childElementCount { get; }
}

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
