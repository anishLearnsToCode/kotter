import {Codeable} from "../../codeable";
import {Scope} from "./scope.construct";
import {Construct} from "../construct";
import {ReservedKeywords} from "../../reserved-keywords.enum";
import base = Mocha.reporters.base;

export class ClassScope extends Scope implements Codeable {
  name: string;
  baseClass: string;

  constructor(parent: Scope, body: Array<Construct>, name: string, baseClass: string) {
    super(parent, body);
    this.name = name;
    this.baseClass = baseClass;
  }

  code(): string {
    return ReservedKeywords.CLASS + ' ' + this.name + ' '
    + this.baseClass === null ? '' : ReservedKeywords.EXTENDS + ' ' + this.baseClass + ' '
    + super.code();
  }
}
