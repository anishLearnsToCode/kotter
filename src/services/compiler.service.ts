import {exec} from "child_process";
import * as fs from "fs";
import {JavaScriptFile} from "../models/JavaScriptFile";

export class CompilerService {
  private static readonly instance: CompilerService = new CompilerService();

  private constructor() {
  }

  public static getService(): CompilerService {
    return this.instance;
  }

  public createConvertedJavaScriptFile(fileName: string): boolean {
    // console.log(fileName);
    const file = new JavaScriptFile(fileName);
    console.log(file.fileName);
    console.log(file.filePath);

    return false;
  }
}
