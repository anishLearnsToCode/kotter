import {ConditionalScope} from "./conditional.scope";
import {Codeable} from "../../codeable";
import {Scope} from "./scope.construct";
import {Construct} from "../construct";
import {ReservedKeywords} from "../../reserved-keywords.enum";
import {Delimiter} from "../delimiter.enum";

export class DefaultConditionalScope extends ConditionalScope implements Codeable {
  constructor(parent: Scope, body: Array<Construct>, condition: string) {
    super(parent, body, condition);
  }

  code(): string {
    return ReservedKeywords.DEFAULT + Delimiter.WHITE_SPACE
    + Delimiter.COLON + super.code(false);
  }
}
