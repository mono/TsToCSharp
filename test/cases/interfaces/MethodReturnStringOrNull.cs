interface DOMStringList {
    [Export("length")]
    double length { get; }
    [Export("contains")]
    bool contains(string str);
    [Export("item")]
    string item(double index);
    string this[double index] { get; set; }
}
