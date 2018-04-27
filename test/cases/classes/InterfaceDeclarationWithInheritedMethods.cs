public interface IAudioListener {
    [Export("setOrientation")]
    void SetOrientation(double x, double y, double z, double xUp, double yUp, double zUp);
    [Export("setPosition")]
    void SetPosition(double x, double y, double z);
    [Export("setVelocity")]
    void SetVelocity(double x, double y, double z);
}

[Export("AudioListener", typeof(Mono.WebAssembly.JSObject))]
public sealed class AudioListener : JSObject
{
    internal AudioListener  (int handle) : base (handle) {}

    public AudioListener () { }
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
