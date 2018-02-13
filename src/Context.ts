import {IGenOptions, GenOptions} from "./GenerateOptions";

export interface Context {
    offset: number;
    indent: number;
    genOptions: IGenOptions
  }