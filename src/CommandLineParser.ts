//import { parseCommandLine } from "typescript";
import * as yargs from "yargs";

export interface IGenOptions
{
    fileList: string[];
    outDir?: string;
}

class GenOptions implements IGenOptions {
    fileList: string[];
    outDir?: string;
    constructor() { }
}

export function ParseCommandLine() : IGenOptions
{
    const argv = yargs.usage("Usage: TsToCSharp [options] file1.d.ts file2.d.ts")
    .example("TsToCSharp file1.d.ts", "Emit strongly typed C# definition from TypeScript definition file(s)")
    .example("TsToCSharp -o ./ file1.d.ts", "Emit strongly typed C# definition from TypeScript definition file(s)")
    .alias('o', 'outDir')
    .describe('o', 'Output directory for generated C# files.')
    .demandCommand(1)   
    .help('h')
    .alias('h', 'help')
    .argv;

    //console.log('Yargs', argv);

    let options = new GenOptions();

    options.fileList = argv._;

    if (argv.outDir)
        options.outDir = argv.outDir;


    return options;
}