[Export(EventTarget)]
interface EventTarget {
    bool dispatchEvent(Event evt);
}

[Export(Node)]
interface Node :  EventTarget {

}
