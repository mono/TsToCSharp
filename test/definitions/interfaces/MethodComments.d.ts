interface HTMLFormElement extends HTMLElement {
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean; // Returns bool
    /**
     * Retrieves a form object or an object from an elements collection.
     */
    item(name?: any, index?: any): any; // Returns the any value
}
