[Export(NamedNodeMap)]
interface NamedNodeMap {
    double length { get; }
    Attr getNamedItem(string name);
    Attr getNamedItemNS(string namespaceURI, string localName);
    Attr item(double index);
    Attr removeNamedItem(string name);
    Attr removeNamedItemNS(string namespaceURI, string localName);
    Attr setNamedItem(Attr arg);
    Attr setNamedItemNS(Attr arg);
}
