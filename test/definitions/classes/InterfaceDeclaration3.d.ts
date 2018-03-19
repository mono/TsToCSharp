interface MouseEventInit extends EventModifierInit
{
    button?: number;
    buttons?: number;
    clientX?: number;
    clientY?: number;
    relatedTarget?: EventTarget | null;
    screenX?: number;
    screenY?: number;
}

interface PointerEventInit extends MouseEventInit
{
    height?: number;
    isPrimary?: boolean;
    pointerId?: number;
    pointerType?: string;
    pressure?: number;
    tiltX?: number;
    tiltY?: number;
    width?: number;
}

interface PointerEvent extends MouseEvent {
    readonly currentPoint: any;
    readonly height: number;
    readonly hwTimestamp: number;
    readonly intermediatePoints: any;
    readonly isPrimary: boolean;
    readonly pointerId: number;
    readonly pointerType: any;
    readonly pressure: number;
    readonly rotation: number;
    readonly tiltX: number;
    readonly tiltY: number;
    readonly width: number;
    getCurrentPoint(element: Element): void;
    getIntermediatePoints(element: Element): void;
    initPointerEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget, offsetXArg: number, offsetYArg: number, widthArg: number, heightArg: number, pressure: number, rotation: number, tiltX: number, tiltY: number, pointerIdArg: number, pointerType: any, hwTimestampArg: number, isPrimary: boolean): void;
}

declare var PointerEvent: {
    prototype: PointerEvent;
    new(typeArg: string, eventInitDict?: PointerEventInit): PointerEvent;
};

interface MouseEvent extends UIEvent {
    readonly altKey: boolean;
    readonly button: number;
    readonly buttons: number;
    readonly clientX: number;
    readonly clientY: number;
    readonly ctrlKey: boolean;
    readonly fromElement: Element;
    readonly layerX: number;
    readonly layerY: number;
    readonly metaKey: boolean;
    readonly movementX: number;
    readonly movementY: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly relatedTarget: EventTarget;
    readonly screenX: number;
    readonly screenY: number;
    readonly shiftKey: boolean;
    readonly toElement: Element;
    readonly which: number;
    readonly x: number;
    readonly y: number;
    getModifierState(keyArg: string): boolean;
    initMouseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget | null): void;
}

declare var MouseEvent: {
    prototype: MouseEvent;
    new(typeArg: string, eventInitDict?: MouseEventInit): MouseEvent;
};

interface UIEvent extends Event {
    readonly detail: number;
    readonly view: Window;
    initUIEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number): void;
}

declare var UIEvent: {
    prototype: UIEvent;
    new(typeArg: string, eventInitDict?: UIEventInit): UIEvent;
};

interface Event {
    readonly bubbles: boolean;
    readonly cancelable: boolean;
    cancelBubble: boolean;
    readonly currentTarget: EventTarget;
    readonly defaultPrevented: boolean;
    readonly eventPhase: number;
    readonly isTrusted: boolean;
    returnValue: boolean;
    readonly srcElement: Element | null;
    readonly target: EventTarget;
    readonly timeStamp: number;
    readonly type: string;
    readonly scoped: boolean;
    initEvent(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): void;
    preventDefault(): void;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
    deepPath(): EventTarget[];
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
}

declare var Event: {
    prototype: Event;
    new(typeArg: string, eventInitDict?: EventInit): Event;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
};
