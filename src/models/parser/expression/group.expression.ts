import { Expression } from "./expression.construct";
import { Scope } from "../scope/scope.construct";
import { VariableExpression } from "./variable.expression";
import { FunctionInvocationExpression } from "./function-invocation.expression";
import { Notation } from "../notation/notation.construct";
import { ArrayIndexExpression } from "./array-index.expression";
import { Codeable } from "../../codeable";

// also add support for assignment expression and ArrayIndexExpression
declare type GroupExpressionTargetType = Notation<any>| Scope | FunctionInvocationExpression |
  VariableExpression | GroupExpression | ArrayIndexExpression;

export class GroupExpression extends Expression<GroupExpressionTargetType> implements Codeable {
  constructor(parentScope: Scope, target: GroupExpressionTargetType, attribute: VariableExpression | FunctionInvocationExpression | null) {
    super(parentScope, target, attribute);
  }

  code(): string {
    return '(' + this.target.code() + ')' +
      (this.attribute === null ? '' : '.' + this.attribute.code());
  }
}