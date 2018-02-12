interface Gamepad {
    [Export("axes")]
    double[] axes { get; }
    [Export("buttons")]
    GamepadButton[] buttons { get; }
    [Export("connected")]
    bool connected { get; }
    [Export("id")]
    string id { get; }
    [Export("index")]
    double index { get; }
    [Export("mapping")]
    string mapping { get; }
    [Export("timestamp")]
    double timestamp { get; }
}
