interface WebAuthentication {
    makeCredential(accountInformation: Account, cryptoParameters: ScopedCredentialParameters[] | null, attestationChallenge: BufferSource, options?: ScopedCredentialOptions): ScopedCredentialInfo;
}
