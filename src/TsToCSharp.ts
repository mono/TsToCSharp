#!/usr/bin/env node

import * as fs from "fs";
import Ast, {ts, ScriptTarget, getCompilerOptionsFromTsConfig, ModuleResolutionKind, ModuleKind} from "ts-morph";
import * as path from "path";
import * as os from "os";


import {ParseCommandLine} from "./CommandLineParser";
import { TsToCSharpGenerator } from './TsToCSharpGenerator';
import {Context} from "./Context";

function CreateAST(useVirtualFileSystem? : boolean) : Ast
{
    let useVFS = false;
    if (useVirtualFileSystem)
        useVFS = true;

    const ast = new Ast({
        compilerOptions: {
            target: ScriptTarget.ESNext,
            module: ModuleKind.CommonJS,
            moduleResolution: ModuleResolutionKind.NodeJs,
            noLib: true 
        },
        useVirtualFileSystem: useVFS,
    });
    return ast;
}

class Startup {

    public static main(): number {
        
        const genOptions = ParseCommandLine();

        console.log('Starting Generation for file(s): ' + genOptions.fileList.join(","));

        if (!genOptions.isCombineFiles)
        {
            genOptions.fileList.forEach(fileName => {
                
                const ast = CreateAST();
                
                console.log('Resolving File: ' + fileName + ' => ' + path.resolve(fileName));
                const sf = ast.addExistingSourceFileIfExists(path.resolve(fileName));
                const sfs = ast.getSourceFiles();
                const context = new Context(genOptions);
                
                sfs.forEach(astSourceFile => {
                            
                    let sourceCode = TsToCSharpGenerator(astSourceFile, context);   

                    // output the file.
                    const filePath = (genOptions.outDir) ? genOptions.outDir : path.dirname(fileName);
                    const justTheName = path.basename(fileName,".d.ts");

                    console.log('Generating File: ' + path.resolve(path.join(filePath,justTheName+".cs")));
                    fs.writeFileSync(path.join(filePath,justTheName+".cs"), sourceCode);

                    if (context.diagnostics.errors.length > 0)
                    {
                        context.diagnostics.errors.forEach(warning => {
                            console.log(warning);
                        });

                    }
                    if (context.diagnostics.warnings.length > 0)
                    {
                        context.diagnostics.warnings.forEach(warning => {
                            console.log(warning);
                        });
                    }
                });

            });
        }
        else
        {
            const ast = CreateAST(true);

            const vfs = ast.getFileSystem();
            
            const cd = vfs.getCurrentDirectory();
            const combinedSource : string[] = [];
            genOptions.fileList.forEach(fileName => {
                console.log('Resolving File: ' + fileName + ' => ' + path.resolve(fileName));
                const fileContents = fs.readFileSync(path.resolve(fileName), "utf8");
                combinedSource.push(fileContents);
            });


            const virtualSource = combinedSource.join(os.EOL);
            const virtualFile = path.basename(genOptions.fileList[0]);
            console.log('Combining files: ' + virtualFile);
            vfs.writeFileSync(virtualFile, virtualSource);
            
            ast.addExistingSourceFileIfExists(virtualFile);

            const sfs = ast.getSourceFiles();
            const context = new Context(genOptions);
                
            const astSourceFile = sfs[0];

            let sourceCode = TsToCSharpGenerator(astSourceFile, context);   

            // output the file.
            const fileName = genOptions.fileList[0];
            const filePath = (genOptions.outDir) ? genOptions.outDir : path.dirname(fileName);
            const justTheName = path.basename(fileName,".d.ts");

            console.log('Generating File: ' + path.resolve(path.join(filePath,justTheName+".cs")));
            fs.writeFileSync(path.join(filePath,justTheName+".cs"), sourceCode);

            if (context.diagnostics.errors.length > 0)
            {
                context.diagnostics.errors.forEach(warning => {
                    console.log(warning);
                });

            }
            if (context.diagnostics.warnings.length > 0)
            {
                context.diagnostics.warnings.forEach(warning => {
                    console.log(warning);
                });
            }

            // });            
        }
        return 0;
    }
}


Startup.main();