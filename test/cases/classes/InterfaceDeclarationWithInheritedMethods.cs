public interface IAudioListener {
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
    
    public AudioListener () { }
    [Export("setOrientation")]
    public void SetOrientation(double x, double y, double z, double xUp, double yUp, double zUp)
    {
    	throw new NotImplementedException();
    }
    [Export("setPosition")]
    public void SetPosition(double x, double y, double z)
    {
    	throw new NotImplementedException();
    }
    [Export("setVelocity")]
    public void SetVelocity(double x, double y, double z)
    {
    	throw new NotImplementedException();
    }
}
