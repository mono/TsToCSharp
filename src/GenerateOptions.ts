export interface IGenOptions
{
    fileList: string[];
    outDir?: string;
    emitComments: boolean;
    emitExports: boolean;
    emitMethodExport: boolean;
    emitPropertyExport: boolean;
}

export class GenOptions implements IGenOptions {
    fileList: string[];
    outDir?: string;
    emitComments: boolean = true;
    emitExports: boolean = true;
    emitMethodExport: boolean = true;
    emitPropertyExport: boolean = true;
    constructor() { }
}