export interface IGenOptions
{
    fileList: string[];
    outDir?: string;
    emitComments: boolean;
}

export class GenOptions implements IGenOptions {
    fileList: string[];
    outDir?: string;
    emitComments: boolean = true;
    constructor() { }
}