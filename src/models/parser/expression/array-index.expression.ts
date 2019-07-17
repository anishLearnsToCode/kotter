import { Expression } from "./expression.construct";
import { FunctionInvocationExpression } from "./function-invocation.expression";
import { VariableExpression } from "./variable.expression";
import { GroupExpression } from "./group.expression";
import { Codeable } from "../../codeable";
import { AnyExpression } from "./any-expression.type";
import { Scope } from "../scope/scope.construct";

export class ArrayIndexExpression extends Expression<AnyExpression> implements Codeable {
  public readonly index: number | AnyExpression ;

  constructor(parentScope: Scope, target: AnyExpression,
              attribute: VariableExpression | FunctionInvocationExpression | null, index: number | AnyExpression) {
    super(parentScope, target, attribute);
    this.index = index;
  }

  code(): string {
    return this.target.code() + '[' + this.getIndexCode() + ']' +
    (this.attribute === null ? '' : '.' + this.attribute.code());
  }

  private getIndexCode(): string {
    return this.index === null ? '' :
      typeof this.index === 'number' ?
        this.index.toString() : this.index.code();
  }
}
