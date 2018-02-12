[Export("Coordinates")]
interface Coordinates {
    [Export("accuracy")]
    double accuracy { get; }
    [Export("altitude")]
    double? altitude { get; }
    [Export("altitudeAccuracy")]
    double? altitudeAccuracy { get; }
    [Export("heading")]
    double? heading { get; }
    [Export("latitude")]
    double latitude { get; }
    [Export("longitude")]
    double longitude { get; }
    [Export("speed")]
    double? speed { get; }
}
