interface RTCIceParameters {
    [Export("iceLite")]
    bool? iceLite { get; set; }
    [Export("password")]
    string password { get; set; }
    [Export("usernameFragment")]
    string usernameFragment { get; set; }
}
