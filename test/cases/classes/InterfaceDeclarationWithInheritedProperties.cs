public interface IAudioListener {
    [Export("dopplerFactor")]
    double DopplerFactor { get; set; }
    [Export("speedOfSound")]
    double SpeedOfSound { get; set; }
}

[Export("AudioListener", typeof(JSObject))]
public sealed class AudioListener : JSObject
{
    internal AudioListener  (int handle) : base (handle) {}

    public AudioListener () { }
    [Export("dopplerFactor")]
    public double DopplerFactor { get => GetProperty<double>("dopplerFactor"); set => SetProperty<double>("dopplerFactor", value); }
    [Export("speedOfSound")]
    public double SpeedOfSound { get => GetProperty<double>("speedOfSound"); set => SetProperty<double>("speedOfSound", value); }
}
