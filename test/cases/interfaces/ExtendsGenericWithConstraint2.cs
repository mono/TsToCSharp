
interface HTMLCollectionBase {
    /**
     * Sets or retrieves the number of objects in a collection.
     */
    [Export("length")]
    double length { get; }
    /**
     * Retrieves an object from various collections.
     */
    [Export("item")]
    Element item(double index);
    Element this[double index] { get; set; }
}

interface HTMLCollection :  HTMLCollectionBase {
    /**
     * Retrieves a select object or an object from an options collection.
     */
    [Export("namedItem")]
    Element namedItem(string name);
}

interface GlobalEventHandlers {
}

interface EventTarget {
}

interface Node :  EventTarget {
}

interface Element :  Node,  GlobalEventHandlers,  ElementTraversal,  NodeSelector,  ChildNode,  ParentNode {
}

interface ElementTraversal {
}

interface NodeSelector {
}

interface ChildNode {
}

interface ParentNode {
}

interface HTMLCollectionOf<T> :  HTMLCollection where T : Element {
    [Export("item")]
    T item(double index);
    [Export("namedItem")]
    T namedItem(string name);
    T this[double index] { get; set; }
}
