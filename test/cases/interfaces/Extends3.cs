[Export("EventTarget")]
interface EventTarget {
    [Export("dispatchEvent")]
    bool dispatchEvent(Event evt);
}

[Export("Node")]
interface Node :  EventTarget {
    [Export("nodeName")]
    string nodeName { get; }
    [Export("nodeType")]
    double nodeType { get; }
}

[Export("GlobalEventHandlers")]
interface GlobalEventHandlers {
}

[Export("ElementTraversal")]
interface ElementTraversal {
    [Export("childElementCount")]
    double childElementCount { get; }
}

[Export("NodeSelector")]
interface NodeSelector {
}

[Export("ChildNode")]
interface ChildNode {
    [Export("remove")]
    void remove();
}

[Export("ParentNode")]
interface ParentNode {
    [Export("children")]
    HTMLCollection children { get; }
    [Export("childElementCount")]
    double childElementCount { get; }
}

[Export("Element")]
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
