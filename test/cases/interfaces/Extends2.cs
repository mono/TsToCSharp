interface EventTarget {
    [Export("dispatchEvent")]
    bool dispatchEvent(Event evt);
}

interface Node :  EventTarget {

}
