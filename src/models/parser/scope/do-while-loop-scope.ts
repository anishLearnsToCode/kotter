import {LoopScope} from "./loop.scope";
import {Codeable} from "../../codeable";
import {Scope} from "./scope.construct";
import {Construct} from "../construct";
import {ReservedKeywords} from "../../reserved-keywords.enum";
import {Bracket} from "../bracket.enum";

export class DoWhileLoopScope extends LoopScope implements Codeable {
  constructor(parent: Scope, body: Array<Construct>, statement: string) {
    super(parent, body, statement);
  }

  code(): string {
    return ReservedKeywords.DO_WHILE +
      super.code() +
      ReservedKeywords.WHILE + Bracket.LEFT_BRACE + this.statement + Bracket.RIGHT_BRACE ;
  }
}
