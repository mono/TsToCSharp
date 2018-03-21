
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
    .describe("combine", "Combine all specified definition files before processing.")
    .describe("defaultNameSpace", "Default name space to be emitted.")
    .describe("emitAllInterfaces", "Emit C# class implementations for all Interfaces and not just those declared.")
    .describe("emitUsings", "Emit default C# using statements.")
    .describe("interfacePrefix", "Prefix interfaces with the string provided. Default is \"I\"")
    .describe("interfaceAccessModifier", "Default interface access identifier. Default is \"public\"")
    .nargs("interfaceAccessModifier", 1)
    .choices("interfaceAccessModifier", ["public", "internal", "private", "none"])
    .describe("noCaseChange", "Do not change case.")
    .describe("noCaseChangeClasses", "Do not change case of Class Declarations.")
    .describe("noCaseChangeIntefaces", "Do not change case of Interface Declarations.")
    .describe("noCaseChangeMethods", "Do not change case of Method Declarations.")
    .describe("noCaseChangeParameters", "Do not change case of Parameter Declarations.")
    .describe("noCaseChangeProperties", "Do not change case of Method Declarations.")
    .describe("noEmitExports", "Do not emit any Export attributes.")
    .describe("noEmitComments", "Do not emit comments.")
    .describe("noEmitMethodExport", "Do not emit Export attribute for methods.")
    .describe("noEmitPropertyExport", "Do not emit Export attribute for properties.")
    .describe("noPrefixInterface", "Do not prefix interface names.")
    .alias("o", "outDir")
    .describe("o", "Output directory for generated C# files.")
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

    // overall Case Change emit control
    if (argv.noCaseChange)
    {
        options.isCaseChange = false;
        options.isCaseChangeClasses = false;
        options.isCaseChangeInterfaces = false;
        options.isCaseChangeMethods = false;
        options.isCaseChangeParameters = false;
        options.isCaseChangeProperties = false;

    }
    else 
    {
        if (argv.noCaseChangeClasses)
        {
            options.isCaseChangeClasses = false;
        }
        if (argv.noCaseChangeInterfaces)
        {
            options.isCaseChangeInterfaces = false;
        }
        if (argv.noCaseChangeMethods)
        {
            options.isCaseChangeMethods = false;
        }
        if (argv.noCaseChangeParameters)
        {
            options.isCaseChangeParameters = false;
        }
        if (argv.noCaseChangeProperties)
        {
            options.isCaseChangeProperties = false;
        }
    
    }

    if (argv.emitAllInterfaces)
    {
        options.isEmitAllInterfaces = true;
    }

    if (argv.noEmitComments)
    {
        options.emitComments = false;
    }
    
    if (typeof(argv.interfaceAccessModifier) === "string" )
    {
        options.interfaceAccessModifier = (argv.interfaceAccessModifier !== "none") ? argv.interfaceAccessModifier : undefined;
    }

    if (argv.defaultNameSpace)
    {
        options.defaultNameSpace = argv.defaultNameSpace;
    }

    if (argv.emitUsings)
    {
        options.isEmitUsings = true;
    }

    if (argv.combine)
    {
        options.isCombineFiles = true;
    }
    

    return options;
}