import {Scope} from "./scope.construct";
import {Construct} from "../construct";

export abstract class LoopScope extends Scope {
  statement: string;

  protected constructor(parent: Scope, body: Array<Construct>, statement: string) {
    super(parent, body);
    this.statement = statement;
  }
}
