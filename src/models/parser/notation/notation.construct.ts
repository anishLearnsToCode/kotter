import {Construct} from "../construct";
import {VariableExpression} from "../expression/variable.expression";
import {FunctionInvocationExpression} from "../expression/function-invocation.expression";
import {Scope} from "../scope/scope.construct";

export class Notation<T> extends Construct {
  value: T;
  attribute: VariableExpression | FunctionInvocationExpression | null;

  constructor(parent: Scope, value: T, attribue: VariableExpression | FunctionInvocationExpression | null) {
    super(parent);
    this.value = value;
    this.attribute = attribue;
  }
}
