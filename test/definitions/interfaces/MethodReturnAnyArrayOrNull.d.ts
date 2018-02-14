interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64, GlobalFetch {
    receiveMessage(message: any, targetOrigin: string): any[] | null; // This is not a real definition
}
