import {Command, flags} from '@oclif/command'

export default class Goodbye extends Command {
  static description = 'describe the command here';

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  };

  static args = [{name: 'file'}];

  async run() {
    const {args, flags} = this.parse(Goodbye);

    const name = flags.name || 'world';
    this.log(`goodnight, dont let the bed bugs bite :D`);
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
