import {Construct} from "../construct";

export class Scope extends Construct {
  private constructs: Array<Construct> = [];

  public static getGlobalScope() {
    return new Scope(null);
  }

  public constructor(parentScope: Scope | null) {
    super(parentScope);
  }
}
