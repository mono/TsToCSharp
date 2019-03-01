import * as path from "path";
import {expect} from "chai";
import * as fs from "fs";
import Ast, {ts, ScriptTarget, ModuleResolutionKind, ModuleKind} from "ts-morph";
import {TsToCSharpGenerator} from "./TStoCSharpGenerator";
import {GenOptions} from "./GenerateOptions";
import {Context} from "./Context";

console.log("");
console.log("TypeScript version: " + ts.version);
console.log("Working Directory: " + __dirname);

const definitionsPath = "./test/definitions";
const casesPath = "./test/cases";

class TestGenOptions extends GenOptions {
    constructor () 
    {
        super();
        this.isPrefixInterface = false;
        this.isCaseChange = false;
        this.interfaceAccessModifier = "";
    }
}

function CreateAST() : Ast
{
    const ast = new Ast({
        compilerOptions: {
            target: ScriptTarget.ESNext,
            module: ModuleKind.CommonJS,
            moduleResolution: ModuleResolutionKind.NodeJs,
            noLib: true 
        }
    });
    return ast;
}

const interfaceCases = [
    {should: "should generate simple interface", file: "Interface"},
    {should: "should generate simple interface with closing brackets on separate lines", file: "Interface2"},
    {should: "should generate simple interface with leading and trailing comments", file: "Comments"},
    {should: "should generate simple interface with leading and trailing comments on separate line", file: "Comments2"},
    {should: "should generate interface extending one interface", file: "Extends"},
    {should: "should generate interface with method that returns void", file: "MethodReturnVoid"},
    {should: "should generate interface with method that returns never", file: "MethodReturnNever"},
    {should: "should generate interface with method that returns bool", file: "MethodReturnBool"},
    {should: "should generate interface with method that returns bool or null", file: "MethodReturnBoolOrNull"},
    {should: "should generate interface with method that returns string", file: "MethodReturnString"},
    {should: "should generate interface with method that returns string or null", file: "MethodReturnStringOrNull"},
    {should: "should generate interface with method that returns any", file: "MethodReturnAny"},
    {should: "should generate interface with method that returns any or null", file: "MethodReturnAnyOrNull"},
    {should: "should generate interface with method that returns number", file: "MethodReturnNumber"},
    {should: "should generate interface with method that returns number or null", file: "MethodReturnNumberOrNull"},
    {should: "should generate interface with method that returns type reference", file: "MethodReturnRefType1"},    
    {should: "should generate interface with 2 methods that returns type reference", file: "MethodReturnRefType2"},    
    {should: "should generate interface with method that returns type reference or null", file: "MethodReturnRefTypeOrNull"},    
    {should: "should generate interface with method with string parm that returns bool", file: "MethodWithStringParmReturnBool"},    
    {should: "should generate interface with method with string parms", file: "MethodWithStringParms"},
    {should: "should generate interface with method with string array parms", file: "MethodWithStringArrayParms"},
    {should: "should generate interface with method with string array or null parms", file: "MethodWithStringArrayOrNullParms"},
    {should: "should generate interface with method with string or null parms", file: "MethodWithStringOrNullParms"},
    {should: "should generate interface with method with boolean parms", file: "MethodWithBooleanParms"},
    {should: "should generate interface with method with boolean or null parms", file: "MethodWithBooleanOrNullParms"},
    {should: "should generate interface with method with boolean array parms", file: "MethodWithBooleanArrayParms"},
    {should: "should generate interface with method with number parms", file: "MethodWithNumberParms"},
    {should: "should generate interface with method with number or null parms", file: "MethodWithNumberOrNullParms"},
    {should: "should generate interface with method with number array parms", file: "MethodWithNumberArrayParms"},
    {should: "should generate interface with method with number array or null parms", file: "MethodWithNumberArrayOrNullParms"},
    {should: "should generate interface with method with type reference or null parms", file: "MethodWithTypeRefOrNullParms"},
    {should: "should generate interface with method with type reference array parms", file: "MethodWithTypeRefArrayParms"},
    {should: "should generate interface with method with type reference array or null parms", file: "MethodWithTypeRefArrayOrNullParms"},
    {should: "should generate interface with method with rest any parms", file: "MethodWithRestAnyParms"},
    {should: "should generate interface with method with rest type ref parms", file: "MethodWithRestTypeRefParms"},
    {should: "should generate interface with method with rest string parms", file: "MethodWithRestStringParms"},
    {should: "should generate interface with method with literal type parms", file: "MethodWithLiteralTypeParm"},
    {should: "should generate interface with method leading and trailing comments", file: "MethodComments"},
    {should: "should generate interface with method that returns number array", file: "MethodReturnNumberArray"},
    {should: "should generate interface with method that returns number array or null", file: "MethodReturnNumberArrayOrNull"},
    {should: "should generate interface with method that returns string array", file: "MethodReturnStringArray"},
    {should: "should generate interface with method that returns string array or null", file: "MethodReturnStringArrayOrNull"},
    {should: "should generate interface with method that returns any array", file: "MethodReturnAnyArray"},
    {should: "should generate interface with method that returns any array or null", file: "MethodReturnAnyArrayOrNull"},
    {should: "should generate interface with method that returns type reference array", file: "MethodReturnRefTypeArray"},
    {should: "should generate interface with method that returns type reference array or null", file: "MethodReturnRefTypeArrayOrNull"},
    {should: "should generate interface with string property", file: "StringProperty"},
    {should: "should generate interface with readonly object property", file: "ReadOnlyObjectProperty"},
    {should: "should generate interface with string or null property", file: "StringOrNullProperty"},
    {should: "should generate interface with number property", file: "NumberProperty"},
    {should: "should generate interface with number or null property", file: "NumberOrNullProperty"},
    {should: "should generate interface with boolean property", file: "BooleanProperty"},
    {should: "should generate interface with boolean or null property", file: "BooleanOrNullProperty"},
    {should: "should generate interface with type reference or null property", file: "ObjOrNullProperty"},
    {should: "should generate interface with indexer property", file: "IndexerProperty"},
    {should: "should generate interface with readonly indexer property", file: "ReadOnlyIndexerProperty"},
    {should: "should generate interface with string indexer property", file: "StringIndexerProperty"},
    {should: "should generate interface with indexer property with leading and trailing comments", file: "IndexerPropertyComments"},
    {should: "should generate interface with string array property", file: "ArrayProperty"},
    {should: "should generate interface with number and object array property", file: "ArrayProperty2"},
    {should: "should generate interface with number array property", file: "NumberArrayProperty"},    
    {should: "should generate interface with nullable number array property", file: "NumberArrayOrNullProperty"},    
    {should: "should generate interface with boolean array property", file: "BooleanArrayProperty"},
    {should: "should generate interface with nullable boolean array property", file: "BooleanArrayOrNullProperty"},
    {should: "should generate interface with type reference array property", file: "TypeRefArrayProperty"},            
    {should: "should generate interface with nullable type reference array property", file: "TypeRefArrayOrNullProperty"},            
    {should: "should generate interface with string array property", file: "StringArrayProperty"},            
    {should: "should generate interface with nullable string array property", file: "StringArrayOrNullProperty"},            
    {should: "should generate interface with type query property", file: "TypeQueryProperty"},            
   
    
    {should: "should generate interfaces extending one interface", file: "Extends2"},
    {should: "should generate multiple interfaces extending multiple interfaces", file: "Extends3"},
    {should: "should generate multiple interfaces extending multiple interfaces", file: "Extends4"},
    {should: "should generate interface with generic and extends generic", file: "ExtendsGeneric"},
    {should: "should generate generic interface with constraints", file: "GenericInterfaceWithConstraint"},
    {should: "should generate generic interface generic constraints #2", file: "GenericInterfaceWithConstraint2"},
    {should: "should generate generic interface with non supported type default", file: "GenericInterfaceWithTypeDefault"},
    {should: "should generate interface with event handlers", file: "EventHandlers"},
    {should: "should generate interface with with method with DOM event handler", file: "MethodWithDOMEventHandlerParms"},

]

describe("TsToCSharpGenerator", () => {
    describe("interfaces", () => {

        const testPath = "interfaces";

        interfaceCases.forEach(testCase =>
            {

                const testFile = testCase.file;

                it(testCase.should, () => {
                    
                    const ast = CreateAST();

                    //console.log("Adding Source File: " + path.resolve(path.join(definitionsPath,testPath,testFile + ".d.ts")));
                    ast.addExistingSourceFileIfExists(path.resolve(path.join(definitionsPath,testPath,testFile + ".d.ts")));
        
                    const sourceFiles = ast.getSourceFiles();
                    const context = new Context(new TestGenOptions());

                    const sourceCode = TsToCSharpGenerator(sourceFiles[0], context)
                    //fs.writeFileSync(path.join(casesPath,testPath,testFile + ".cs"), sourceCode);
                    const genCase = fs.readFileSync(path.join(casesPath,testPath,testFile + ".cs")).toString();
                    expect(sourceCode).to.equal(genCase);
                });
        
            }
        )
    });
});

class TestClassGenOptions extends GenOptions {
    constructor () 
    {
        super();
        this.isCaseChangeParameters = false;
    }
}

class TestClassNoEmitComments extends GenOptions {
    constructor () 
    {
        super();
        this.emitComments = false;
        this.isCaseChangeParameters = false;
    }
}

class TestClassNSGenOptions extends GenOptions {
    constructor () 
    {
        super();
        this.isCaseChangeParameters = false;
        this.defaultNameSpace = "Hello.World";
    }
}

class TestClassNSAndUsingGenOptions extends GenOptions {
    constructor () 
    {
        super();
        this.isCaseChangeParameters = false;
        this.defaultNameSpace = "Hello.World";
        this.isEmitUsings = true;
    }
}

const classCases = [
    {should: "should generate simple class from declaraion of interface", file: "InterfaceDeclaration", genOptions: new TestClassGenOptions() },
    {should: "should generate simple class from declaraion of interface with comments", file: "InterfaceDeclarationWithComments", genOptions: new TestClassGenOptions()},
    {should: "should generate simple class from declaraion of interface without comments", file: "InterfaceDeclarationNoEmitComments", genOptions: new TestClassNoEmitComments()},
    {should: "should generate simple class from declaraion of interface with constructor arguments", file: "InterfaceDeclarationWithConstructorArgs", genOptions: new TestClassGenOptions()},    
    {should: "should generate class from declaraion of interface with properties", file: "InterfaceDeclarationWithProperties", genOptions: new TestClassGenOptions()},    
    {should: "should generate class from declaraion of interface with methods", file: "InterfaceDeclarationWithMethods", genOptions: new TestClassGenOptions()},    
    {should: "should generate class from declaraion of interface with inherited properties", file: "InterfaceDeclarationWithInheritedProperties", genOptions: new TestClassGenOptions()},    
    {should: "should generate class from declaraion of interface with inherited methods", file: "InterfaceDeclarationWithInheritedMethods", genOptions: new TestClassGenOptions()},    
    {should: "should generate class from declaraion of interface with inherited indexer", file: "InterfaceDeclarationPropertyIndexer", genOptions: new TestClassGenOptions()},    
    {should: "should generate class from declaraion of interface with inherited methods and properties", file: "InterfaceDeclaration1", genOptions: new TestClassGenOptions()},    
    {should: "should generate class from declaraion of interface with type query properties", file: "InterfaceDeclarationWithTypeQuery", genOptions: new TestClassGenOptions()},    
    
    {should: "should generate class from declaraion of interface with extended interfaces", file: "InterfaceDeclaration2", genOptions: new TestClassGenOptions()},    
    {should: "should generate class from declaraion of interface with event handlers", file: "InterfaceDeclarationWithEventHandlers", genOptions: new TestClassGenOptions()},    
    {should: "should generate simple class with default namespace", file: "InterfaceDeclaration4", genOptions: new TestClassNSGenOptions() },
    {should: "should generate simple class with default namespace and Usings", file: "InterfaceDeclaration5", genOptions: new TestClassNSAndUsingGenOptions() },

]

describe("TsToCSharpGenerator", function () {
    describe("classes", function () {

        const testPath = "classes";

        classCases.forEach(testCase =>
             {
                const testFile = testCase.file;
                const genOptions = testCase.genOptions;//testCase.genOptions ? testCase.genOptions : new TestClassGenOptions();

                it(testCase.should, function () {
                    
                    const ast = CreateAST();

                    //console.log("Adding Source File: " + path.resolve(path.join(definitionsPath,testPath,testFile + ".d.ts")));
                    ast.addExistingSourceFileIfExists(path.resolve(path.join(definitionsPath,testPath,testFile + ".d.ts")));
        
                    const sourceFiles = ast.getSourceFiles();
                    const context = new Context(genOptions);
                    const sourceCode = TsToCSharpGenerator(sourceFiles[0], context)
                    //fs.writeFileSync(path.join(casesPath,testPath,testFile + ".cs"), sourceCode);
                    const genCase = fs.readFileSync(path.join(casesPath,testPath,testFile + ".cs")).toString();
                    expect(sourceCode).to.equal(genCase);
                });
        
            }
        )

    });
});

const diagnosticCases = [
    {should: "should generate warning non supported type default", file: "GenericInterfaceWithTypeDefault"},
    {should: "should generate warning non supported declaration", file: "DeclarationOfNonInterface"},

]

describe("TsToCSharpGenerator", () => {
    describe("diagnostics", () => {

        const testPath = "diagnostics";
        let testCase = diagnosticCases[0];
        let testFile = diagnosticCases[0].file;
        it(testCase.should, () => {
            
            const ast = CreateAST();

            ast.addExistingSourceFileIfExists(path.resolve(path.join(definitionsPath,testPath,testFile + ".d.ts")));

            const sourceFiles = ast.getSourceFiles();
            const context = new Context(new TestGenOptions());

            TsToCSharpGenerator(sourceFiles[0], context)
            expect(context.diagnostics.warnings.length).to.equal(1);
        });

        testCase = diagnosticCases[1];
        testFile = diagnosticCases[1].file;
        it(testCase.should, () => {

            const ast = CreateAST();

            ast.addExistingSourceFileIfExists(path.resolve(path.join(definitionsPath,testPath,testFile + ".d.ts")));

            const sourceFiles = ast.getSourceFiles();
            const context = new Context(new TestClassGenOptions());

            TsToCSharpGenerator(sourceFiles[0], context)
            expect(context.diagnostics.warnings.length).to.equal(1);
        });
    });
});
