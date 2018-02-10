interface ServiceWorkerMessageEventInit :  EventInit {
    Object data { get; set; }
    string lastEventId { get; set; }
    string origin { get; set; }
    MessagePort[] ports { get; set; }
    object source { get; set; }
}
