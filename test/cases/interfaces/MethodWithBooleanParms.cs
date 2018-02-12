interface Event {
    [Export("initEvent")]
    void initEvent(string eventTypeArg, bool canBubbleArg, bool cancelableArg);
}