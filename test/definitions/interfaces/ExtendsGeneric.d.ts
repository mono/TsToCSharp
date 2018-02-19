
interface HTMLOptionsCollection extends HTMLCollectionOf<HTMLOptionElement> {
    length: number;
    selectedIndex: number;
    add(element: HTMLOptionElement | HTMLOptGroupElement, before?: HTMLElement | number): void;
    remove(index: number): void;
}

interface HTMLCollectionOf<T extends Element> extends HTMLCollection {
    item(index: number): T;
    namedItem(name: string): T;
    [index: number]: T;
}

interface HTMLElement extends Element {
    accessKey: string;
    readonly children: HTMLCollection;
    contentEditable: string;
    readonly dataset: DOMStringMap;
    dir: string;
    draggable: boolean;
    hidden: boolean;
    hideFocus: boolean;
    innerText: string;
    readonly isContentEditable: boolean;
    lang: string;
    readonly offsetHeight: number;
    readonly offsetLeft: number;
    readonly offsetParent: Element;
    readonly offsetTop: number;
    readonly offsetWidth: number;
    outerText: string;
    spellcheck: boolean;
    readonly style: CSSStyleDeclaration;
    tabIndex: number;
    title: string;
    blur(): void;
    click(): void;
    dragDrop(): boolean;
    focus(): void;
    msGetInputContext(): MSInputMethodContext;
}

interface HTMLOptionElement extends HTMLElement {
    /**
     * Sets or retrieves the status of an option.
     */
    defaultSelected: boolean;
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the ordinal position of an option in a list box.
     */
    readonly index: number;
    /**
     * Sets or retrieves a value that you can use to implement your own label functionality for the object.
     */
    label: string;
    /**
     * Sets or retrieves whether the option in the list box is the default item.
     */
    selected: boolean;
    /**
     * Sets or retrieves the text string specified by the option tag.
     */
    text: string;
    /**
     * Sets or retrieves the value which is returned to the server when the form control is submitted.
     */
    value: string;
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
