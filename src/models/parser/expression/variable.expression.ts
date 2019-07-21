import {Expression, ExpressionAttribute} from "./expression.construct";
import {Scope} from "../scope/scope.construct";
import {Codeable} from "../../codeable";

export class VariableExpression extends Expression<string> implements Codeable {

  constructor(parent: Scope, target: string, attribute: ExpressionAttribute) {
    super(parent, target, attribute);
  }

  public code(): string {
    return this.target + (this.attribute !== null ? '.' + this.attribute.code() : '' );
  }
}
