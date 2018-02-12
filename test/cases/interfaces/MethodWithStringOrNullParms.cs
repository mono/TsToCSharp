interface NamedNodeMap {
    [Export("length")]
    double length { get; }
    [Export("getNamedItem")]
    Attr getNamedItem(string name);
    [Export("getNamedItemNS")]
    Attr getNamedItemNS(string namespaceURI, string localName);
    [Export("item")]
    Attr item(double index);
    [Export("removeNamedItem")]
    Attr removeNamedItem(string name);
    [Export("removeNamedItemNS")]
    Attr removeNamedItemNS(string namespaceURI, string localName);
    [Export("setNamedItem")]
    Attr setNamedItem(Attr arg);
    [Export("setNamedItemNS")]
    Attr setNamedItemNS(Attr arg);
}
