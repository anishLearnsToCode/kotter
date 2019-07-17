import {Construct} from "../construct";
import {Scope} from "../scope/scope.construct";
import {VariableExpression} from "./variable.expression";
import {FunctionInvocationExpression} from "./function-invocation.expression";

export class Expression<T> extends Construct {
  public target: T;
  public attribute: FunctionInvocationExpression | VariableExpression | null;

  constructor(parentScope: Scope, target: T, attribute: FunctionInvocationExpression | VariableExpression | null) {
    super(parentScope);
    this.target = target;
    this.attribute = attribute;
  }
}
