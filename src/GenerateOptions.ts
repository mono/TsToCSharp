export interface GenOptionsInterface
{
    fileList: string[];
    outDir?: string;
    isCaseChange: boolean;
    isCaseChangeClasses: boolean;
    isCaseChangeInterfaces: boolean;
    isCaseChangeMethods: boolean;
    isCaseChangeParameters: boolean;    
    isCaseChangeProperties: boolean;    
    emitComments: boolean;
    emitExports: boolean;
    emitMethodExport: boolean;
    emitPropertyExport: boolean;
    interfacePrefix: string;
    isPrefixInterface: boolean;
    isEmitAllInterfaces: boolean;
    interfaceAccessModifier: string;
}

export class GenOptions implements GenOptionsInterface {
    fileList: string[];
    outDir?: string;
    isCaseChange: boolean = true;
    isCaseChangeClasses: boolean = true;
    isCaseChangeInterfaces: boolean = true;
    isCaseChangeMethods: boolean = true;
    isCaseChangeParameters: boolean = true;
    isCaseChangeProperties: boolean = true;
    emitComments: boolean = true;
    emitExports: boolean = true;
    emitMethodExport: boolean = true;
    emitPropertyExport: boolean = true;
    interfacePrefix: string = "I";
    isPrefixInterface: boolean = true;
    isEmitAllInterfaces: boolean = false;
    interfaceAccessModifier: string = "public";
    constructor() { }
}