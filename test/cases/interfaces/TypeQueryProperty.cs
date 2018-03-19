
interface URL {
    [Export("hash")]
    string hash { get; set; }
    [Export("host")]
    string host { get; set; }
    [Export("hostname")]
    string hostname { get; set; }
    [Export("href")]
    string href { get; set; }
    [Export("origin")]
    string origin { get; }
    [Export("password")]
    string password { get; set; }
    [Export("pathname")]
    string pathname { get; set; }
    [Export("port")]
    string port { get; set; }
    [Export("protocol")]
    string protocol { get; set; }
    [Export("search")]
    string search { get; set; }
    [Export("username")]
    string username { get; set; }
    [Export("searchParams")]
    URLSearchParams searchParams { get; }
    [Export("toString")]
    string toString();
}

interface URLSearchParams {
    /**
     * Appends a specified key/value pair as a new search parameter.
     */
    [Export("append")]
    void append(string name, string value);
    /**
     * Deletes the given search parameter, and its associated value, from the list of all search parameters.
     */
    [Export("delete")]
    void delete(string name);
    /**
     * Returns the first value associated to the given search parameter.
     */
    [Export("get")]
    string get(string name);
    /**
     * Returns all the values association with a given search parameter.
     */
    [Export("getAll")]
    string[] getAll(string name);
    /**
     * Returns a Boolean indicating if such a search parameter exists.
     */
    [Export("has")]
    bool has(string name);
    /**
     * Sets the value associated to a given search parameter to the given value. If there were several values, delete the others.
     */
    [Export("set")]
    void set(string name, string value);
}

interface Blob {
    [Export("size")]
    double size { get; }
    [Export("type")]
    string type { get; }
    [Export("msClose")]
    void msClose();
    [Export("msDetachStream")]
    Object msDetachStream();
    [Export("slice")]
    Blob slice(double start, double end, string contentType);
}

interface BlobPropertyBag {
    [Export("type")]
    string type { get; set; }
    [Export("endings")]
    string endings { get; set; }
}

interface Window
{
    [Export("URL")]
      URL URL { get; set; }
    [Export("URLSearchParams")]
      URLSearchParams URLSearchParams { get; set; }
    [Export("Blob")]
      Blob Blob { get; set; }
}
