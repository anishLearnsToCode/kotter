import {Expression} from "./expression.construct";
import {Scope} from "../scope/scope.construct";
import {FunctionInvocationExpression} from "./function-invocation.expression";

export class VariableExpression extends Expression {
  constructor(parent: Scope, target: string, value: FunctionInvocationExpression | VariableExpression) {
    super(parent, target, value);
  }
}
