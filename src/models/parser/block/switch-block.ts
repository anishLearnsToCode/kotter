import {Construct} from "../construct";
import {Codeable} from "../../codeable";
import {ConditionalScope} from "../scope/conditional.scope";
import {Scope} from "../scope/scope.construct";
import {Block} from "./block.construct";
import {CaseConditionalScope} from "../scope/CaseConditionalScope";
import {DefaultConditionalScope} from "../scope/default-conditional-scope";

export class SwitchBlock extends Block<CaseConditionalScope | DefaultConditionalScope> {
  constructor(parent: Scope, conditionalScopes: Array<CaseConditionalScope | DefaultConditionalScope>) {
    super(parent, conditionalScopes);
  }
}
