import {Construct} from "../construct";
import {Codeable} from "../../codeable";
import {TryScope} from "../scope/try.scope";
import {CatchScope} from "../scope/catch.scope";
import {Scope} from "../scope/scope.construct";

export class TryCatchBlock extends Construct implements Codeable {
  handlingScopes: Array<TryScope | CatchScope>;

  constructor(parent: Scope, handlingScopes: Array<TryScope | CatchScope>) {
    super();
    this.parentScope = parent;
    this.handlingScopes = handlingScopes;
  }

  code(): string {
    let code = '';
    for (const handlingScope of this.handlingScopes) {
      code += handlingScope.code();
    }

    return code;
  }

}
