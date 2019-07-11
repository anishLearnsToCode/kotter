kotter
======



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/kotter.svg)](https://npmjs.org/package/kotter)
[![Downloads/week](https://img.shields.io/npm/dw/kotter.svg)](https://npmjs.org/package/kotter)
[![License](https://img.shields.io/npm/l/kotter.svg)](https://github.com/anishLearnsToCode/kotter/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g kotter
$ kotter COMMAND
running command...
$ kotter (-v|--version|version)
kotter/0.0.0 win32-x64 node-v10.16.0
$ kotter --help [COMMAND]
USAGE
  $ kotter COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`kotter hello [FILE]`](#kotter-hello-file)
* [`kotter help [COMMAND]`](#kotter-help-command)

## `kotter hello [FILE]`

describe the command here

```
USAGE
  $ kotter hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ kotter hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/anishLearnsToCode/kotter/blob/v0.0.0/src\commands\hello.ts)_

## `kotter help [COMMAND]`

display help for kotter

```
USAGE
  $ kotter help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src\commands\help.ts)_
<!-- commandsstop -->
