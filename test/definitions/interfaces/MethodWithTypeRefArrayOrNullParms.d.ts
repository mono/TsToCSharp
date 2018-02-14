interface WebAuthentication {
    makeCredential(accountInformation: Account, cryptoParameters: ScopedCredentialParameters[], attestationChallenge: BufferSource, options?: ScopedCredentialOptions): ScopedCredentialInfo;
}
