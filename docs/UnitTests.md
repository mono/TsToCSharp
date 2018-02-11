# Unit Tests

Right now the project is taking a Test Driven Development (TDD) approach.  What this basically means is that as each TypeScript AST spec is implemented there will be a test setup for verifying the correct C# mapping.  That way we can guarantee that any modifications to the C# code emitted from the TypeScript AST parsing can be verified to produce the expected result as the project advances.

The unit tests are setup with predefined input [TypeScript definitions](/test/definitions) and a corresponding expected [C# result case](/test/cases).

## Current Work

This is a work in progress and only the very basic AST parsing is present at this time.  Mostly the basic types like `interface`, `boolean`, `number`, `arrays`, `properties`, `methods` and a handful of there associated complex types like `string | null`, `number | null`, `boolean | null` etc.

A lot more work is required.

## Test directory structure

The test files can be found in the [Test](/test) directory.

```
.
|--- test                           
     |--- cases 
          |--- interfaces           // C# interface test case results used for correctness.
     |--- definitions
          |--- interfaces           // TypeScript input definition files used to generate the C# code.
``` 

## The testing framework

The tesing is done using [Mocha](mochajs.org) which is popular testing framework and the [Chai](http://chaijs.com/) assertion library.  

## Running the tests

From the command line:

```
$ npm test
```

Sample output.

```
TypeScript version: 2.7.1
Working Directory: /projects/TypeScript/TsToCSharp/dist


  TsToCSharpGenerator
    interfaces
      ✓ should generate simple interface
      ✓ should generate simple interface with closing brackets on separate lines
      ✓ should generate simple interface with leading and trailing comments
      ✓ should generate simple interface with leading and trailing comments on separate line
      ✓ should generate interface extending one interface
      ✓ should generate interface with method that returns void
      ✓ should generate interface with method that returns bool
      ✓ should generate interface with method that returns string
      ✓ should generate interface with method that returns any
      ✓ should generate interface with method that returns type reference
      ✓ should generate interface with 2 methods that returns type reference
      ✓ should generate interface with method with string parm that returns bool
      ✓ should generate interface with method with string parms
      ✓ should generate interface with method with string or null parms
      ✓ should generate interface with method leading and trailing comments
      ✓ should generate interface with string property
      ✓ should generate interface with readonly object property
      ✓ should generate interface with string or null property
      ✓ should generate interface with number or null property
      ✓ should generate interface with boolean or null property
      ✓ should generate interface with object or null property
      ✓ should generate interface with indexer
      ✓ should generate interface with readonly indexer
      ✓ should generate interface with string indexer
      ✓ should generate interface with string indexer
      ✓ should generate interface with indexer property with leading and trailing comments
      ✓ should generate interface with number and object array
      ✓ should generate interface with nullable number array
      ✓ should generate interface with nullable boolean array
      ✓ should generate interface with nullable object array
      ✓ should generate interface with nullable string array
      ✓ should generate interfaces extending one interface
      ✓ should generate multiple interfaces extending multiple interfaces


  33 passing (98ms)
  ```
