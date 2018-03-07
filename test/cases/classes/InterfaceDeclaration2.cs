public interface IErrorEvent :  IEvent {
    [Export("colno")]
    double Colno { get; }
    [Export("error")]
    Object Error { get; }
    [Export("filename")]
    string Filename { get; }
    [Export("lineno")]
    double Lineno { get; }
    [Export("message")]
    string Message { get; }
    [Export("initErrorEvent")]
    void InitErrorEvent(string typeArg, bool canBubbleArg, bool cancelableArg, string messageArg, string filenameArg, double linenoArg);
}

[Export("ErrorEvent", typeof(Mono.WebAssembly.JSObject))]
public sealed class ErrorEvent {
    
    public ErrorEvent (string type, ErrorEventInit errorEventInitDict) { }
    [Export("colno")]
    public double Colno => throw new NotImplementedException();
    [Export("error")]
    public Object Error => throw new NotImplementedException();
    [Export("filename")]
    public string Filename => throw new NotImplementedException();
    [Export("lineno")]
    public double Lineno => throw new NotImplementedException();
    [Export("message")]
    public string Message => throw new NotImplementedException();
    [Export("bubbles")]
    public bool Bubbles => throw new NotImplementedException();
    [Export("cancelable")]
    public bool Cancelable => throw new NotImplementedException();
    [Export("cancelBubble")]
    public bool CancelBubble { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("currentTarget")]
    public EventTarget CurrentTarget => throw new NotImplementedException();
    [Export("defaultPrevented")]
    public bool DefaultPrevented => throw new NotImplementedException();
    [Export("eventPhase")]
    public double EventPhase => throw new NotImplementedException();
    [Export("isTrusted")]
    public bool IsTrusted => throw new NotImplementedException();
    [Export("returnValue")]
    public bool ReturnValue { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("srcElement")]
    public Element SrcElement => throw new NotImplementedException();
    [Export("target")]
    public EventTarget Target => throw new NotImplementedException();
    [Export("timeStamp")]
    public double TimeStamp => throw new NotImplementedException();
    [Export("type")]
    public string Type => throw new NotImplementedException();
    [Export("scoped")]
    public bool Scoped => throw new NotImplementedException();
    [Export("AT_TARGET")]
    public double AtTarget => throw new NotImplementedException();
    [Export("BUBBLING_PHASE")]
    public double BubblingPhase => throw new NotImplementedException();
    [Export("CAPTURING_PHASE")]
    public double CapturingPhase => throw new NotImplementedException();
    [Export("initErrorEvent")]
    public void InitErrorEvent(string typeArg, bool canBubbleArg, bool cancelableArg, string messageArg, string filenameArg, double linenoArg)
    {
    	throw new NotImplementedException();
    }
    [Export("initEvent")]
    public void InitEvent(string eventTypeArg, bool canBubbleArg, bool cancelableArg)
    {
    	throw new NotImplementedException();
    }
    [Export("preventDefault")]
    public void PreventDefault()
    {
    	throw new NotImplementedException();
    }
    [Export("stopImmediatePropagation")]
    public void StopImmediatePropagation()
    {
    	throw new NotImplementedException();
    }
    [Export("stopPropagation")]
    public void StopPropagation()
    {
    	throw new NotImplementedException();
    }
    [Export("deepPath")]
    public EventTarget[] DeepPath()
    {
    	throw new NotImplementedException();
    }
}

public interface IEvent {
    [Export("bubbles")]
    bool Bubbles { get; }
    [Export("cancelable")]
    bool Cancelable { get; }
    [Export("cancelBubble")]
    bool CancelBubble { get; set; }
    [Export("currentTarget")]
    EventTarget CurrentTarget { get; }
    [Export("defaultPrevented")]
    bool DefaultPrevented { get; }
    [Export("eventPhase")]
    double EventPhase { get; }
    [Export("isTrusted")]
    bool IsTrusted { get; }
    [Export("returnValue")]
    bool ReturnValue { get; set; }
    [Export("srcElement")]
    Element SrcElement { get; }
    [Export("target")]
    EventTarget Target { get; }
    [Export("timeStamp")]
    double TimeStamp { get; }
    [Export("type")]
    string Type { get; }
    [Export("scoped")]
    bool Scoped { get; }
    [Export("initEvent")]
    void InitEvent(string eventTypeArg, bool canBubbleArg, bool cancelableArg);
    [Export("preventDefault")]
    void PreventDefault();
    [Export("stopImmediatePropagation")]
    void StopImmediatePropagation();
    [Export("stopPropagation")]
    void StopPropagation();
    [Export("deepPath")]
    EventTarget[] DeepPath();
    [Export("AT_TARGET")]
    double AtTarget { get; }
    [Export("BUBBLING_PHASE")]
    double BubblingPhase { get; }
    [Export("CAPTURING_PHASE")]
    double CapturingPhase { get; }
}

[Export("Event", typeof(Mono.WebAssembly.JSObject))]
public sealed class Event {
    
    public Event (string typeArg, EventInit eventInitDict) { }
    [Export("AT_TARGET")]
    public double AtTarget => throw new NotImplementedException();
    [Export("BUBBLING_PHASE")]
    public double BubblingPhase => throw new NotImplementedException();
    [Export("CAPTURING_PHASE")]
    public double CapturingPhase => throw new NotImplementedException();
    [Export("bubbles")]
    public bool Bubbles => throw new NotImplementedException();
    [Export("cancelable")]
    public bool Cancelable => throw new NotImplementedException();
    [Export("cancelBubble")]
    public bool CancelBubble { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("currentTarget")]
    public EventTarget CurrentTarget => throw new NotImplementedException();
    [Export("defaultPrevented")]
    public bool DefaultPrevented => throw new NotImplementedException();
    [Export("eventPhase")]
    public double EventPhase => throw new NotImplementedException();
    [Export("isTrusted")]
    public bool IsTrusted => throw new NotImplementedException();
    [Export("returnValue")]
    public bool ReturnValue { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("srcElement")]
    public Element SrcElement => throw new NotImplementedException();
    [Export("target")]
    public EventTarget Target => throw new NotImplementedException();
    [Export("timeStamp")]
    public double TimeStamp => throw new NotImplementedException();
    [Export("type")]
    public string Type => throw new NotImplementedException();
    [Export("scoped")]
    public bool Scoped => throw new NotImplementedException();
    [Export("initEvent")]
    public void InitEvent(string eventTypeArg, bool canBubbleArg, bool cancelableArg)
    {
    	throw new NotImplementedException();
    }
    [Export("preventDefault")]
    public void PreventDefault()
    {
    	throw new NotImplementedException();
    }
    [Export("stopImmediatePropagation")]
    public void StopImmediatePropagation()
    {
    	throw new NotImplementedException();
    }
    [Export("stopPropagation")]
    public void StopPropagation()
    {
    	throw new NotImplementedException();
    }
    [Export("deepPath")]
    public EventTarget[] DeepPath()
    {
    	throw new NotImplementedException();
    }
}
