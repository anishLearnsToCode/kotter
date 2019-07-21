import {Scope} from "./scope.construct";
import {Codeable} from "../../codeable";
import {Construct} from "../construct";
import {ReservedKeywords} from "../../reserved-keywords.enum";
import {Bracket} from "../bracket.enum";

export class CatchScope extends Scope implements Codeable {
  condition: string;

  constructor(parent: Scope, body: Array<Construct>, condition: string) {
    super(parent, body);
    this.condition = condition;
  }

  code(): string {
    return ReservedKeywords.CATCH + ' '
    + Bracket.LEFT_BRACE + this.condition + Bracket.RIGHT_BRACE
    + super.code();
  }
}
