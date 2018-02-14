interface Navigator :  Object,  NavigatorID,  NavigatorOnLine,  NavigatorContentUtils,  NavigatorStorageUtils,  NavigatorGeolocation,  MSNavigatorDoNotTrack,  MSFileSaver,  NavigatorBeacon,  NavigatorConcurrentHardware,  NavigatorUserMedia {
    [Export("authentication")]
    WebAuthentication authentication { get; }
    [Export("cookieEnabled")]
    bool cookieEnabled { get; }
    [Export("gamepadInputEmulation")]
    GamepadInputEmulationType gamepadInputEmulation { get; set; }
    [Export("language")]
    string language { get; }
    [Export("maxTouchPoints")]
    double maxTouchPoints { get; }
    [Export("mimeTypes")]
    MimeTypeArray mimeTypes { get; }
    [Export("msManipulationViewsEnabled")]
    bool msManipulationViewsEnabled { get; }
    [Export("msMaxTouchPoints")]
    double msMaxTouchPoints { get; }
    [Export("msPointerEnabled")]
    bool msPointerEnabled { get; }
    [Export("plugins")]
    PluginArray plugins { get; }
    [Export("pointerEnabled")]
    bool pointerEnabled { get; }
    [Export("serviceWorker")]
    ServiceWorkerContainer serviceWorker { get; }
    [Export("webdriver")]
    bool webdriver { get; }
    [Export("doNotTrack")]
    string doNotTrack { get; }
    [Export("hardwareConcurrency")]
    double hardwareConcurrency { get; }
    [Export("languages")]
    string[] languages { get; }
    [Export("getGamepads")]
    Gamepad[] getGamepads();
    [Export("javaEnabled")]
    bool javaEnabled();
    [Export("msLaunchUri")]
    void msLaunchUri(string uri, MSLaunchUriCallback successCallback, MSLaunchUriCallback noHandlerCallback);
    [Export("vibrate")]
    bool vibrate(object pattern);
}
