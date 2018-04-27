
public interface IErrorEventInit {
}

public interface IErrorEvent {
}

[Export("ErrorEvent", typeof(Mono.WebAssembly.JSObject))]
public sealed class ErrorEvent : JSObject {
    internal ErrorEvent  (int handle) : base (handle) {}

    public ErrorEvent (string type, IErrorEventInit errorEventInitDict) { }
}
