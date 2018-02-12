[Export("EventTarget")]
interface EventTarget {
    [Export("dispatchEvent")]
    bool dispatchEvent(Event evt);
}

[Export("Node")]
interface Node :  EventTarget {

}
