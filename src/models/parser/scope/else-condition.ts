import {ConditionalScope} from "./conditional.scope";
import {Codeable} from "../../codeable";
import {Scope} from "./scope.construct";
import {Construct} from "../construct";
import {ReservedKeywords} from "../../reserved-keywords.enum";


export class ElseCondition extends ConditionalScope implements Codeable {
  constructor(parent: Scope, body: Array<Construct>) {
    super(parent, body, '');
  }

  code(): string {
    return ReservedKeywords.ELSE_IF + super.code();
  }
}
