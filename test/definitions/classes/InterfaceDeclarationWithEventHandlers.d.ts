
interface GlobalEventHandlers {
    onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
    onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
    onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
    onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
    onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
    onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
    onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
    onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
    onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

interface EventTarget {
    addEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

declare var EventTarget: {
    prototype: EventTarget;
    new(): EventTarget;
};

interface Window extends EventTarget, GlobalEventHandlers {

    onabort: (this: Window, ev: UIEvent) => any;
    onafterprint: (this: Window, ev: Event) => any;
    onbeforeprint: (this: Window, ev: Event) => any;
    onbeforeunload: (this: Window, ev: BeforeUnloadEvent) => any;
    onblur: (this: Window, ev: FocusEvent) => any;
    oncanplay: (this: Window, ev: Event) => any;
    oncanplaythrough: (this: Window, ev: Event) => any;
    onchange: (this: Window, ev: Event) => any;
    onclick: (this: Window, ev: MouseEvent) => any;
    oncompassneedscalibration: (this: Window, ev: Event) => any;
    oncontextmenu: (this: Window, ev: PointerEvent) => any;
    ondblclick: (this: Window, ev: MouseEvent) => any;
    ondevicelight: (this: Window, ev: DeviceLightEvent) => any;
    ondevicemotion: (this: Window, ev: DeviceMotionEvent) => any;
    ondeviceorientation: (this: Window, ev: DeviceOrientationEvent) => any;
    ondrag: (this: Window, ev: DragEvent) => any;
    ondragend: (this: Window, ev: DragEvent) => any;
    ondragenter: (this: Window, ev: DragEvent) => any;
    ondragleave: (this: Window, ev: DragEvent) => any;
    ondragover: (this: Window, ev: DragEvent) => any;
    ondragstart: (this: Window, ev: DragEvent) => any;
    ondrop: (this: Window, ev: DragEvent) => any;
    ondurationchange: (this: Window, ev: Event) => any;
    onemptied: (this: Window, ev: Event) => any;
    onended: (this: Window, ev: MediaStreamErrorEvent) => any;
    onfocus: (this: Window, ev: FocusEvent) => any;
    onhashchange: (this: Window, ev: HashChangeEvent) => any;
    oninput: (this: Window, ev: Event) => any;
    oninvalid: (this: Window, ev: Event) => any;
    onkeydown: (this: Window, ev: KeyboardEvent) => any;
    onkeypress: (this: Window, ev: KeyboardEvent) => any;
    onkeyup: (this: Window, ev: KeyboardEvent) => any;
    onload: (this: Window, ev: Event) => any;
    onloadeddata: (this: Window, ev: Event) => any;
    onloadedmetadata: (this: Window, ev: Event) => any;
    onloadstart: (this: Window, ev: Event) => any;
    onmessage: (this: Window, ev: MessageEvent) => any;
    onmousedown: (this: Window, ev: MouseEvent) => any;
    onmouseenter: (this: Window, ev: MouseEvent) => any;
    onmouseleave: (this: Window, ev: MouseEvent) => any;
    onmousemove: (this: Window, ev: MouseEvent) => any;
    onmouseout: (this: Window, ev: MouseEvent) => any;
    onmouseover: (this: Window, ev: MouseEvent) => any;
    onmouseup: (this: Window, ev: MouseEvent) => any;
    onmousewheel: (this: Window, ev: WheelEvent) => any;
    onmsgesturechange: (this: Window, ev: MSGestureEvent) => any;
    onmsgesturedoubletap: (this: Window, ev: MSGestureEvent) => any;
    onmsgestureend: (this: Window, ev: MSGestureEvent) => any;
    onmsgesturehold: (this: Window, ev: MSGestureEvent) => any;
    onmsgesturestart: (this: Window, ev: MSGestureEvent) => any;
    onmsgesturetap: (this: Window, ev: MSGestureEvent) => any;
    onmsinertiastart: (this: Window, ev: MSGestureEvent) => any;
    onmspointercancel: (this: Window, ev: MSPointerEvent) => any;
    onmspointerdown: (this: Window, ev: MSPointerEvent) => any;
    onmspointerenter: (this: Window, ev: MSPointerEvent) => any;
    onmspointerleave: (this: Window, ev: MSPointerEvent) => any;
    onmspointermove: (this: Window, ev: MSPointerEvent) => any;
    onmspointerout: (this: Window, ev: MSPointerEvent) => any;
    onmspointerover: (this: Window, ev: MSPointerEvent) => any;
    onmspointerup: (this: Window, ev: MSPointerEvent) => any;
    onoffline: (this: Window, ev: Event) => any;
    ononline: (this: Window, ev: Event) => any;
    onorientationchange: (this: Window, ev: Event) => any;
    onpagehide: (this: Window, ev: PageTransitionEvent) => any;
    onpageshow: (this: Window, ev: PageTransitionEvent) => any;
    onpause: (this: Window, ev: Event) => any;
    onplay: (this: Window, ev: Event) => any;
    onplaying: (this: Window, ev: Event) => any;
    onpopstate: (this: Window, ev: PopStateEvent) => any;
    onprogress: (this: Window, ev: ProgressEvent) => any;
    onratechange: (this: Window, ev: Event) => any;
    onreadystatechange: (this: Window, ev: ProgressEvent) => any;
    onreset: (this: Window, ev: Event) => any;
    onresize: (this: Window, ev: UIEvent) => any;
    onscroll: (this: Window, ev: UIEvent) => any;
    onseeked: (this: Window, ev: Event) => any;
    onseeking: (this: Window, ev: Event) => any;
    onselect: (this: Window, ev: UIEvent) => any;
    onstalled: (this: Window, ev: Event) => any;
    onstorage: (this: Window, ev: StorageEvent) => any;
    onsubmit: (this: Window, ev: Event) => any;
    onsuspend: (this: Window, ev: Event) => any;
    ontimeupdate: (this: Window, ev: Event) => any;
    onunload: (this: Window, ev: Event) => any;
    onvolumechange: (this: Window, ev: Event) => any;
    onwaiting: (this: Window, ev: Event) => any;

}

declare var Window: {
    prototype: Window;
    new(): Window;
};
