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