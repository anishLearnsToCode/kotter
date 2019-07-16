import {Construct} from "../construct";
import {Scope} from "../scope/scope.construct";
import {VariableExpression} from "./variable.expression";
import {FunctionInvocationExpression} from "./function-invocation.expression";

export class Expression extends Construct {
  public target: string;
  public attribute: VariableExpression | FunctionInvocationExpression | null;

  constructor(parentScope: Scope, target: string, attribute: VariableExpression | FunctionInvocationExpression | null) {
    super(parentScope);
    this.target = target;
    this.attribute = attribute;
  }
}
