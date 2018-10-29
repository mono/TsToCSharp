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

[Export("ErrorEvent", typeof(JSObject))]
public sealed class ErrorEvent : JSObject {
    internal ErrorEvent  (int handle) : base (handle) {}

    public ErrorEvent (string type, ErrorEventInit errorEventInitDict) { }
    [Export("colno")]
    public double Colno => GetProperty<double>("colno");
    [Export("error")]
    public Object Error => GetProperty<Object>("error");
    [Export("filename")]
    public string Filename => GetProperty<string>("filename");
    [Export("lineno")]
    public double Lineno => GetProperty<double>("lineno");
    [Export("message")]
    public string Message => GetProperty<string>("message");
    [Export("bubbles")]
    public bool Bubbles => GetProperty<bool>("bubbles");
    [Export("cancelable")]
    public bool Cancelable => GetProperty<bool>("cancelable");
    [Export("cancelBubble")]
    public bool CancelBubble { get => GetProperty<bool>("cancelBubble"); set => SetProperty<bool>("cancelBubble", value); }
    [Export("currentTarget")]
    public EventTarget CurrentTarget => GetProperty<EventTarget>("currentTarget");
    [Export("defaultPrevented")]
    public bool DefaultPrevented => GetProperty<bool>("defaultPrevented");
    [Export("eventPhase")]
    public double EventPhase => GetProperty<double>("eventPhase");
    [Export("isTrusted")]
    public bool IsTrusted => GetProperty<bool>("isTrusted");
    [Export("returnValue")]
    public bool ReturnValue { get => GetProperty<bool>("returnValue"); set => SetProperty<bool>("returnValue", value); }
    [Export("srcElement")]
    public Element SrcElement => GetProperty<Element>("srcElement");
    [Export("target")]
    public EventTarget Target => GetProperty<EventTarget>("target");
    [Export("timeStamp")]
    public double TimeStamp => GetProperty<double>("timeStamp");
    [Export("type")]
    public string Type => GetProperty<string>("type");
    [Export("scoped")]
    public bool Scoped => GetProperty<bool>("scoped");
    [Export("AT_TARGET")]
    public double AtTarget => GetProperty<double>("AT_TARGET");
    [Export("BUBBLING_PHASE")]
    public double BubblingPhase => GetProperty<double>("BUBBLING_PHASE");
    [Export("CAPTURING_PHASE")]
    public double CapturingPhase => GetProperty<double>("CAPTURING_PHASE");
    [Export("initErrorEvent")]
    public void InitErrorEvent(string typeArg, bool canBubbleArg, bool cancelableArg, string messageArg, string filenameArg, double linenoArg)
    {
    	InvokeMethod<object>("initErrorEvent", typeArg, canBubbleArg, cancelableArg, messageArg, filenameArg, linenoArg);
    }
    [Export("initEvent")]
    public void InitEvent(string eventTypeArg, bool canBubbleArg, bool cancelableArg)
    {
    	InvokeMethod<object>("initEvent", eventTypeArg, canBubbleArg, cancelableArg);
    }
    [Export("preventDefault")]
    public void PreventDefault()
    {
    	InvokeMethod<object>("preventDefault");
    }
    [Export("stopImmediatePropagation")]
    public void StopImmediatePropagation()
    {
    	InvokeMethod<object>("stopImmediatePropagation");
    }
    [Export("stopPropagation")]
    public void StopPropagation()
    {
    	InvokeMethod<object>("stopPropagation");
    }
    [Export("deepPath")]
    public EventTarget[] DeepPath()
    {
    	return InvokeMethod<EventTarget[]>("deepPath");
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

[Export("Event", typeof(JSObject))]
public sealed class Event : JSObject {
    internal Event  (int handle) : base (handle) {}

    public Event (string typeArg, EventInit eventInitDict) { }
    [Export("AT_TARGET")]
    public double AtTarget => GetProperty<double>("AT_TARGET");
    [Export("BUBBLING_PHASE")]
    public double BubblingPhase => GetProperty<double>("BUBBLING_PHASE");
    [Export("CAPTURING_PHASE")]
    public double CapturingPhase => GetProperty<double>("CAPTURING_PHASE");
    [Export("bubbles")]
    public bool Bubbles => GetProperty<bool>("bubbles");
    [Export("cancelable")]
    public bool Cancelable => GetProperty<bool>("cancelable");
    [Export("cancelBubble")]
    public bool CancelBubble { get => GetProperty<bool>("cancelBubble"); set => SetProperty<bool>("cancelBubble", value); }
    [Export("currentTarget")]
    public EventTarget CurrentTarget => GetProperty<EventTarget>("currentTarget");
    [Export("defaultPrevented")]
    public bool DefaultPrevented => GetProperty<bool>("defaultPrevented");
    [Export("eventPhase")]
    public double EventPhase => GetProperty<double>("eventPhase");
    [Export("isTrusted")]
    public bool IsTrusted => GetProperty<bool>("isTrusted");
    [Export("returnValue")]
    public bool ReturnValue { get => GetProperty<bool>("returnValue"); set => SetProperty<bool>("returnValue", value); }
    [Export("srcElement")]
    public Element SrcElement => GetProperty<Element>("srcElement");
    [Export("target")]
    public EventTarget Target => GetProperty<EventTarget>("target");
    [Export("timeStamp")]
    public double TimeStamp => GetProperty<double>("timeStamp");
    [Export("type")]
    public string Type => GetProperty<string>("type");
    [Export("scoped")]
    public bool Scoped => GetProperty<bool>("scoped");
    [Export("initEvent")]
    public void InitEvent(string eventTypeArg, bool canBubbleArg, bool cancelableArg)
    {
    	InvokeMethod<object>("initEvent", eventTypeArg, canBubbleArg, cancelableArg);
    }
    [Export("preventDefault")]
    public void PreventDefault()
    {
    	InvokeMethod<object>("preventDefault");
    }
    [Export("stopImmediatePropagation")]
    public void StopImmediatePropagation()
    {
    	InvokeMethod<object>("stopImmediatePropagation");
    }
    [Export("stopPropagation")]
    public void StopPropagation()
    {
    	InvokeMethod<object>("stopPropagation");
    }
    [Export("deepPath")]
    public EventTarget[] DeepPath()
    {
    	return InvokeMethod<EventTarget[]>("deepPath");
    }
}
