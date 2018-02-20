interface CustomEvent<T> :  Event {
    [Export("detail")]
    T detail { get; }
    [Export("initCustomEvent")]
    void initCustomEvent(string typeArg, bool canBubbleArg, bool cancelableArg, T detailArg);
}
