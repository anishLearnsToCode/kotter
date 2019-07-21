import {Construct} from "../construct";
import {Codeable} from "../../codeable";
import {ConditionalScope} from "../scope/conditional.scope";
import {Scope} from "../scope/scope.construct";

export class IfElseBlock extends Construct implements Codeable {
  conditionalScopes: Array<ConditionalScope>;

  constructor(parent: Scope, conditionalScopes: Array<ConditionalScope>) {
    super();
    this.parentScope = parent;
    this.conditionalScopes = conditionalScopes;
  }

  code(): string {
    let code = '';
    for (const conditionalScope of this.conditionalScopes) {
      code += conditionalScope.code();
    }

    return code;
  }
}
