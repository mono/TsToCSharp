public interface IAudioListener {
    [Export("dopplerFactor")]
    double DopplerFactor { get; set; }
    [Export("speedOfSound")]
    double SpeedOfSound { get; set; }
    [Export("setOrientation")]
    void SetOrientation(double x, double y, double z, double xUp, double yUp, double zUp);
    [Export("setPosition")]
    void SetPosition(double x, double y, double z);
    [Export("setVelocity")]
    void SetVelocity(double x, double y, double z);
}

[Export("AudioListener", typeof(Mono.WebAssembly.JSObject))]
public sealed class AudioListener
{
    
    public AudioListener () { };
    [Export("dopplerFactor")]
    double DopplerFactor { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("speedOfSound")]
    double SpeedOfSound { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("setOrientation")]
    void SetOrientation(double x, double y, double z, double xUp, double yUp, double zUp)
    {
    	throw new NotImplementedException();
    }
    [Export("setPosition")]
    void SetPosition(double x, double y, double z)
    {
    	throw new NotImplementedException();
    }
    [Export("setVelocity")]
    void SetVelocity(double x, double y, double z)
    {
    	throw new NotImplementedException();
    }
}
