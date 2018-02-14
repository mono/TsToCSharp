interface ConfirmSiteSpecificExceptionsInformation :  ExceptionInformation {
    [Export("arrayOfDomainStrings")]
    string[] arrayOfDomainStrings { get; set; }
}
