
interface DeviceAcceleration {
    double? x { get; }
    double? y { get; }
    double? z { get; }
}

interface DeviceRotationRate {
    double? alpha { get; }
    double? beta { get; }
    double? gamma { get; }
}

interface DeviceMotionEvent :  Event {
    DeviceAcceleration acceleration { get; }
    DeviceAcceleration accelerationIncludingGravity { get; }
    double? interval { get; }
    DeviceRotationRate rotationRate { get; }
}
