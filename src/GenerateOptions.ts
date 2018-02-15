export interface GenOptionsInterface
{
    fileList: string[];
    outDir?: string;
    emitComments: boolean;
    emitExports: boolean;
    emitMethodExport: boolean;
    emitPropertyExport: boolean;
    interfacePrefix: string;
    isPrefixInterface: boolean;
}

export class GenOptions implements GenOptionsInterface {
    fileList: string[];
    outDir?: string;
    emitComments: boolean = true;
    emitExports: boolean = true;
    emitMethodExport: boolean = true;
    emitPropertyExport: boolean = true;
    interfacePrefix: string = "I";
    isPrefixInterface: boolean = true;
    constructor() { }
}