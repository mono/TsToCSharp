
import * as yargs from "yargs";
import {GenOptionsInterface, GenOptions} from "./GenerateOptions";

export function ParseCommandLine() : GenOptionsInterface
{
    const argv = yargs.usage("Usage: TsToCSharp [options] file1.d.ts file2.d.ts")
    .demandCommand(1)   
    .example("TsToCSharp file1.d.ts", "Emit strongly typed C# definition from TypeScript definition file(s)")
    .example("TsToCSharp -o ./ file1.d.ts", "Emit strongly typed C# definition from TypeScript definition file(s)")
    .help("h")
    .alias("h", "help")
    .describe("noEmitExports", "Do not emit any Export attributes.")
    .describe("noEmitMethodExport", "Do not emit Export attribute for methods.")
    .describe("noEmitPropertyExport", "Do not emit Export attribute for properties.")
    .describe("noPrefixInterface", "Do not prefix interface names.")
    .alias("o", "outDir")
    .describe("o", "Output directory for generated C# files.")
    .describe("interfacePrefix", "Prefix interfaces with the string provided. Default is \"I\"")
    .describe("removeComments", "Do not emit comments contained in the definition file(s).")
    .argv;

    //console.log('Yargs', argv);

    let options = new GenOptions();

    options.fileList = argv._;

    if (argv.outDir)
        options.outDir = argv.outDir;

    if (argv.removeComments)
        options.emitComments = false;

    // overall Export Attribute emit control
    if (argv.noEmitExports)
    {
        options.emitExports = false;
        options.emitMethodExport = false;
        options.emitPropertyExport = false;
    }
    else 
    {
        if (argv.noEmitMethodExport)
        {
            options.emitMethodExport = false;
        }
        if (argv.noEmitPropertyExport)
        {
            options.emitPropertyExport = false;
        }
    
    }

    if (argv.noPrefixInterface)
    {
        options.isPrefixInterface = false;
    }

    if (argv.interfacePrefix)
    {
        options.interfacePrefix = argv.interfacePrefix;
    }

    return options;
}