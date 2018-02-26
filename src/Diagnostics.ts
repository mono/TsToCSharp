
import {Node} from "ts-simple-ast";

export interface DiagnosticsInterface
{
    identifiedInterfaces: number;
    errors: string[];
    pushError(message: string) : void;
    pushErrorAtLoc(message: string, node: Node) : void;
    warnings: string[];
    pushWarning(message: string) : void;
    pushWarningAtLoc(message: string, node: Node) : void;
}

export class Diagnostics implements DiagnosticsInterface {
    identifiedInterfaces: number = 0;
    errors: string[] = [];
    warnings: string[] = [];
    constructor() { };
    pushWarningAtLoc(message: string, node: Node)
    {
        if (node)
        {
            const col = node.getSourceFile().compilerNode.getLineAndCharacterOfPosition(node.getStart()).character + 1;
            const line = node.getSourceFile().compilerNode.getLineAndCharacterOfPosition(node.getStart()).line + 1;
            this.pushWarning(message + " at Line " + line + ", Col " + col + " Offset " + node.getStart());
        }
        else
        {
            this.pushWarning(message);
        }
    }
    pushWarning(message: string)
    {
        this.warnings.push(message);
    }

    pushErrorAtLoc(message: string, node: Node)
    {
        if (node)
        {
            const col = node.getSourceFile().compilerNode.getLineAndCharacterOfPosition(node.getStart()).character + 1;
            const line = node.getSourceFile().compilerNode.getLineAndCharacterOfPosition(node.getStart()).line + 1;
            this.pushWarning(message + " at Line " + line + ", Col " + col + " Offset " + node.getStart());
        }
        else
        {
            this.pushWarning(message);
        }
    }
    pushError(message: string)
    {
        this.warnings.push(message);
    }


}