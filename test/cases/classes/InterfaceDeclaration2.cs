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
    double Colno => throw new NotImplementedException();
    [Export("error")]
    Object Error => throw new NotImplementedException();
    [Export("filename")]
    string Filename => throw new NotImplementedException();
    [Export("lineno")]
    double Lineno => throw new NotImplementedException();
    [Export("message")]
    string Message => throw new NotImplementedException();
    [Export("bubbles")]
    bool Bubbles => throw new NotImplementedException();
    [Export("cancelable")]
    bool Cancelable => throw new NotImplementedException();
    [Export("cancelBubble")]
    bool CancelBubble { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("currentTarget")]
    EventTarget CurrentTarget => throw new NotImplementedException();
    [Export("defaultPrevented")]
    bool DefaultPrevented => throw new NotImplementedException();
    [Export("eventPhase")]
    double EventPhase => throw new NotImplementedException();
    [Export("isTrusted")]
    bool IsTrusted => throw new NotImplementedException();
    [Export("returnValue")]
    bool ReturnValue { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("srcElement")]
    Element SrcElement => throw new NotImplementedException();
    [Export("target")]
    EventTarget Target => throw new NotImplementedException();
    [Export("timeStamp")]
    double TimeStamp => throw new NotImplementedException();
    [Export("type")]
    string Type => throw new NotImplementedException();
    [Export("scoped")]
    bool Scoped => throw new NotImplementedException();
    [Export("AT_TARGET")]
    double AtTarget => throw new NotImplementedException();
    [Export("BUBBLING_PHASE")]
    double BubblingPhase => throw new NotImplementedException();
    [Export("CAPTURING_PHASE")]
    double CapturingPhase => throw new NotImplementedException();
    [Export("initErrorEvent")]
    void InitErrorEvent(string typeArg, bool canBubbleArg, bool cancelableArg, string messageArg, string filenameArg, double linenoArg)
    {
    	throw new NotImplementedException();
    }
    [Export("initEvent")]
    void InitEvent(string eventTypeArg, bool canBubbleArg, bool cancelableArg)
    {
    	throw new NotImplementedException();
    }
    [Export("preventDefault")]
    void PreventDefault()
    {
    	throw new NotImplementedException();
    }
    [Export("stopImmediatePropagation")]
    void StopImmediatePropagation()
    {
    	throw new NotImplementedException();
    }
    [Export("stopPropagation")]
    void StopPropagation()
    {
    	throw new NotImplementedException();
    }
    [Export("deepPath")]
    EventTarget[] DeepPath()
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
    double AtTarget => throw new NotImplementedException();
    [Export("BUBBLING_PHASE")]
    double BubblingPhase => throw new NotImplementedException();
    [Export("CAPTURING_PHASE")]
    double CapturingPhase => throw new NotImplementedException();
    [Export("bubbles")]
    bool Bubbles => throw new NotImplementedException();
    [Export("cancelable")]
    bool Cancelable => throw new NotImplementedException();
    [Export("cancelBubble")]
    bool CancelBubble { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("currentTarget")]
    EventTarget CurrentTarget => throw new NotImplementedException();
    [Export("defaultPrevented")]
    bool DefaultPrevented => throw new NotImplementedException();
    [Export("eventPhase")]
    double EventPhase => throw new NotImplementedException();
    [Export("isTrusted")]
    bool IsTrusted => throw new NotImplementedException();
    [Export("returnValue")]
    bool ReturnValue { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("srcElement")]
    Element SrcElement => throw new NotImplementedException();
    [Export("target")]
    EventTarget Target => throw new NotImplementedException();
    [Export("timeStamp")]
    double TimeStamp => throw new NotImplementedException();
    [Export("type")]
    string Type => throw new NotImplementedException();
    [Export("scoped")]
    bool Scoped => throw new NotImplementedException();
    [Export("initEvent")]
    void InitEvent(string eventTypeArg, bool canBubbleArg, bool cancelableArg)
    {
    	throw new NotImplementedException();
    }
    [Export("preventDefault")]
    void PreventDefault()
    {
    	throw new NotImplementedException();
    }
    [Export("stopImmediatePropagation")]
    void StopImmediatePropagation()
    {
    	throw new NotImplementedException();
    }
    [Export("stopPropagation")]
    void StopPropagation()
    {
    	throw new NotImplementedException();
    }
    [Export("deepPath")]
    EventTarget[] DeepPath()
    {
    	throw new NotImplementedException();
    }
}