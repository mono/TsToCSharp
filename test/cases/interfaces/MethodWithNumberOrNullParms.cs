interface DeviceOrientationEvent :  Event {
    [Export("absolute")]
    bool absolute { get; }
    [Export("alpha")]
    double? alpha { get; }
    [Export("beta")]
    double? beta { get; }
    [Export("gamma")]
    double? gamma { get; }
    [Export("initDeviceOrientationEvent")]
    void initDeviceOrientationEvent(string type, bool bubbles, bool cancelable, double? alpha, double? beta, double? gamma, bool absolute);
}
