
public interface IRTCSrtpSdesTransport {
}

[Export("RTCSrtpSdesTransport", typeof(Mono.WebAssembly.JSObject))]
public sealed class RtcSrtpSdesTransport {
    
    public RTCSrtpSdesTransport (RTCIceTransport transport, RTCSrtpSdesParameters encryptParameters, RTCSrtpSdesParameters decryptParameters) { }
    [Export("getLocalParameters")]
    RTCSrtpSdesParameters[] GetLocalParameters()
    {
    	throw new NotImplementedException();
    }
}
