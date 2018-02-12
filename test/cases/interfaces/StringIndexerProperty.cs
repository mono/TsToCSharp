interface HTMLFormElement :  HTMLElement {
    /**
     * Sets or retrieves a list of character encodings for input data that must be accepted by the server processing the form.
     */
    [Export("acceptCharset")]
    string acceptCharset { get; set; }
    /**
     * Sets or retrieves the URL to which the form content is sent for processing.
     */
    [Export("action")]
    string action { get; set; }
    /**
     * Specifies whether autocomplete is applied to an editable text field.
     */
    [Export("autocomplete")]
    string autocomplete { get; set; }
    /**
     * Retrieves a collection, in source order, of all controls in a given form.
     */
    [Export("elements")]
    HTMLFormControlsCollection elements { get; }
    /**
     * Sets or retrieves the MIME encoding for the form.
     */
    [Export("encoding")]
    string encoding { get; set; }
    /**
     * Sets or retrieves the encoding type for the form.
     */
    [Export("enctype")]
    string enctype { get; set; }
    /**
     * Sets or retrieves the number of objects in a collection.
     */
    [Export("length")]
    double length { get; }
    /**
     * Sets or retrieves how to send the form data to the server.
     */
    [Export("method")]
    string method { get; set; }
    /**
     * Sets or retrieves the name of the object.
     */
    [Export("name")]
    string name { get; set; }
    /**
     * Designates a form that is not validated when submitted.
     */
    [Export("noValidate")]
    bool noValidate { get; set; }
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    [Export("target")]
    string target { get; set; }
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    [Export("checkValidity")]
    bool checkValidity();
    /**
     * Retrieves a form object or an object from an elements collection.
     * @param name Variant of type Number or String that specifies the object or collection to retrieve. If this parameter is a Number, it is the zero-based index of the object. If this parameter is a string, all objects with matching name or id properties are retrieved, and a collection is returned if more than one match is made.
     * @param index Variant of type Number that specifies the zero-based index of the object to retrieve when a collection is returned.
     */
    [Export("item")]
    Object item(Object name, Object index);
    /**
     * Retrieves a form object or an object from an elements collection.
     */
    [Export("namedItem")]
    Object namedItem(string name);
    /**
     * Fires when the user resets a form.
     */
    [Export("reset")]
    void reset();
    /**
     * Fires when a FORM is about to be submitted.
     */
    [Export("submit")]
    void submit();
    [Export("reportValidity")]
    bool reportValidity();
    Object this[string name] { get; set; }
}
