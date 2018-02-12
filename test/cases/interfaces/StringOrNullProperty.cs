[Export("Node")]
interface Node :  EventTarget {
    [Export("baseURIFoo")]
    string baseURIFoo { get; }
    [Export("baseURI")]
    string baseURI { get; }
}
