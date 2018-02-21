interface FauxInterface {
    [Export("initFaux")]
    void initFaux(string eventTypeArg, bool? canBubbleArg, bool? cancelableArg);
}
