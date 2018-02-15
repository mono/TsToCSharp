# Generate Options

The command line options that can be passed to TsToCSharp allow you to control aspects of the emitted C# code in the final output file.

## Generate Options

| Option | Type | Default | Description |
|---|---|---|---|
| -h, --help | boolean | | Show help |
| --noEmitExports | boolean | true | Do not emit any Export attributes. Global|
| --noEmitMethodExport | boolean | true | Do not emit Export attribute for methods. |
| --noEmitPropertyExport | boolean | true | Do not emit Export attribute for properties. |
| --noPrefixInterface | boolean | true | Do not prefix interface names. |
| -o, --outDir | string | | Output directory for generated C# files. |
| --interfacePrefix | string | "I" | Prefix interfaces with the string provided. |
| --removeComments | boolean | false | Do not emit comments contained in the definition file(s). |

