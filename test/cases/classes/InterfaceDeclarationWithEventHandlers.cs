
public interface IGlobalEventHandlers {
    event DOMEventHandler OnPointercancel;
    event DOMEventHandler OnPointerdown;
    event DOMEventHandler OnPointerenter;
    event DOMEventHandler OnPointerleave;
    event DOMEventHandler OnPointermove;
    event DOMEventHandler OnPointerout;
    event DOMEventHandler OnPointerover;
    event DOMEventHandler OnPointerup;
    event DOMEventHandler OnWheel;
    [Export("addEventListener")]
    void AddEventListener(string type, DOMEventHandler listener, object options);
    [Export("removeEventListener")]
    void RemoveEventListener(string type, DOMEventHandler listener, object options);
}

public interface IEventTarget {
    [Export("addEventListener")]
    void AddEventListener(string type, DOMEventHandler listener, object options);
    [Export("dispatchEvent")]
    bool DispatchEvent(Event evt);
    [Export("removeEventListener")]
    void RemoveEventListener(string type, DOMEventHandler listener, object options);
}

[Export("EventTarget", typeof(Mono.WebAssembly.JSObject))]
public sealed class EventTarget : JSObject {
    internal EventTarget  (int handle) : base (handle) {}

    public EventTarget () { }
    [Export("addEventListener")]
    public void AddEventListener(string type, DOMEventHandler listener, object options)
    {
    	InvokeMethod<object>("addEventListener", type, listener, options);
    }
    [Export("dispatchEvent")]
    public bool DispatchEvent(Event evt)
    {
    	return InvokeMethod<bool>("dispatchEvent", evt);
    }
    [Export("removeEventListener")]
    public void RemoveEventListener(string type, DOMEventHandler listener, object options)
    {
    	InvokeMethod<object>("removeEventListener", type, listener, options);
    }
}

public interface IWindow :  IEventTarget,  IGlobalEventHandlers {

    event DOMEventHandler OnAbort;
    event DOMEventHandler OnAfterprint;
    event DOMEventHandler OnBeforeprint;
    event DOMEventHandler OnBeforeunload;
    event DOMEventHandler OnBlur;
    event DOMEventHandler OnCanplay;
    event DOMEventHandler OnCanplaythrough;
    event DOMEventHandler OnChange;
    event DOMEventHandler OnClick;
    event DOMEventHandler OnCompassneedscalibration;
    event DOMEventHandler OnContextmenu;
    event DOMEventHandler OnDblclick;
    event DOMEventHandler OnDevicelight;
    event DOMEventHandler OnDevicemotion;
    event DOMEventHandler OnDeviceorientation;
    event DOMEventHandler OnDrag;
    event DOMEventHandler OnDragend;
    event DOMEventHandler OnDragenter;
    event DOMEventHandler OnDragleave;
    event DOMEventHandler OnDragover;
    event DOMEventHandler OnDragstart;
    event DOMEventHandler OnDrop;
    event DOMEventHandler OnDurationchange;
    event DOMEventHandler OnEmptied;
    event DOMEventHandler OnEnded;
    event DOMEventHandler OnFocus;
    event DOMEventHandler OnHashchange;
    event DOMEventHandler OnInput;
    event DOMEventHandler OnInvalid;
    event DOMEventHandler OnKeydown;
    event DOMEventHandler OnKeypress;
    event DOMEventHandler OnKeyup;
    event DOMEventHandler OnLoad;
    event DOMEventHandler OnLoadeddata;
    event DOMEventHandler OnLoadedmetadata;
    event DOMEventHandler OnLoadstart;
    event DOMEventHandler OnMessage;
    event DOMEventHandler OnMousedown;
    event DOMEventHandler OnMouseenter;
    event DOMEventHandler OnMouseleave;
    event DOMEventHandler OnMousemove;
    event DOMEventHandler OnMouseout;
    event DOMEventHandler OnMouseover;
    event DOMEventHandler OnMouseup;
    event DOMEventHandler OnMousewheel;
    event DOMEventHandler OnMsgesturechange;
    event DOMEventHandler OnMsgesturedoubletap;
    event DOMEventHandler OnMsgestureend;
    event DOMEventHandler OnMsgesturehold;
    event DOMEventHandler OnMsgesturestart;
    event DOMEventHandler OnMsgesturetap;
    event DOMEventHandler OnMsinertiastart;
    event DOMEventHandler OnMspointercancel;
    event DOMEventHandler OnMspointerdown;
    event DOMEventHandler OnMspointerenter;
    event DOMEventHandler OnMspointerleave;
    event DOMEventHandler OnMspointermove;
    event DOMEventHandler OnMspointerout;
    event DOMEventHandler OnMspointerover;
    event DOMEventHandler OnMspointerup;
    event DOMEventHandler OnOffline;
    event DOMEventHandler OnOnline;
    event DOMEventHandler OnOrientationchange;
    event DOMEventHandler OnPagehide;
    event DOMEventHandler OnPageshow;
    event DOMEventHandler OnPause;
    event DOMEventHandler OnPlay;
    event DOMEventHandler OnPlaying;
    event DOMEventHandler OnPopstate;
    event DOMEventHandler OnProgress;
    event DOMEventHandler OnRatechange;
    event DOMEventHandler OnReadystatechange;
    event DOMEventHandler OnReset;
    event DOMEventHandler OnResize;
    event DOMEventHandler OnScroll;
    event DOMEventHandler OnSeeked;
    event DOMEventHandler OnSeeking;
    event DOMEventHandler OnSelect;
    event DOMEventHandler OnStalled;
    event DOMEventHandler OnStorage;
    event DOMEventHandler OnSubmit;
    event DOMEventHandler OnSuspend;
    event DOMEventHandler OnTimeupdate;
    event DOMEventHandler OnUnload;
    event DOMEventHandler OnVolumechange;
    event DOMEventHandler OnWaiting;

}

[Export("Window", typeof(Mono.WebAssembly.JSObject))]
public sealed class Window : JSObject {
    internal Window  (int handle) : base (handle) {}

    public Window () { }

    public event DOMEventHandler OnAbort
    {
    	add => AddEventListener("abort", value, false);
    	remove => RemoveEventListener("abort", value, false);
    }
    public event DOMEventHandler OnAfterprint
    {
    	add => AddEventListener("afterprint", value, false);
    	remove => RemoveEventListener("afterprint", value, false);
    }
    public event DOMEventHandler OnBeforeprint
    {
    	add => AddEventListener("beforeprint", value, false);
    	remove => RemoveEventListener("beforeprint", value, false);
    }
    public event DOMEventHandler OnBeforeunload
    {
    	add => AddEventListener("beforeunload", value, false);
    	remove => RemoveEventListener("beforeunload", value, false);
    }
    public event DOMEventHandler OnBlur
    {
    	add => AddEventListener("blur", value, false);
    	remove => RemoveEventListener("blur", value, false);
    }
    public event DOMEventHandler OnCanplay
    {
    	add => AddEventListener("canplay", value, false);
    	remove => RemoveEventListener("canplay", value, false);
    }
    public event DOMEventHandler OnCanplaythrough
    {
    	add => AddEventListener("canplaythrough", value, false);
    	remove => RemoveEventListener("canplaythrough", value, false);
    }
    public event DOMEventHandler OnChange
    {
    	add => AddEventListener("change", value, false);
    	remove => RemoveEventListener("change", value, false);
    }
    public event DOMEventHandler OnClick
    {
    	add => AddEventListener("click", value, false);
    	remove => RemoveEventListener("click", value, false);
    }
    public event DOMEventHandler OnCompassneedscalibration
    {
    	add => AddEventListener("compassneedscalibration", value, false);
    	remove => RemoveEventListener("compassneedscalibration", value, false);
    }
    public event DOMEventHandler OnContextmenu
    {
    	add => AddEventListener("contextmenu", value, false);
    	remove => RemoveEventListener("contextmenu", value, false);
    }
    public event DOMEventHandler OnDblclick
    {
    	add => AddEventListener("dblclick", value, false);
    	remove => RemoveEventListener("dblclick", value, false);
    }
    public event DOMEventHandler OnDevicelight
    {
    	add => AddEventListener("devicelight", value, false);
    	remove => RemoveEventListener("devicelight", value, false);
    }
    public event DOMEventHandler OnDevicemotion
    {
    	add => AddEventListener("devicemotion", value, false);
    	remove => RemoveEventListener("devicemotion", value, false);
    }
    public event DOMEventHandler OnDeviceorientation
    {
    	add => AddEventListener("deviceorientation", value, false);
    	remove => RemoveEventListener("deviceorientation", value, false);
    }
    public event DOMEventHandler OnDrag
    {
    	add => AddEventListener("drag", value, false);
    	remove => RemoveEventListener("drag", value, false);
    }
    public event DOMEventHandler OnDragend
    {
    	add => AddEventListener("dragend", value, false);
    	remove => RemoveEventListener("dragend", value, false);
    }
    public event DOMEventHandler OnDragenter
    {
    	add => AddEventListener("dragenter", value, false);
    	remove => RemoveEventListener("dragenter", value, false);
    }
    public event DOMEventHandler OnDragleave
    {
    	add => AddEventListener("dragleave", value, false);
    	remove => RemoveEventListener("dragleave", value, false);
    }
    public event DOMEventHandler OnDragover
    {
    	add => AddEventListener("dragover", value, false);
    	remove => RemoveEventListener("dragover", value, false);
    }
    public event DOMEventHandler OnDragstart
    {
    	add => AddEventListener("dragstart", value, false);
    	remove => RemoveEventListener("dragstart", value, false);
    }
    public event DOMEventHandler OnDrop
    {
    	add => AddEventListener("drop", value, false);
    	remove => RemoveEventListener("drop", value, false);
    }
    public event DOMEventHandler OnDurationchange
    {
    	add => AddEventListener("durationchange", value, false);
    	remove => RemoveEventListener("durationchange", value, false);
    }
    public event DOMEventHandler OnEmptied
    {
    	add => AddEventListener("emptied", value, false);
    	remove => RemoveEventListener("emptied", value, false);
    }
    public event DOMEventHandler OnEnded
    {
    	add => AddEventListener("ended", value, false);
    	remove => RemoveEventListener("ended", value, false);
    }
    public event DOMEventHandler OnFocus
    {
    	add => AddEventListener("focus", value, false);
    	remove => RemoveEventListener("focus", value, false);
    }
    public event DOMEventHandler OnHashchange
    {
    	add => AddEventListener("hashchange", value, false);
    	remove => RemoveEventListener("hashchange", value, false);
    }
    public event DOMEventHandler OnInput
    {
    	add => AddEventListener("input", value, false);
    	remove => RemoveEventListener("input", value, false);
    }
    public event DOMEventHandler OnInvalid
    {
    	add => AddEventListener("invalid", value, false);
    	remove => RemoveEventListener("invalid", value, false);
    }
    public event DOMEventHandler OnKeydown
    {
    	add => AddEventListener("keydown", value, false);
    	remove => RemoveEventListener("keydown", value, false);
    }
    public event DOMEventHandler OnKeypress
    {
    	add => AddEventListener("keypress", value, false);
    	remove => RemoveEventListener("keypress", value, false);
    }
    public event DOMEventHandler OnKeyup
    {
    	add => AddEventListener("keyup", value, false);
    	remove => RemoveEventListener("keyup", value, false);
    }
    public event DOMEventHandler OnLoad
    {
    	add => AddEventListener("load", value, false);
    	remove => RemoveEventListener("load", value, false);
    }
    public event DOMEventHandler OnLoadeddata
    {
    	add => AddEventListener("loadeddata", value, false);
    	remove => RemoveEventListener("loadeddata", value, false);
    }
    public event DOMEventHandler OnLoadedmetadata
    {
    	add => AddEventListener("loadedmetadata", value, false);
    	remove => RemoveEventListener("loadedmetadata", value, false);
    }
    public event DOMEventHandler OnLoadstart
    {
    	add => AddEventListener("loadstart", value, false);
    	remove => RemoveEventListener("loadstart", value, false);
    }
    public event DOMEventHandler OnMessage
    {
    	add => AddEventListener("message", value, false);
    	remove => RemoveEventListener("message", value, false);
    }
    public event DOMEventHandler OnMousedown
    {
    	add => AddEventListener("mousedown", value, false);
    	remove => RemoveEventListener("mousedown", value, false);
    }
    public event DOMEventHandler OnMouseenter
    {
    	add => AddEventListener("mouseenter", value, false);
    	remove => RemoveEventListener("mouseenter", value, false);
    }
    public event DOMEventHandler OnMouseleave
    {
    	add => AddEventListener("mouseleave", value, false);
    	remove => RemoveEventListener("mouseleave", value, false);
    }
    public event DOMEventHandler OnMousemove
    {
    	add => AddEventListener("mousemove", value, false);
    	remove => RemoveEventListener("mousemove", value, false);
    }
    public event DOMEventHandler OnMouseout
    {
    	add => AddEventListener("mouseout", value, false);
    	remove => RemoveEventListener("mouseout", value, false);
    }
    public event DOMEventHandler OnMouseover
    {
    	add => AddEventListener("mouseover", value, false);
    	remove => RemoveEventListener("mouseover", value, false);
    }
    public event DOMEventHandler OnMouseup
    {
    	add => AddEventListener("mouseup", value, false);
    	remove => RemoveEventListener("mouseup", value, false);
    }
    public event DOMEventHandler OnMousewheel
    {
    	add => AddEventListener("mousewheel", value, false);
    	remove => RemoveEventListener("mousewheel", value, false);
    }
    public event DOMEventHandler OnMsgesturechange
    {
    	add => AddEventListener("msgesturechange", value, false);
    	remove => RemoveEventListener("msgesturechange", value, false);
    }
    public event DOMEventHandler OnMsgesturedoubletap
    {
    	add => AddEventListener("msgesturedoubletap", value, false);
    	remove => RemoveEventListener("msgesturedoubletap", value, false);
    }
    public event DOMEventHandler OnMsgestureend
    {
    	add => AddEventListener("msgestureend", value, false);
    	remove => RemoveEventListener("msgestureend", value, false);
    }
    public event DOMEventHandler OnMsgesturehold
    {
    	add => AddEventListener("msgesturehold", value, false);
    	remove => RemoveEventListener("msgesturehold", value, false);
    }
    public event DOMEventHandler OnMsgesturestart
    {
    	add => AddEventListener("msgesturestart", value, false);
    	remove => RemoveEventListener("msgesturestart", value, false);
    }
    public event DOMEventHandler OnMsgesturetap
    {
    	add => AddEventListener("msgesturetap", value, false);
    	remove => RemoveEventListener("msgesturetap", value, false);
    }
    public event DOMEventHandler OnMsinertiastart
    {
    	add => AddEventListener("msinertiastart", value, false);
    	remove => RemoveEventListener("msinertiastart", value, false);
    }
    public event DOMEventHandler OnMspointercancel
    {
    	add => AddEventListener("mspointercancel", value, false);
    	remove => RemoveEventListener("mspointercancel", value, false);
    }
    public event DOMEventHandler OnMspointerdown
    {
    	add => AddEventListener("mspointerdown", value, false);
    	remove => RemoveEventListener("mspointerdown", value, false);
    }
    public event DOMEventHandler OnMspointerenter
    {
    	add => AddEventListener("mspointerenter", value, false);
    	remove => RemoveEventListener("mspointerenter", value, false);
    }
    public event DOMEventHandler OnMspointerleave
    {
    	add => AddEventListener("mspointerleave", value, false);
    	remove => RemoveEventListener("mspointerleave", value, false);
    }
    public event DOMEventHandler OnMspointermove
    {
    	add => AddEventListener("mspointermove", value, false);
    	remove => RemoveEventListener("mspointermove", value, false);
    }
    public event DOMEventHandler OnMspointerout
    {
    	add => AddEventListener("mspointerout", value, false);
    	remove => RemoveEventListener("mspointerout", value, false);
    }
    public event DOMEventHandler OnMspointerover
    {
    	add => AddEventListener("mspointerover", value, false);
    	remove => RemoveEventListener("mspointerover", value, false);
    }
    public event DOMEventHandler OnMspointerup
    {
    	add => AddEventListener("mspointerup", value, false);
    	remove => RemoveEventListener("mspointerup", value, false);
    }
    public event DOMEventHandler OnOffline
    {
    	add => AddEventListener("offline", value, false);
    	remove => RemoveEventListener("offline", value, false);
    }
    public event DOMEventHandler OnOnline
    {
    	add => AddEventListener("online", value, false);
    	remove => RemoveEventListener("online", value, false);
    }
    public event DOMEventHandler OnOrientationchange
    {
    	add => AddEventListener("orientationchange", value, false);
    	remove => RemoveEventListener("orientationchange", value, false);
    }
    public event DOMEventHandler OnPagehide
    {
    	add => AddEventListener("pagehide", value, false);
    	remove => RemoveEventListener("pagehide", value, false);
    }
    public event DOMEventHandler OnPageshow
    {
    	add => AddEventListener("pageshow", value, false);
    	remove => RemoveEventListener("pageshow", value, false);
    }
    public event DOMEventHandler OnPause
    {
    	add => AddEventListener("pause", value, false);
    	remove => RemoveEventListener("pause", value, false);
    }
    public event DOMEventHandler OnPlay
    {
    	add => AddEventListener("play", value, false);
    	remove => RemoveEventListener("play", value, false);
    }
    public event DOMEventHandler OnPlaying
    {
    	add => AddEventListener("playing", value, false);
    	remove => RemoveEventListener("playing", value, false);
    }
    public event DOMEventHandler OnPopstate
    {
    	add => AddEventListener("popstate", value, false);
    	remove => RemoveEventListener("popstate", value, false);
    }
    public event DOMEventHandler OnProgress
    {
    	add => AddEventListener("progress", value, false);
    	remove => RemoveEventListener("progress", value, false);
    }
    public event DOMEventHandler OnRatechange
    {
    	add => AddEventListener("ratechange", value, false);
    	remove => RemoveEventListener("ratechange", value, false);
    }
    public event DOMEventHandler OnReadystatechange
    {
    	add => AddEventListener("readystatechange", value, false);
    	remove => RemoveEventListener("readystatechange", value, false);
    }
    public event DOMEventHandler OnReset
    {
    	add => AddEventListener("reset", value, false);
    	remove => RemoveEventListener("reset", value, false);
    }
    public event DOMEventHandler OnResize
    {
    	add => AddEventListener("resize", value, false);
    	remove => RemoveEventListener("resize", value, false);
    }
    public event DOMEventHandler OnScroll
    {
    	add => AddEventListener("scroll", value, false);
    	remove => RemoveEventListener("scroll", value, false);
    }
    public event DOMEventHandler OnSeeked
    {
    	add => AddEventListener("seeked", value, false);
    	remove => RemoveEventListener("seeked", value, false);
    }
    public event DOMEventHandler OnSeeking
    {
    	add => AddEventListener("seeking", value, false);
    	remove => RemoveEventListener("seeking", value, false);
    }
    public event DOMEventHandler OnSelect
    {
    	add => AddEventListener("select", value, false);
    	remove => RemoveEventListener("select", value, false);
    }
    public event DOMEventHandler OnStalled
    {
    	add => AddEventListener("stalled", value, false);
    	remove => RemoveEventListener("stalled", value, false);
    }
    public event DOMEventHandler OnStorage
    {
    	add => AddEventListener("storage", value, false);
    	remove => RemoveEventListener("storage", value, false);
    }
    public event DOMEventHandler OnSubmit
    {
    	add => AddEventListener("submit", value, false);
    	remove => RemoveEventListener("submit", value, false);
    }
    public event DOMEventHandler OnSuspend
    {
    	add => AddEventListener("suspend", value, false);
    	remove => RemoveEventListener("suspend", value, false);
    }
    public event DOMEventHandler OnTimeupdate
    {
    	add => AddEventListener("timeupdate", value, false);
    	remove => RemoveEventListener("timeupdate", value, false);
    }
    public event DOMEventHandler OnUnload
    {
    	add => AddEventListener("unload", value, false);
    	remove => RemoveEventListener("unload", value, false);
    }
    public event DOMEventHandler OnVolumechange
    {
    	add => AddEventListener("volumechange", value, false);
    	remove => RemoveEventListener("volumechange", value, false);
    }
    public event DOMEventHandler OnWaiting
    {
    	add => AddEventListener("waiting", value, false);
    	remove => RemoveEventListener("waiting", value, false);
    }
    public event DOMEventHandler OnPointercancel
    {
    	add => AddEventListener("pointercancel", value, false);
    	remove => RemoveEventListener("pointercancel", value, false);
    }
    public event DOMEventHandler OnPointerdown
    {
    	add => AddEventListener("pointerdown", value, false);
    	remove => RemoveEventListener("pointerdown", value, false);
    }
    public event DOMEventHandler OnPointerenter
    {
    	add => AddEventListener("pointerenter", value, false);
    	remove => RemoveEventListener("pointerenter", value, false);
    }
    public event DOMEventHandler OnPointerleave
    {
    	add => AddEventListener("pointerleave", value, false);
    	remove => RemoveEventListener("pointerleave", value, false);
    }
    public event DOMEventHandler OnPointermove
    {
    	add => AddEventListener("pointermove", value, false);
    	remove => RemoveEventListener("pointermove", value, false);
    }
    public event DOMEventHandler OnPointerout
    {
    	add => AddEventListener("pointerout", value, false);
    	remove => RemoveEventListener("pointerout", value, false);
    }
    public event DOMEventHandler OnPointerover
    {
    	add => AddEventListener("pointerover", value, false);
    	remove => RemoveEventListener("pointerover", value, false);
    }
    public event DOMEventHandler OnPointerup
    {
    	add => AddEventListener("pointerup", value, false);
    	remove => RemoveEventListener("pointerup", value, false);
    }
    public event DOMEventHandler OnWheel
    {
    	add => AddEventListener("wheel", value, false);
    	remove => RemoveEventListener("wheel", value, false);
    }
    [Export("addEventListener")]
    public void AddEventListener(string type, DOMEventHandler listener, object options)
    {
    	InvokeMethod<object>("addEventListener", type, listener, options);
    }
    [Export("dispatchEvent")]
    public bool DispatchEvent(Event evt)
    {
    	return InvokeMethod<bool>("dispatchEvent", evt);
    }
    [Export("removeEventListener")]
    public void RemoveEventListener(string type, DOMEventHandler listener, object options)
    {
    	InvokeMethod<object>("removeEventListener", type, listener, options);
    }
}
