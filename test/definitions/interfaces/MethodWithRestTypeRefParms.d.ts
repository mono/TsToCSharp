interface TouchList {
    readonly length: number;
    item(index: number): Touch | null;
    [index: number]: Touch;
}

interface Touch {
    readonly clientX: number;
    readonly clientY: number;
    readonly identifier: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly screenX: number;
    readonly screenY: number;
    readonly target: EventTarget;
}

interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent, ParentNode, DocumentOrShadowRoot {
    createTouchList(...touches: Touch[]): TouchList;
}
