import {Construct} from "../construct";
import {Scope} from "../scope/scope.construct";
import {VariableExpression} from "./variable.expression";
import {FunctionInvocationExpression} from "./function-invocation.expression";

export declare type ExpressionAttribute = FunctionInvocationExpression | VariableExpression | null;

export class Expression<T> extends Construct {
  public target: T;
  public attribute: ExpressionAttribute;

  constructor(parentScope: Scope, target: T, attribute: ExpressionAttribute) {
    super(parentScope);
    this.target = target;
    this.attribute = attribute;
  }
}
