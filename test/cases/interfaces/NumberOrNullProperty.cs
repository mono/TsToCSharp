[Export(Coordinates)]
interface Coordinates {
    double accuracy { get; }
    double? altitude { get; }
    double? altitudeAccuracy { get; }
    double? heading { get; }
    double latitude { get; }
    double longitude { get; }
    double? speed { get; }
}
