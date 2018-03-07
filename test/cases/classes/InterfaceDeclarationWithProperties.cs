public interface IPerformanceNavigation {
}

[Export("PerformanceNavigation", typeof(Mono.WebAssembly.JSObject))]
public sealed class PerformanceNavigation {
    
    public PerformanceNavigation () { }
    [Export("TYPE_BACK_FORWARD")]
    public double TypeBackForward => throw new NotImplementedException();
    [Export("TYPE_NAVIGATE")]
    public double TypeNavigate => throw new NotImplementedException();
    [Export("TYPE_RELOAD")]
    public double TypeReload => throw new NotImplementedException();
    [Export("TYPE_RESERVED")]
    public double TypeReserved => throw new NotImplementedException();
}
