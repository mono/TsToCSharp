interface Screen :  EventTarget {
    [Export("msLockOrientation")]
    bool msLockOrientation(string[] orientations);
}
