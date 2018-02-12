
[Export(DeviceAcceleration)]
interface DeviceAcceleration {
    [Export(x)]
    double? x { get; }
    [Export(y)]
    double? y { get; }
    [Export(z)]
    double? z { get; }
}

[Export(DeviceRotationRate)]
interface DeviceRotationRate {
    [Export(alpha)]
    double? alpha { get; }
    [Export(beta)]
    double? beta { get; }
    [Export(gamma)]
    double? gamma { get; }
}

[Export(DeviceMotionEvent)]
interface DeviceMotionEvent :  Event {
    [Export(acceleration)]
    DeviceAcceleration acceleration { get; }
    [Export(accelerationIncludingGravity)]
    DeviceAcceleration accelerationIncludingGravity { get; }
    [Export(interval)]
    double? interval { get; }
    [Export(rotationRate)]
    DeviceRotationRate rotationRate { get; }
}
