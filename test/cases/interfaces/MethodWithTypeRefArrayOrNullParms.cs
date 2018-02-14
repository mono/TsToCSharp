interface WebAuthentication {
    [Export("makeCredential")]
    ScopedCredentialInfo makeCredential(Account accountInformation, ScopedCredentialParameters[] cryptoParameters, BufferSource attestationChallenge, ScopedCredentialOptions options);
}
