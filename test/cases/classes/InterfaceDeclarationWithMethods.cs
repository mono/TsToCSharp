
public interface IRTCSrtpSdesTransport {
}

[Export("RTCSrtpSdesTransport", typeof(Mono.WebAssembly.JSObject))]
public sealed class RtcSrtpSdesTransport : JSObject {
    internal RTCSrtpSdesTransport  (int handle) : base (handle) {}

    public RTCSrtpSdesTransport (RTCIceTransport transport, RTCSrtpSdesParameters encryptParameters, RTCSrtpSdesParameters decryptParameters) { }
    [Export("getLocalParameters")]
    public RTCSrtpSdesParameters[] GetLocalParameters()
    {
    	return InvokeMethod<RTCSrtpSdesParameters[]>("getLocalParameters");
    }
}
