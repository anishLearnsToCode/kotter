import {Construct} from "../construct";
import {Codeable} from "../../codeable";
import {Scope} from "../scope/scope.construct";

export class Block<T extends Codeable> extends Construct implements Codeable {
  conditionalScopes: Array<T>;

  constructor(parent: Scope, conditionalScopes: Array<T>) {
    super(parent);
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
