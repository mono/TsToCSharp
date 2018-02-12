import * as path from "path";
import * as ts from "typescript";
import {expect} from "chai";
import * as fs from "fs";
import Ast from "ts-simple-ast";
import {TsToCSharpGenerator} from "./TStoCSharpGenerator";

console.log("");
console.log("TypeScript version: " + ts.version);
console.log("Working Directory: " + __dirname);

const definitionsPath = "./test/definitions";
const casesPath = "./test/cases";

const interfaceCases = [
    {should: "should generate simple interface", file: "Interface"},
    {should: "should generate simple interface with closing brackets on separate lines", file: "Interface2"},
    {should: "should generate simple interface with leading and trailing comments", file: "Comments"},
    {should: "should generate simple interface with leading and trailing comments on separate line", file: "Comments2"},
    {should: "should generate interface extending one interface", file: "Extends"},
    {should: "should generate interface with method that returns void", file: "MethodReturnVoid"},
    {should: "should generate interface with method that returns bool", file: "MethodReturnBool"},
    {should: "should generate interface with method that returns string", file: "MethodReturnString"},
    {should: "should generate interface with method that returns any", file: "MethodReturnAny"},
    {should: "should generate interface with method that returns type reference", file: "MethodReturnObject1"},    
    {should: "should generate interface with 2 methods that returns type reference", file: "MethodReturnObject2"},    
    {should: "should generate interface with method with string parm that returns bool", file: "MethodWithStringParmReturnBool"},    
    {should: "should generate interface with method with string parms", file: "MethodWithStringParms"},
    {should: "should generate interface with method with string or null parms", file: "MethodWithStringOrNullParms"},
    {should: "should generate interface with method leading and trailing comments", file: "MethodComments"},
    {should: "should generate interface with method that returns number array", file: "MethodReturnNumberArray"},
    {should: "should generate interface with method that returns number array or null", file: "MethodReturnNumberArrayOrNull"},
    {should: "should generate interface with method that returns string array", file: "MethodReturnStringArray"},
    {should: "should generate interface with method that returns string array or null", file: "MethodReturnStringArrayOrNull"},
    {should: "should generate interface with method that returns any array", file: "MethodReturnAnyArray"},
    {should: "should generate interface with method that returns any array or null", file: "MethodReturnAnyArrayOrNull"},
    {should: "should generate interface with method that returns object array", file: "MethodReturnObjArray"},
    {should: "should generate interface with method that returns object array or null", file: "MethodReturnObjArrayOrNull"},
    {should: "should generate interface with string property", file: "StringProperty"},
    {should: "should generate interface with readonly object property", file: "ReadOnlyObjectProperty"},
    {should: "should generate interface with string or null property", file: "StringOrNullProperty"},
    {should: "should generate interface with number or null property", file: "NumberOrNullProperty"},
    {should: "should generate interface with boolean or null property", file: "BooleanOrNullProperty"},
    {should: "should generate interface with object or null property", file: "ObjOrNullProperty"},
    {should: "should generate interface with indexer property", file: "IndexerProperty"},
    {should: "should generate interface with readonly indexer property", file: "ReadOnlyIndexerProperty"},
    {should: "should generate interface with string indexer property", file: "StringIndexerProperty"},
    {should: "should generate interface with indexer property with leading and trailing comments", file: "IndexerPropertyComments"},
    {should: "should generate interface with string array property", file: "ArrayProperty"},
    {should: "should generate interface with number and object array property", file: "ArrayProperty2"},
    {should: "should generate interface with nullable number array property", file: "NumberArrayOrNullProperty"},    
    {should: "should generate interface with nullable boolean array property", file: "BooleanArrayOrNullProperty"},
    {should: "should generate interface with nullable object array property", file: "ObjArrayOrNullProperty"},            
    {should: "should generate interface with nullable string array property", file: "StringArrayOrNullProperty"},            

    
    
    {should: "should generate interfaces extending one interface", file: "Extends2"},
    {should: "should generate multiple interfaces extending multiple interfaces", file: "Extends3"},

]

describe("TsToCSharpGenerator", () => {
    describe("interfaces", () => {

        const testPath = "interfaces";

        interfaceCases.forEach(testCase =>
            {

                var testFile = testCase.file;

                it(testCase.should, () => {
                    const ast = new Ast({
                        compilerOptions: {
                            target: ts.ScriptTarget.ESNext
                        }
                    });
                    //console.log("Adding Source File: " + path.resolve(path.join(definitionsPath,testPath,testFile + ".d.ts")));
                    ast.addSourceFileIfExists(path.resolve(path.join(definitionsPath,testPath,testFile + ".d.ts")));
        
                    var sourceFiles = ast.getSourceFiles();
                    let sourceCode = TsToCSharpGenerator(sourceFiles[0], {
                            offset: 0,
                        indent: 0
                    })
                    //fs.writeFileSync(path.join(casesPath,testPath,testFile + ".cs"), sourceCode);
                    var genCase = fs.readFileSync(path.join(casesPath,testPath,testFile + ".cs")).toString();
                    expect(sourceCode).to.equal(genCase);
                });
        
            }
        )
    });
});
