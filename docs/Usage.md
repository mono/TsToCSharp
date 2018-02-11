# Usage

Using the project is a simple step of executing the project from the command line with a list of files specified.

First you will need a TypeScript (.d.ts) definition file to be used as input.

``` bash
$ npm start path/to/file/definition.d.ts
```

The output will reside in the same path as the definition file and will have a `.cs` extension.

> Note: The command line is very simple right now as only a list of files are passed in.  This will change in the future as more options are added and the project advances.

## Sample run

``` bash
npm start ../tests/interface.d.ts
```

Output:

```
> tstocsharp@1.0.0 start /projects/TypeScript/TsToCSharp
> node ./dist/TStoCSharp.js "../tests/interface.d.ts"

Starting Generation for file(s): ../tests/interface.d.ts
Resolving File: ../tests/interface.d.ts => /projects/TypeScript/tests/interface.d.ts

```

The output will reside in the same directory as `/projects/TypeScript/tests/interface.cs`.