interface Event {
    [Export("bubbles")]
    bool bubbles { get; }
    [Export("cancelable")]
    bool cancelable { get; }
    [Export("cancelBubble")]
    bool cancelBubble { get; set; }
    [Export("defaultPrevented")]
    bool defaultPrevented { get; }
    [Export("isTrusted")]
    bool isTrusted { get; }
    [Export("returnValue")]
    bool returnValue { get; set; }
    [Export("scoped")]
    bool scoped { get; }
}