interface ServiceWorkerMessageEventInit :  EventInit {
    [Export("data")]
    Object data { get; set; }
    [Export("lastEventId")]
    string lastEventId { get; set; }
    [Export("origin")]
    string origin { get; set; }
    [Export("ports")]
    MessagePort[] ports { get; set; }
    [Export("source")]
    object source { get; set; }
}
