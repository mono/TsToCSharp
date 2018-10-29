public interface IPerformanceNavigation {
}

[Export("PerformanceNavigation", typeof(JSObject))]
public sealed class PerformanceNavigation : JSObject {
    internal PerformanceNavigation  (int handle) : base (handle) {}

    public PerformanceNavigation () { }
    [Export("TYPE_BACK_FORWARD")]
    public double TypeBackForward => GetProperty<double>("TYPE_BACK_FORWARD");
    [Export("TYPE_NAVIGATE")]
    public double TypeNavigate => GetProperty<double>("TYPE_NAVIGATE");
    [Export("TYPE_RELOAD")]
    public double TypeReload => GetProperty<double>("TYPE_RELOAD");
    [Export("TYPE_RESERVED")]
    public double TypeReserved => GetProperty<double>("TYPE_RESERVED");
}
