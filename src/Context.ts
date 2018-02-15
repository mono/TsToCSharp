import {GenOptionsInterface, GenOptions} from "./GenerateOptions";
import {DiagnosticsInterface, Diagnostics} from "./Diagnostics"

export interface ContextInterface {
  offset: number;
  indent: number;
  genOptions: GenOptionsInterface;
  diagnostics: DiagnosticsInterface;
}

export class Context implements ContextInterface {
  offset: number = 0;
  indent: number = 0;
  genOptions: GenOptionsInterface;
  diagnostics: DiagnosticsInterface;
  constructor(options?: GenOptionsInterface) { 
    if (options)
      this.genOptions = options;
    else
      this.genOptions = new GenOptions();
    this.diagnostics = new Diagnostics() 
  }

}  