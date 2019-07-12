import {Command, flags} from '@oclif/command'
import fs = require("fs");
import {exec} from "child_process";
import {CompilerService} from "../services/compiler.service";
import {FileService} from "../services/file.service";


export class ConvertCommandArguments {
  public filePath: string;
  public filePathProvided: boolean;

  constructor (args: ConvertCommandArguments) {
    this.filePath = args.filePath || '';
    this.filePathProvided = args.filePath === '';
  }
}

export class ConvertCommandFlags {
  verboseLogging: boolean;

  constructor (flags: ConvertCommandFlags) {
    this.verboseLogging = flags.verboseLogging || false;
  }
}

export default class ConvertCommand extends Command {
  static description = 'Pass in the relative file path to a js file and will convert it';

  static flags = {
    verboseLogging: flags.boolean({
      char: "L", description: 'enable verbose logging in case of errors'
    })
  };

  static args = [{name: 'filePath'}];

  private readonly compilerService = CompilerService.getService();
  private readonly fileService = FileService.getService();

  async run() {
    const {args, flags} = this.parse(ConvertCommand);

    if (!args.filePath) {
      this.error('file path must be provided');
    }

    // if (!this.isJavaScriptFile(args.filePath)) {
    //   this.error('file must be a js file');
    // }

    if (this.compilerService.createConvertedJavaScriptFile(args.filePath)) {
      this.log(args.filePath + ' file has been converted successfully :D');
    } else {
      this.error(args.filePath + ' was not converted successfully');
    }
  }
}
