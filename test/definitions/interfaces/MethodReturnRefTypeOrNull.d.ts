interface DataTransferItemList {
    readonly length: number;
    add(data: File): DataTransferItem | null;
    clear(): void;
    item(index: number): DataTransferItem;
    remove(index: number): void;
    [index: number]: DataTransferItem;
}
