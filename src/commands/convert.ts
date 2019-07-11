import {Command, flags} from '@oclif/command'
import fs = require("fs");


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

  async run() {
    const {args, flags} = this.parse(ConvertCommand);
    console.log('arguments', args);
    this.log('flags', flags);

    if (args.filePath) {
      const file = fs.readFileSync(this.getFilePath(args.filePath));
      this.log(file.toString());

      return ;
    }

    this.error('file path must be provided');
  }

  private getFilePath(relativeFilePath: string): string {
    return __dirname + '\\' + relativeFilePath;
  }
}
