interface DOMStringList {
    readonly length: number;
    contains(str: string): boolean;
    item(index: number): string | null;
    [index: number]: string;
}
