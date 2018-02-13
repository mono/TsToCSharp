# Usage

Using the project is a simple step of executing the project from the command line with a list of files specified.

First you will need a TypeScript (.d.ts) definition file to be used as input.

``` bash
$ npm start [options] path/to/file/definition.d.ts
```

By default the generated file will reside in the same path as the definition file and will have a `.cs` extension.

## Command Line Options

All the available command line options can be found in the [Generate Options](./GenerateOptions.md) document.

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

## Using the CLI

If the CLI interface was setup by following the instructions [Command Line Interface](./Installing#command-line-interface) from the [Installing](./Installing.md) doc then you can simple do the following:

``` bash
$ TsToCSharp [options] file1.d.ts file2.d.ts
```

From the Terminal or Command Prompt enter the following:

``` bash
$ TsToCSharp
```

And you will be presented with a help screen
