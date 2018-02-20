
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

interface GlobalEventHandlers {
}

interface EventTarget {
}

interface Node extends EventTarget {
}

interface Element extends Node, GlobalEventHandlers, ElementTraversal, NodeSelector, ChildNode, ParentNode {
}

interface ElementTraversal {
}

interface NodeSelector {
}

interface ChildNode {
}

interface ParentNode {
}

interface HTMLCollectionOf<T extends Element> extends HTMLCollection {
    item(index: number): T;
    namedItem(name: string): T;
    [index: number]: T;
}
