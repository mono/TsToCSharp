interface Console {
    [Export("assert")]
    void assert(bool test, string message, params Object[] optionalParams);
    [Export("clear")]
    void clear();
    [Export("count")]
    void count(string countTitle);
    [Export("debug")]
    void debug(Object message, params Object[] optionalParams);
    [Export("dir")]
    void dir(Object value, params Object[] optionalParams);
    [Export("dirxml")]
    void dirxml(Object value);
    [Export("error")]
    void error(Object message, params Object[] optionalParams);
    [Export("exception")]
    void exception(string message, params Object[] optionalParams);
    [Export("group")]
    void group(string groupTitle, params Object[] optionalParams);
    [Export("groupCollapsed")]
    void groupCollapsed(string groupTitle, params Object[] optionalParams);
    [Export("groupEnd")]
    void groupEnd();
    [Export("info")]
    void info(Object message, params Object[] optionalParams);
    [Export("log")]
    void log(Object message, params Object[] optionalParams);
    [Export("msIsIndependentlyComposed")]
    bool msIsIndependentlyComposed(Element element);
    [Export("profile")]
    void profile(string reportName);
    [Export("profileEnd")]
    void profileEnd();
    [Export("select")]
    void select(Element element);
    [Export("table")]
    void table(params Object[] data);
    [Export("time")]
    void time(string timerName);
    [Export("timeEnd")]
    void timeEnd(string timerName);
    [Export("trace")]
    void trace(Object message, params Object[] optionalParams);
    [Export("warn")]
    void warn(Object message, params Object[] optionalParams);
}
