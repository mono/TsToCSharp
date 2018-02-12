interface HTMLFormElement :  HTMLElement {
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    [Export("checkValidity")]
    bool checkValidity(); // Returns bool
    /**
     * Retrieves a form object or an object from an elements collection.
     */
    [Export("item")]
    Object item(Object name, Object index); // Returns the any value
}
