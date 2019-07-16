import {Construct} from "../construct";

export class Scope extends Construct {
  private constructs: Array<Construct> = [];

  private constructor(parentScope: Scope) {
    super(parentScope);
  }
}
