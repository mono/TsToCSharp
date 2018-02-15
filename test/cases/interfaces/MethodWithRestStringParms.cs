interface Document :  Node,  GlobalEventHandlers,  NodeSelector,  DocumentEvent,  ParentNode,  DocumentOrShadowRoot {
    /**
     * Writes one or more HTML expressions to a document in the specified window.
     * @param content Specifies the text and HTML tags to write.
     */
    [Export("write")]
    void write(params string[] content);
    /**
     * Writes one or more HTML expressions, followed by a carriage return, to a document in the specified window.
     * @param content The text and HTML tags to write.
     */
    [Export("writeln")]
    void writeln(params string[] content);
}
