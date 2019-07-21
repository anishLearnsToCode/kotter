import {Construct} from "../construct";
import {Codeable} from "../../codeable";
import {ConditionalScope} from "../scope/conditional.scope";
import {Scope} from "../scope/scope.construct";
import {IfConditionalScope} from "../scope/if-conditional-scope";
import {ElseIfConditionalScope} from "../scope/else-if-conditional-scope";
import {ElseCondition} from "../scope/else-condition";
import {Block} from "./block.construct";

export class IfElseBlock extends Block<IfConditionalScope | ElseIfConditionalScope | ElseCondition> {
  constructor(parent: Scope, conditionalScopes: Array<ConditionalScope>) {
    super(parent, conditionalScopes);
  }
}
