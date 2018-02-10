interface ClientRectList {
    // This is the length
    readonly length: number; /* returns a number */
    item(index: number): ClientRect; // Return the ClientRect at the specified index
    /**
     * Retrieves a ClientRect object ClientRectList.
     */
    [index: number]: ClientRect; // Return the ClientRect at the specified index

}
