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

interface ParentNode {
    readonly children: HTMLCollection;
    readonly childElementCount: number;
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
