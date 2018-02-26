# Generate Options

The command line options that can be passed to TsToCSharp allow you to control aspects of the emitted C# code in the final output file.

## Generate Options

| Option | Type | Default | Description |
|---|---|---|---|
| -h, --help | boolean | | Show help |
| --interfacePrefix | string | "I" (uppercase `i`) | Prefix interfaces with the string provided. |
| --interfaceAccessModifier | string | "public" | Default interface access identifier. |
| --noCaseChange | boolean | true | Do not change case. Global|
| --noCaseChangeClasses | boolean | true | Do not change case of Class Declarations. |
| --noCaseChangeInterfaces | boolean | true | Do not change case of Interface Declarations. |
| --noCaseChangeMethods | boolean | true | Do not change case of Method Declarations. |
| --noCaseChangeParameters | boolean | true | Do not change case of Parameter Declarations. |
| --noCaseChangeProperties | boolean | true | Do not change case of Property Declarations. |
| --noEmitExports | boolean | true | Do not emit any Export attributes. Global|
| --noEmitMethodExport | boolean | true | Do not emit Export attribute for methods. |
| --noEmitPropertyExport | boolean | true | Do not emit Export attribute for properties. |
| --noPrefixInterface | boolean | true | Do not prefix interface names. |
| -o, --outDir | string | | Output directory for generated C# files. |
| --removeComments | boolean | false | Do not emit comments contained in the definition file(s). |

