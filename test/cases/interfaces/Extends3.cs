interface EventTarget {
    [Export("dispatchEvent")]
    bool dispatchEvent(Event evt);
}

interface Node :  EventTarget {
    [Export("nodeName")]
    string nodeName { get; }
    [Export("nodeType")]
    double nodeType { get; }
}

interface GlobalEventHandlers {
}

interface ElementTraversal {
    [Export("childElementCount")]
    double childElementCount { get; }
}

interface NodeSelector {
}

interface ChildNode {
    [Export("remove")]
    void remove();
}

interface ParentNode {
    [Export("children")]
    HTMLCollection children { get; }
    [Export("childElementCount")]
    double childElementCount { get; }
}

interface Element :  Node,  GlobalEventHandlers,  ElementTraversal,  NodeSelector,  ChildNode,  ParentNode {
    [Export("classList")]
    DOMTokenList classList { get; }
    [Export("className")]
    string className { get; set; }
    [Export("clientHeight")]
    double clientHeight { get; }
    [Export("clientLeft")]
    double clientLeft { get; }
    [Export("clientTop")]
    double clientTop { get; }
    [Export("clientWidth")]
    double clientWidth { get; }
    [Export("id")]
    string id { get; set; }
    [Export("innerHTML")]
    string innerHTML { get; set; }
    [Export("msContentZoomFactor")]
    double msContentZoomFactor { get; set; }
    [Export("msRegionOverflow")]
    string msRegionOverflow { get; }
}
