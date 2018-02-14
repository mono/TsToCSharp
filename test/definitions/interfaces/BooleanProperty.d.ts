interface Event {
    readonly bubbles: boolean;
    readonly cancelable: boolean;
    cancelBubble: boolean;
    readonly defaultPrevented: boolean;
    readonly isTrusted: boolean;
    returnValue: boolean;
    readonly scoped: boolean;
}
