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
