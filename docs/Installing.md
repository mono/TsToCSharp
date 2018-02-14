# Installing the project

## Github Repository

* Clone the TsToCSharp repository
    * For SSH

    ``` bash
    # Mac Terminal
    $ mkdir projects
    $ cd projects
    projects$
    projects$ git clone git@github.com:mono/TsToCSharp.git
    ```

    * For HTTPS 

    ``` bash
    # Mac Terminal
    $ mkdir projects
    $ cd projects
    projects$
    projects$ git clone https://github.com/mono/TsToCSharp.git
    ```

## Install NPM module dependencies

The following command will install all the NPM module dependencies that are used in the project.

``` bash
$ npm install
```

After the Node modules are installed and requirements setup the project will be ready to build.

## Build the project TypeScript files

The following command will compile all the TypeScript (.ts) files.

``` bash
$ npm run build-ts
```

After the compilation is complete project is ready for use.

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
  --version               Show version number                          [boolean]
  -o, --outDir            Output directory for generated C# files.
  --noEmitComments        Do not emit comments contained in the definition
                          file(s).
  --noEmitExports         Do not emit any Export attributes.
  --noEmitMethodExport    Do not emit Export attribute for methods.
  --noEmitPropertyExport  Do not emit Export attribute for properties.
  -h, --help              Show help                                    [boolean]

Examples:
  TsToCSharp file1.d.ts        Emit strongly typed C# definition from TypeScript
                               definition file(s)
  TsToCSharp -o ./ file1.d.ts  Emit strongly typed C# definition from TypeScript
                               definition file(s)

Not enough non-option arguments: got 0, need at least 1

```

All the available command line options can be found in the [Generate Options](./GenerateOptions.md) document.

### Install globally

To install globally make sure you are in the the project directory and execute the following command:

``` bash
npm install -g
```

> Tip: On Windows Npm will install a `.cmd` wrapper so users can execute it from the command-line.

