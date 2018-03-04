
public interface IErrorEventInit {
}

public interface IErrorEvent {
}

[Export("ErrorEvent", typeof(Mono.WebAssembly.JSObject))]
public sealed class ErrorEvent {
    
    public ErrorEvent (string type, IErrorEventInit errorEventInitDict) { }
}
