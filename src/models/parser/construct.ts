import {Scope} from "./scope/scope.construct";
import {Codeable} from "../codeable";

export abstract class Construct implements Codeable {
  parentScope: Scope | null | undefined;

  protected constructor(parent: Scope | null) {
    this.parentScope = parent;
  }

  abstract code(withBrackets?: boolean): string ;
}

