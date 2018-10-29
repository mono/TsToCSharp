interface EventTarget {
    [Export("addEventListener")]
    void addEventListener(string type, DOMEventHandler listener, object options);
    [Export("dispatchEvent")]
    bool dispatchEvent(Event evt);
    [Export("removeEventListener")]
    void removeEventListener(string type, DOMEventHandler listener, object options);
}

[Export("EventTarget", typeof(JSObject))]
public sealed class EventTarget : JSObject {
    internal EventTarget  (int handle) : base (handle) {}

    public EventTarget () { }
    [Export("addEventListener")]
     void addEventListener(string type, DOMEventHandler listener, object options)
    {
    	InvokeMethod<object>("addEventListener", type, listener, options);
    }
    [Export("dispatchEvent")]
     bool dispatchEvent(Event evt)
    {
    	return InvokeMethod<bool>("dispatchEvent", evt);
    }
    [Export("removeEventListener")]
     void removeEventListener(string type, DOMEventHandler listener, object options)
    {
    	InvokeMethod<object>("removeEventListener", type, listener, options);
    }
}
