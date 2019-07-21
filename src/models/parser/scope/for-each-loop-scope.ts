import {LoopScope} from "./loop.scope";
import {Codeable} from "../../codeable";
import {Scope} from "./scope.construct";
import {Construct} from "../construct";
import {ReservedKeywords} from "../../reserved-keywords.enum";
import {Bracket} from "../bracket.enum";

export class ForEachLoopScope extends LoopScope implements Codeable {
  constructor(parent: Scope, body: Array<Construct>, statement: string) {
    super(parent, body, statement);
  }

  code(): string {
    return ReservedKeywords.FOR + Bracket.LEFT_BRACE + this.statement + Bracket.RIGHT_BRACE +
      super.code();
  }
}
