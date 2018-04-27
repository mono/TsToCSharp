namespace Hello.World 
{

public interface IURL {
    [Export("hash")]
    string Hash { get; set; }
    [Export("host")]
    string Host { get; set; }
    [Export("hostname")]
    string Hostname { get; set; }
    [Export("href")]
    string Href { get; set; }
    [Export("origin")]
    string Origin { get; }
    [Export("password")]
    string Password { get; set; }
    [Export("pathname")]
    string Pathname { get; set; }
    [Export("port")]
    string Port { get; set; }
    [Export("protocol")]
    string Protocol { get; set; }
    [Export("search")]
    string Search { get; set; }
    [Export("username")]
    string Username { get; set; }
    [Export("searchParams")]
    IURLSearchParams SearchParams { get; }
    [Export("toString")]
    string ToString();
}

[Export("URL", typeof(Mono.WebAssembly.JSObject))]
public sealed class Url : JSObject {
    internal URL  (int handle) : base (handle) {}

    public URL (string url, object base) { }
    [Export("hash")]
    public string Hash { get => GetProperty<string>("hash"); set => SetProperty<string>("hash", value); }
    [Export("host")]
    public string Host { get => GetProperty<string>("host"); set => SetProperty<string>("host", value); }
    [Export("hostname")]
    public string Hostname { get => GetProperty<string>("hostname"); set => SetProperty<string>("hostname", value); }
    [Export("href")]
    public string Href { get => GetProperty<string>("href"); set => SetProperty<string>("href", value); }
    [Export("origin")]
    public string Origin => GetProperty<string>("origin");
    [Export("password")]
    public string Password { get => GetProperty<string>("password"); set => SetProperty<string>("password", value); }
    [Export("pathname")]
    public string Pathname { get => GetProperty<string>("pathname"); set => SetProperty<string>("pathname", value); }
    [Export("port")]
    public string Port { get => GetProperty<string>("port"); set => SetProperty<string>("port", value); }
    [Export("protocol")]
    public string Protocol { get => GetProperty<string>("protocol"); set => SetProperty<string>("protocol", value); }
    [Export("search")]
    public string Search { get => GetProperty<string>("search"); set => SetProperty<string>("search", value); }
    [Export("username")]
    public string Username { get => GetProperty<string>("username"); set => SetProperty<string>("username", value); }
    [Export("searchParams")]
    public IURLSearchParams SearchParams => GetProperty<URLSearchParams>("searchParams");
    [Export("createObjectURL")]
    public string CreateObjectUrl(Object object, ObjectURLOptions options)
    {
    	return InvokeMethod<string>("createObjectURL", object, options);
    }
    [Export("revokeObjectURL")]
    public void RevokeObjectUrl(string url)
    {
    	InvokeMethod<object>("revokeObjectURL", url);
    }
    [Export("toString")]
    public string ToString()
    {
    	return InvokeMethod<string>("toString");
    }
}

public interface IURLSearchParams {
    /**
     * Appends a specified key/value pair as a new search parameter.
     */
    [Export("append")]
    void Append(string name, string value);
    /**
     * Deletes the given search parameter, and its associated value, from the list of all search parameters.
     */
    [Export("delete")]
    void Delete(string name);
    /**
     * Returns the first value associated to the given search parameter.
     */
    [Export("get")]
    string Get(string name);
    /**
     * Returns all the values association with a given search parameter.
     */
    [Export("getAll")]
    string[] GetAll(string name);
    /**
     * Returns a Boolean indicating if such a search parameter exists.
     */
    [Export("has")]
    bool Has(string name);
    /**
     * Sets the value associated to a given search parameter to the given value. If there were several values, delete the others.
     */
    [Export("set")]
    void Set(string name, string value);
}

[Export("URLSearchParams", typeof(Mono.WebAssembly.JSObject))]
public sealed class UrlSearchParams : JSObject {
    internal URLSearchParams  (int handle) : base (handle) {}

    /**
     * Constructor returning a URLSearchParams object.
     */
    public URLSearchParams (object init) { }
    /**
     * Appends a specified key/value pair as a new search parameter.
     */
    [Export("append")]
    public void Append(string name, string value)
    {
    	InvokeMethod<object>("append", name, value);
    }
    /**
     * Deletes the given search parameter, and its associated value, from the list of all search parameters.
     */
    [Export("delete")]
    public void Delete(string name)
    {
    	InvokeMethod<object>("delete", name);
    }
    /**
     * Returns the first value associated to the given search parameter.
     */
    [Export("get")]
    public string Get(string name)
    {
    	return InvokeMethod</**
     * Returns the first value associated to the given search parameter.
     */
    string>("get", name);
    }
    /**
     * Returns all the values association with a given search parameter.
     */
    [Export("getAll")]
    public string[] GetAll(string name)
    {
    	return InvokeMethod<string[]>("getAll", name);
    }
    /**
     * Returns a Boolean indicating if such a search parameter exists.
     */
    [Export("has")]
    public bool Has(string name)
    {
    	return InvokeMethod<bool>("has", name);
    }
    /**
     * Sets the value associated to a given search parameter to the given value. If there were several values, delete the others.
     */
    [Export("set")]
    public void Set(string name, string value)
    {
    	InvokeMethod<object>("set", name, value);
    }
}

public interface IBlob {
    [Export("size")]
    double Size { get; }
    [Export("type")]
    string Type { get; }
    [Export("msClose")]
    void MsClose();
    [Export("msDetachStream")]
    Object MsDetachStream();
    [Export("slice")]
    IBlob Slice(double start, double end, string contentType);
}

[Export("Blob", typeof(Mono.WebAssembly.JSObject))]
public sealed class Blob : JSObject {
    internal Blob  (int handle) : base (handle) {}

    public Blob (Object[] blobParts, IBlobPropertyBag options) { }
    [Export("size")]
    public double Size => GetProperty<double>("size");
    [Export("type")]
    public string Type => GetProperty<string>("type");
    [Export("msClose")]
    public void MsClose()
    {
    	InvokeMethod<object>("msClose");
    }
    [Export("msDetachStream")]
    public Object MsDetachStream()
    {
    	return InvokeMethod<Object>("msDetachStream");
    }
    [Export("slice")]
    public IBlob Slice(double start, double end, string contentType)
    {
    	return InvokeMethod<Blob>("slice", start, end, contentType);
    }
}

public interface IBlobPropertyBag {
    [Export("type")]
    string Type { get; set; }
    [Export("endings")]
    string Endings { get; set; }
}

public interface IWindow
{
    [Export("IURL")]
      IURL Url { get; set; }
    [Export("IURLSearchParams")]
      IURLSearchParams UrlSearchParams { get; set; }
    [Export("IBlob")]
      IBlob IBlob { get; set; }
}

[Export("Window", typeof(Mono.WebAssembly.JSObject))]
public sealed class Window : JSObject {
    internal Window  (int handle) : base (handle) {}

    public Window () { }
    [Export("IURL")]
    public   IURL Url { get => GetProperty<  URL>("URL"); set => SetProperty<  URL>("URL", value); }
    [Export("IURLSearchParams")]
    public   IURLSearchParams UrlSearchParams { get => GetProperty<  URLSearchParams>("URLSearchParams"); set => SetProperty<  URLSearchParams>("URLSearchParams", value); }
    [Export("IBlob")]
    public   IBlob IBlob { get => GetProperty<  Blob>("Blob"); set => SetProperty<  Blob>("Blob", value); }
}

}