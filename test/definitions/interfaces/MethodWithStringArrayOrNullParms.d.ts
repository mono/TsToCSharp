interface Screen extends EventTarget {
    msLockOrientation(orientations: string[] | null): boolean;
}
