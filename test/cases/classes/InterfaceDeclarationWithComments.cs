    public interface IAudioListener {
    }   // Trailing comment of interface defintion.

    // This is a leading comment
    [Export("AudioListener", typeof(Mono.WebAssembly.JSObject))]
    public sealed class AudioListener
    { // Here is another comment

         // Trailing of prototype
        /**
         * Creates a new AudioListener
         */
        public AudioListener () { } // Trailing of constructor
    }          // Trailing comments
