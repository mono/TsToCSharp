interface Event {
    [Export("bubbles")]
    bool bubbles { get; }
    [Export("cancelable")]
    bool cancelable { get; }
    [Export("cancelBubble")]
    bool cancelBubble { get; set; }
    [Export("currentTarget")]
    EventTarget currentTarget { get; }
    [Export("defaultPrevented")]
    bool defaultPrevented { get; }
    [Export("eventPhase")]
    double eventPhase { get; }
    [Export("isTrusted")]
    bool isTrusted { get; }
    [Export("returnValue")]
    bool returnValue { get; set; }
    [Export("srcElement")]
    Element srcElement { get; }
    [Export("target")]
    EventTarget target { get; }
    [Export("timeStamp")]
    double timeStamp { get; }
    [Export("type")]
    string type { get; }
    [Export("scoped")]
    bool scoped { get; }
    [Export("initEvent")]
    void initEvent(string eventTypeArg, bool canBubbleArg, bool cancelableArg);
    [Export("preventDefault")]
    void preventDefault();
    [Export("stopImmediatePropagation")]
    void stopImmediatePropagation();
    [Export("stopPropagation")]
    void stopPropagation();
    [Export("deepPath")]
    EventTarget[] deepPath();
    [Export("AT_TARGET")]
    double AT_TARGET { get; }
    [Export("BUBBLING_PHASE")]
    double BUBBLING_PHASE { get; }
    [Export("CAPTURING_PHASE")]
    double CAPTURING_PHASE { get; }
}

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

interface HTMLCollectionBase {
    /**
     * Sets or retrieves the number of objects in a collection.
     */
    [Export("length")]
    double length { get; }
    /**
     * Retrieves an object from various collections.
     */
    [Export("item")]
    Element item(double index);
    Element this[double index] { get; set; }
}

interface HTMLCollection :  HTMLCollectionBase {
    /**
     * Retrieves a select object or an object from an options collection.
     */
    [Export("namedItem")]
    Element namedItem(string name);
}

interface ParentNode {
    [Export("children")]
    HTMLCollection children { get; }
    [Export("childElementCount")]
    double childElementCount { get; }
}

interface DOMTokenList {
    [Export("length")]
    double length { get; }
    [Export("contains")]
    bool contains(string token);
    [Export("item")]
    string item(double index);
    [Export("toggle")]
    bool toggle(string token, bool force);
    [Export("toString")]
    string toString();
    string this[double index] { get; set; }
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
