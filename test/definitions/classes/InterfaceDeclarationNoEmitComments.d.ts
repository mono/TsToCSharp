    interface AudioListener {
    }   // Trailing comment of interface defintion.

    // This is a leading comment
    declare var AudioListener:
    { // Here is another comment

        /**
         * We will extend the AudioListener interface defined above.
         */

        prototype: AudioListener; // Trailing of prototype
        /**
         * Creates a new AudioListener
         */
        new(): AudioListener; // Trailing of constructor
    };          // Trailing comments
