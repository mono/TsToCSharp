interface Navigator extends Object, NavigatorID, NavigatorOnLine, NavigatorContentUtils, NavigatorStorageUtils, NavigatorGeolocation, MSNavigatorDoNotTrack, MSFileSaver, NavigatorBeacon, NavigatorConcurrentHardware, NavigatorUserMedia {
    readonly authentication: WebAuthentication;
    readonly cookieEnabled: boolean;
    gamepadInputEmulation: GamepadInputEmulationType;
    readonly language: string;
    readonly maxTouchPoints: number;
    readonly mimeTypes: MimeTypeArray;
    readonly msManipulationViewsEnabled: boolean;
    readonly msMaxTouchPoints: number;
    readonly msPointerEnabled: boolean;
    readonly plugins: PluginArray;
    readonly pointerEnabled: boolean;
    readonly serviceWorker: ServiceWorkerContainer;
    readonly webdriver: boolean;
    readonly doNotTrack: string | null;
    readonly hardwareConcurrency: number;
    readonly languages: string[];
    getGamepads(): Gamepad[];
    javaEnabled(): boolean;
    msLaunchUri(uri: string, successCallback?: MSLaunchUriCallback, noHandlerCallback?: MSLaunchUriCallback): void;
    vibrate(pattern: number | number[]): boolean;
}
