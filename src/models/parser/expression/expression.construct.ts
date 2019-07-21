import {Construct} from "../construct";
import {Scope} from "../scope/scope.construct";
import {VariableExpression} from "./variable.expression";
import {FunctionInvocationExpression} from "./function-invocation.expression";
import {ArrayIndexExpression} from "./array-index.expression";

export declare type ExpressionAttribute = FunctionInvocationExpression | VariableExpression | ArrayIndexExpression | null;

export abstract class Expression<T> extends Construct {
  public target: T;
  public attribute: ExpressionAttribute;

  protected constructor(parentScope: Scope, target: T, attribute: ExpressionAttribute) {
    super(parentScope);
    this.target = target;
    this.attribute = attribute;
  }
}
