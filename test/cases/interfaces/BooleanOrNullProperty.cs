[Export(RTCIceParameters)]
interface RTCIceParameters {
    bool? iceLite { get; set; }
    string password { get; set; }
    string usernameFragment { get; set; }
}
