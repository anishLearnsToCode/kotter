import {Scope} from "./scope/scope.construct";
import {Codeable} from "../codeable";

export class Construct {
  private readonly parentScope: Scope | null;

  constructor(parentScope: Scope | null) {
    this.parentScope = parentScope;
  }
}
