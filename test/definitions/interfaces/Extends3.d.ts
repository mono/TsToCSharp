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

interface EventTarget {
    dispatchEvent(evt: Event): boolean;
}

interface Node extends EventTarget {
    readonly nodeName: string;
    readonly nodeType: number;
}

interface GlobalEventHandlers {
}

interface ElementTraversal {
    readonly childElementCount: number;
}

interface NodeSelector {
}

interface ChildNode {
    remove(): void;
}

interface HTMLCollectionBase {
    /**
     * Sets or retrieves the number of objects in a collection.
     */
    readonly length: number;
    /**
     * Retrieves an object from various collections.
     */
    item(index: number): Element;
    [index: number]: Element;
}

interface HTMLCollection extends HTMLCollectionBase {
    /**
     * Retrieves a select object or an object from an options collection.
     */
    namedItem(name: string): Element | null;
}

interface ParentNode {
    readonly children: HTMLCollection;
    readonly childElementCount: number;
}

interface DOMTokenList {
    readonly length: number;
    contains(token: string): boolean;
    item(index: number): string;
    toggle(token: string, force?: boolean): boolean;
    toString(): string;
    [index: number]: string;
}

interface Element extends Node, GlobalEventHandlers, ElementTraversal, NodeSelector, ChildNode, ParentNode {
    readonly classList: DOMTokenList;
    className: string;
    readonly clientHeight: number;
    readonly clientLeft: number;
    readonly clientTop: number;
    readonly clientWidth: number;
    id: string;
    innerHTML: string;
    msContentZoomFactor: number;
    readonly msRegionOverflow: string;
}
