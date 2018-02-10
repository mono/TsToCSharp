interface NamedNodeMap {
    readonly length: number;
    getNamedItem(name: string): Attr;
    getNamedItemNS(namespaceURI: string | null, localName: string | null): Attr;
    item(index: number): Attr;
    removeNamedItem(name: string): Attr;
    removeNamedItemNS(namespaceURI: string | null, localName: string | null): Attr;
    setNamedItem(arg: Attr): Attr;
    setNamedItemNS(arg: Attr): Attr;
}
