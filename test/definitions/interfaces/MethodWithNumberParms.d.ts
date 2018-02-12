interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent, ParentNode, DocumentOrShadowRoot {
    caretRangeFromPoint(x: number, y: number): Range;
}
