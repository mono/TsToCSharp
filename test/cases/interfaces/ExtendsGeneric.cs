
interface HTMLOptionsCollection :  HTMLCollectionOf<HTMLOptionElement> {
    [Export("length")]
    double length { get; set; }
    [Export("selectedIndex")]
    double selectedIndex { get; set; }
    [Export("add")]
    void add(object element, object before);
    [Export("remove")]
    void remove(double index);
}

interface HTMLCollectionOf<T> :  HTMLCollection where T : Element {
    [Export("item")]
    T item(double index);
    [Export("namedItem")]
    T namedItem(string name);
    T this[double index] { get; set; }
}

interface HTMLElement :  Element {
    [Export("accessKey")]
    string accessKey { get; set; }
    [Export("children")]
    HTMLCollection children { get; }
    [Export("contentEditable")]
    string contentEditable { get; set; }
    [Export("dataset")]
    DOMStringMap dataset { get; }
    [Export("dir")]
    string dir { get; set; }
    [Export("draggable")]
    bool draggable { get; set; }
    [Export("hidden")]
    bool hidden { get; set; }
    [Export("hideFocus")]
    bool hideFocus { get; set; }
    [Export("innerText")]
    string innerText { get; set; }
    [Export("isContentEditable")]
    bool isContentEditable { get; }
    [Export("lang")]
    string lang { get; set; }
    [Export("offsetHeight")]
    double offsetHeight { get; }
    [Export("offsetLeft")]
    double offsetLeft { get; }
    [Export("offsetParent")]
    Element offsetParent { get; }
    [Export("offsetTop")]
    double offsetTop { get; }
    [Export("offsetWidth")]
    double offsetWidth { get; }
    [Export("outerText")]
    string outerText { get; set; }
    [Export("spellcheck")]
    bool spellcheck { get; set; }
    [Export("style")]
    CSSStyleDeclaration style { get; }
    [Export("tabIndex")]
    double tabIndex { get; set; }
    [Export("title")]
    string title { get; set; }
    [Export("blur")]
    void blur();
    [Export("click")]
    void click();
    [Export("dragDrop")]
    bool dragDrop();
    [Export("focus")]
    void focus();
    [Export("msGetInputContext")]
    MSInputMethodContext msGetInputContext();
}

interface HTMLOptionElement :  HTMLElement {
    /**
     * Sets or retrieves the status of an option.
     */
    [Export("defaultSelected")]
    bool defaultSelected { get; set; }
    [Export("disabled")]
    bool disabled { get; set; }
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    [Export("form")]
    HTMLFormElement form { get; }
    /**
     * Sets or retrieves the ordinal position of an option in a list box.
     */
    [Export("index")]
    double index { get; }
    /**
     * Sets or retrieves a value that you can use to implement your own label functionality for the object.
     */
    [Export("label")]
    string label { get; set; }
    /**
     * Sets or retrieves whether the option in the list box is the default item.
     */
    [Export("selected")]
    bool selected { get; set; }
    /**
     * Sets or retrieves the text string specified by the option tag.
     */
    [Export("text")]
    string text { get; set; }
    /**
     * Sets or retrieves the value which is returned to the server when the form control is submitted.
     */
    [Export("value")]
    string value { get; set; }
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
