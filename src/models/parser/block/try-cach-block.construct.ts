import {Construct} from "../construct";
import {Codeable} from "../../codeable";
import {TryScope} from "../scope/try.scope";
import {CatchScope} from "../scope/catch.scope";
import {Scope} from "../scope/scope.construct";
import {Block} from "./block.construct";

export class TryCatchBlock extends Block<TryScope | CatchScope> {
  constructor(parent: Scope, handlingScopes: Array<TryScope | CatchScope>) {
    super(parent, handlingScopes);
  }
}
