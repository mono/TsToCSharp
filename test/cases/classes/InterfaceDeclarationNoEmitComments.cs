    public interface IAudioListener {
    }
    [Export("AudioListener", typeof(Mono.WebAssembly.JSObject))]
    public sealed class AudioListener : JSObject
    {

        internal AudioListener  (int handle) : base (handle) {}

        public AudioListener () { }
    }
