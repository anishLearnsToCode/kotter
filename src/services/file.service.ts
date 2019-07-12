import {exec} from "child_process";

export class FileService {
  private static readonly instance = new FileService();

  public static getService() {
    return this.instance;
  }

  public getRootFilePath(relativeFilePath: string) {
    return __dirname + '\\' + relativeFilePath;
  }
}
