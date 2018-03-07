interface GlobalEventHandlers {
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
    void addEventListener(string type, DOMEventHandler listener, object options);
    [Export("removeEventListener")]
    void removeEventListener(string type, DOMEventHandler listener, object options);    
}
