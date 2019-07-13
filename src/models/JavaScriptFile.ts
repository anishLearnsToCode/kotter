import {exec} from "child_process";
import {FileService} from "../services/file.service";
import * as fs from "fs";
import {string} from "@oclif/command/lib/flags";

export class JavaScriptFile {
  private readonly fileService = FileService.getService();
  public readonly filePath: string;
  public readonly fileName: string;
  private readonly file: Buffer;
  private data: string;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.filePath = this.fileService.getRootFilePath(fileName);
    this.file = fs.readFileSync(this.filePath);
    this.data = this.file.toString();
    // console.log(this.data);

    for (let word of this.file) {
      console.log(String.fromCharCode(word));
    }
  }

  public prettify() {
    exec('npx prettier --write ' + this.filePath);
  }
}
