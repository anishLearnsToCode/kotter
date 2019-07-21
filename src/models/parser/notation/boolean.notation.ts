import {Notation} from "./notation.construct";
import {Codeable} from "../../codeable";
import {Scope} from "../scope/scope.construct";
import {ExpressionAttribute} from "../expression/expression.construct";

export class BooleanNotation extends Notation<boolean> implements Codeable {
  constructor(parent: Scope, value: boolean, attribute: ExpressionAttribute) {
    super(parent, value, attribute);
  }

  code(): string {
    return this.value + '';
  }
}
