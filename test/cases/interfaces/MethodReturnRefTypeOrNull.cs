interface DataTransferItemList {
    [Export("length")]
    double length { get; }
    [Export("add")]
    DataTransferItem add(File data);
    [Export("clear")]
    void clear();
    [Export("item")]
    DataTransferItem item(double index);
    [Export("remove")]
    void remove(double index);
    DataTransferItem this[double index] { get; set; }
}
