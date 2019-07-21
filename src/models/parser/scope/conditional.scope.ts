import {Scope} from "./scope.construct";
import {Construct} from "../construct";

export abstract class ConditionalScope extends Scope {
  condition: string;

  protected constructor(parent: Scope, body: Array<Construct>, condition: string) {
    super(parent, body);
    this.condition = condition;
  }
}
