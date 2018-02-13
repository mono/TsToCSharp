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

## Command Line Interface

The project can also be setup to run from the command line.

### Setup a symlink to TsToCSharp

From the project directory execute the following:

``` bash
npm link
```

To test this you can open a new Terminal or Command Prompt, make sure you are not in the project directory and execute the `TsToCSharp` command.

``` bash
$ TsToCSharp
```

You should get a usage help screen because no parameters were specified.

```
Usage: TsToCSharp [options] file1.d.ts file2.d.ts

Options:
  --version     Show version number                                    [boolean]
  -o, --outDir  Output directory for generated C# files.
  -h, --help    Show help                                              [boolean]

Examples:
  TsToCSharp file1.d.ts        Emit strongly typed C# definition from TypeScript
                               definition file(s)
  TsToCSharp -o ./ file1.d.ts  Emit strongly typed C# definition from TypeScript
                               definition file(s)

Not enough non-option arguments: got 0, need at least 1

```

### Install globally

To install globally make sure you are in the the project directory and execute the following command:

``` bash
npm install -g
```

> Tip: On Windows Npm will install a `.cmd` wrapper so users can execute it from the command-line.