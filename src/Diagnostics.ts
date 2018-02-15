export interface DiagnosticsInterface
{
    identifiedInterfaces: number;
}

export class Diagnostics implements DiagnosticsInterface {
    identifiedInterfaces: number = 0;
    constructor() { }
}