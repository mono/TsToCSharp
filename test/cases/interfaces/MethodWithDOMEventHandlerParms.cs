interface EventTarget {
    [Export("addEventListener")]
    void addEventListener(string type, DOMEventHandler listener, object options);
    [Export("dispatchEvent")]
    bool dispatchEvent(Event evt);
    [Export("removeEventListener")]
    void removeEventListener(string type, DOMEventHandler listener, object options);
}

[Export("EventTarget", typeof(Mono.WebAssembly.JSObject))]
public sealed class EventTarget {
    
    public EventTarget () { }
    [Export("addEventListener")]
     void addEventListener(string type, DOMEventHandler listener, object options)
    {
    	throw new NotImplementedException();
    }
    [Export("dispatchEvent")]
     bool dispatchEvent(Event evt)
    {
    	throw new NotImplementedException();
    }
    [Export("removeEventListener")]
     void removeEventListener(string type, DOMEventHandler listener, object options)
    {
    	throw new NotImplementedException();
    }
}
