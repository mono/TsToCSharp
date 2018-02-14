interface Window :  EventTarget,  WindowTimers,  WindowSessionStorage,  WindowLocalStorage,  WindowConsole,  GlobalEventHandlers,  IDBEnvironment,  WindowBase64,  GlobalFetch {
    [Export("receiveMessage")]
    Object[] receiveMessage(Object message, string targetOrigin); // This is not a real definition
}
