import {ConditionalScope} from "./conditional.scope";
import {Codeable} from "../../codeable";
import {Scope} from "./scope.construct";
import {Construct} from "../construct";
import {ReservedKeywords} from "../../reserved-keywords.enum";
import {Bracket} from "../bracket.enum";

export class IfConditionalScope extends ConditionalScope implements Codeable {
  constructor(parent: Scope, body: Array<Construct>, condition: string) {
    super(parent, body, condition);
  }

  code(): string {
    return ReservedKeywords.IF + Bracket.LEFT_BRACE + this.condition + Bracket.RIGHT_BRACE +
      super.code();
  }
}
