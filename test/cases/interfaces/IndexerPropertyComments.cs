[Export(ClientRectList)]
interface ClientRectList {
    // This is the length
    [Export(length)]
    double length { get; } /* returns a number */
    ClientRect item(double index); // Return the ClientRect at the specified index
    /**
     * Retrieves a ClientRect object ClientRectList.
     */
    ClientRect this[double index] { get; set; } // Return the ClientRect at the specified index

}
