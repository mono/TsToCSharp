using System;
using System.ComponentModel.Composition;
using Mono.WebAssembly;

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
public sealed class Url {
    
    public URL (string url, object base) { }
    [Export("hash")]
    public string Hash { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("host")]
    public string Host { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("hostname")]
    public string Hostname { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("href")]
    public string Href { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("origin")]
    public string Origin => throw new NotImplementedException();
    [Export("password")]
    public string Password { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("pathname")]
    public string Pathname { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("port")]
    public string Port { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("protocol")]
    public string Protocol { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("search")]
    public string Search { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("username")]
    public string Username { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("searchParams")]
    public IURLSearchParams SearchParams => throw new NotImplementedException();
    [Export("createObjectURL")]
    public string CreateObjectUrl(Object object, ObjectURLOptions options)
    {
    	throw new NotImplementedException();
    }
    [Export("revokeObjectURL")]
    public void RevokeObjectUrl(string url)
    {
    	throw new NotImplementedException();
    }
    [Export("toString")]
    public string ToString()
    {
    	throw new NotImplementedException();
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
public sealed class UrlSearchParams {
    
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
    	throw new NotImplementedException();
    }
    /**
     * Deletes the given search parameter, and its associated value, from the list of all search parameters.
     */
    [Export("delete")]
    public void Delete(string name)
    {
    	throw new NotImplementedException();
    }
    /**
     * Returns the first value associated to the given search parameter.
     */
    [Export("get")]
    public string Get(string name)
    {
    	throw new NotImplementedException();
    }
    /**
     * Returns all the values association with a given search parameter.
     */
    [Export("getAll")]
    public string[] GetAll(string name)
    {
    	throw new NotImplementedException();
    }
    /**
     * Returns a Boolean indicating if such a search parameter exists.
     */
    [Export("has")]
    public bool Has(string name)
    {
    	throw new NotImplementedException();
    }
    /**
     * Sets the value associated to a given search parameter to the given value. If there were several values, delete the others.
     */
    [Export("set")]
    public void Set(string name, string value)
    {
    	throw new NotImplementedException();
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
public sealed class Blob {
    
    public Blob (Object[] blobParts, IBlobPropertyBag options) { }
    [Export("size")]
    public double Size => throw new NotImplementedException();
    [Export("type")]
    public string Type => throw new NotImplementedException();
    [Export("msClose")]
    public void MsClose()
    {
    	throw new NotImplementedException();
    }
    [Export("msDetachStream")]
    public Object MsDetachStream()
    {
    	throw new NotImplementedException();
    }
    [Export("slice")]
    public IBlob Slice(double start, double end, string contentType)
    {
    	throw new NotImplementedException();
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
public sealed class Window {
    
    public Window () { }
    [Export("IURL")]
    public   IURL Url { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("IURLSearchParams")]
    public   IURLSearchParams UrlSearchParams { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    [Export("IBlob")]
    public   IBlob IBlob { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
}

}