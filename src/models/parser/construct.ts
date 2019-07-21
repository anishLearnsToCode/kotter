import {Scope} from "./scope/scope.construct";
import {Codeable} from "../codeable";

export abstract class Construct implements Codeable {
  parentScope: Scope | null | undefined;
  abstract code(): string ;

  protected constructor(parent: Scope) {
    this.parentScope = parent;
  }
}
