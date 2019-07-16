import {Expression} from "./expression.construct";
import {Scope} from "../scope/scope.construct";
import {VariableExpression} from "./variable.expression";

export class FunctionInvocationExpression extends Expression {
  arguments: Array<VariableExpression> = [];

  constructor(parent: Scope, target: string, value: FunctionInvocationExpression | VariableExpression) {
    super(parent, target, value);
  }
}
