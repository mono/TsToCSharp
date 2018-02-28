public interface IPerformanceNavigation {
}

[Export("PerformanceNavigation", typeof(Mono.WebAssembly.JSObject))]
public sealed class PerformanceNavigation {
    
    public PerformanceNavigation () { };
    [Export("TYPE_BACK_FORWARD")]
    double TypeBackForward => throw new NotImplementedException();
    [Export("TYPE_NAVIGATE")]
    double TypeNavigate => throw new NotImplementedException();
    [Export("TYPE_RELOAD")]
    double TypeReload => throw new NotImplementedException();
    [Export("TYPE_RESERVED")]
    double TypeReserved => throw new NotImplementedException();
}
