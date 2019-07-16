import {Scope} from "./scope/scope.construct";

export class Construct {
  private readonly parentScope: Scope;

  constructor(parentScope: Scope) {
    this.parentScope = parentScope;
  }
}
