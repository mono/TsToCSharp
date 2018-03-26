# TsToCSharp

Emit C# strongly typed interface code from TypeScript definition files.

This project is intended to read in TypeScript (.d.ts) defintions files and generate as closely as possible a C# strongly typed API for use from either WebAssembly code or .NET hosted in Electron.

## Current Work

This is a work in progress, and we are only getting started.

Only the very basic TypeScript AST parsing is present at this time.  Mostly the basic types like `interface`, `boolean`, `number`, `arrays`, `properties`, `methods` and a handful of there associated complex types like `string | null`, `number | null`, `boolean | null` etc.


## Getting Started

1. [Installing](./docs/Installing.md)
2. [Usage](./docs/Usage.md)
3. [TypeScript to C# mapping](./docs/Mapping.md)
4. [Examples](./docs/Examples.md)
5. [Unit Tests](./docs/UnitTests.md)

## Obtaining Definition files

Definitions files describe the shape of JavaScript to the TypeScript compiler and are used only to compile.

The [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) github repository contains a large collection of TypeScript type definitions (.d.ts).

### Suggested resources on Definition Files

- [TypeScript Handbook](https://github.com/Microsoft/TypeScript-Handbook) - A comprehensive guide to the TypeScript language
- [TypeScript Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) - Guide that is designed to teach you how to write a high-quality TypeScript Declaration File.
- [Definitely Typed Repository](http://definitelytyped.org) - The repository for high quality TypeScript type definitions. 
- [Definitely Typed Website](http://definitelytyped.org) - The DefinitelyTyped website.
- [Definitely Typed Guides](http://definitelytyped.org/guides/creating.html) - Creating a definition file.






