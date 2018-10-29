    public interface IAudioListener {
    }
    [Export("AudioListener", typeof(JSObject))]
    public sealed class AudioListener : JSObject
    {

        internal AudioListener  (int handle) : base (handle) {}

        public AudioListener () { }
    }
