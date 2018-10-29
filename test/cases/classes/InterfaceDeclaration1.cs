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

[Export("AudioListener", typeof(JSObject))]
public sealed class AudioListener : JSObject
{
    internal AudioListener  (int handle) : base (handle) {}

    public AudioListener () { }
    [Export("dopplerFactor")]
    public double DopplerFactor { get => GetProperty<double>("dopplerFactor"); set => SetProperty<double>("dopplerFactor", value); }
    [Export("speedOfSound")]
    public double SpeedOfSound { get => GetProperty<double>("speedOfSound"); set => SetProperty<double>("speedOfSound", value); }
    [Export("setOrientation")]
    public void SetOrientation(double x, double y, double z, double xUp, double yUp, double zUp)
    {
    	InvokeMethod<object>("setOrientation", x, y, z, xUp, yUp, zUp);
    }
    [Export("setPosition")]
    public void SetPosition(double x, double y, double z)
    {
    	InvokeMethod<object>("setPosition", x, y, z);
    }
    [Export("setVelocity")]
    public void SetVelocity(double x, double y, double z)
    {
    	InvokeMethod<object>("setVelocity", x, y, z);
    }
}
