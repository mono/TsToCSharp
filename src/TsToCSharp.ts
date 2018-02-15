#!/usr/bin/env node
import * as ts from 'typescript';
import * as fs from "fs";
import Ast from "ts-simple-ast";
import * as path from "path";


import {ParseCommandLine} from "./CommandLineParser";
import { TsToCSharpGenerator } from './TsToCSharpGenerator';
import {Context} from "./Context";

class Startup {

    public static main(): number {
        
        const genOptions = ParseCommandLine();

        console.log('Starting Generation for file(s): ' + genOptions.fileList.join(","));
        genOptions.fileList.forEach(fileName => {
             const ast = new Ast({
                 compilerOptions: {
                     target: ts.ScriptTarget.ESNext
                 }
             });
            
            console.log('Resolving File: ' + fileName + ' => ' + path.resolve(fileName));
            const sf = ast.addSourceFileIfExists(path.resolve(fileName));
            const sfs = ast.getSourceFiles();
            const context = new Context(genOptions);
            
            sfs.forEach(astSourceFile => {
                        
                let sourceCode = TsToCSharpGenerator(astSourceFile, context);   

                // output the file.
                const filePath = (genOptions.outDir) ? genOptions.outDir : path.dirname(fileName);
                const justTheName = path.basename(fileName,".d.ts");

                console.log('Generating File: ' + path.resolve(path.join(filePath,justTheName+".cs")));
                fs.writeFileSync(path.join(filePath,justTheName+".cs"), sourceCode);
            });

        });
        return 0;
    }
}


Startup.main();