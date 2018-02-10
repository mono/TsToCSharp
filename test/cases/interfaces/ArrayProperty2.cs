interface Gamepad {
    double[] axes { get; }
    GamepadButton[] buttons { get; }
    bool connected { get; }
    string id { get; }
    double index { get; }
    string mapping { get; }
    double timestamp { get; }
}
