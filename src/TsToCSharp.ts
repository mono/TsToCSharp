import * as ts from 'typescript';
import * as fs from "fs";
import Ast from "ts-simple-ast";
import * as path from "path";

import { TsToCSharpGenerator } from './TsToCSharpGenerator';

class Startup {

    public static main(): number {
        
        const fileNames = process.argv.slice(2);
        console.log('Starting Generation for file(s): ' + fileNames.join(","));
        fileNames.forEach(fileName => {
             const ast = new Ast({
                 compilerOptions: {
                     target: ts.ScriptTarget.ESNext
                 }
             });
            
            console.log('Resolving File: ' + fileName + ' => ' + path.resolve(fileName));
            var sf = ast.addSourceFileIfExists(path.resolve(fileName));
            var sfs = ast.getSourceFiles();
            sfs.forEach(
                    astSourceFile => {
                        let sourceCode = TsToCSharpGenerator(astSourceFile, {
                             offset: 0,
                            indent: 0
                        }
                    );    
                    // output the file.
                    var filePath = path.dirname(fileName);
                    var justTheName = path.basename(fileName,".d.ts");
                    
                    fs.writeFileSync(path.join(filePath,justTheName+".cs"), sourceCode);
                }
            )

        });
        return 0;
    }
}


Startup.main();