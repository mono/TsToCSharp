interface TouchList {
    [Export("length")]
    double length { get; }
    [Export("item")]
    Touch item(double index);
    Touch this[double index] { get; set; }
}

interface Touch {
    [Export("clientX")]
    double clientX { get; }
    [Export("clientY")]
    double clientY { get; }
    [Export("identifier")]
    double identifier { get; }
    [Export("pageX")]
    double pageX { get; }
    [Export("pageY")]
    double pageY { get; }
    [Export("screenX")]
    double screenX { get; }
    [Export("screenY")]
    double screenY { get; }
    [Export("target")]
    EventTarget target { get; }
}

interface Document :  Node,  GlobalEventHandlers,  NodeSelector,  DocumentEvent,  ParentNode,  DocumentOrShadowRoot {
    [Export("createTouchList")]
    TouchList createTouchList(params Touch[] touches);
}
