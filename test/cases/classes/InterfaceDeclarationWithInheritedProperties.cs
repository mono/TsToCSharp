public interface IAudioListener {
    [Export("dopplerFactor")]
    double DopplerFactor { get; set; }
    [Export("speedOfSound")]
    double SpeedOfSound { get; set; }
}

[Export("AudioListener", typeof(Mono.WebAssembly.JSObject))]
public sealed class AudioListener
{
    
    public AudioListener () { }
    [Export("dopplerFactor")]
    double DopplerFactor { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("speedOfSound")]
    double SpeedOfSound { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
}
