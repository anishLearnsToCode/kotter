import {Expression, ExpressionAttribute} from "./expression.construct";
import { Scope } from "../scope/scope.construct";
import { Codeable } from "../../codeable";
import { AnyNotation } from "../notation/any-notation.type";
import { AnyExpression } from "./any-expression.type";
import { AssignmentExpression } from "../instantiation/assignment-expression";
import { FunctionScope } from "../scope/function.scope";


export declare type GroupExpressionTargetType = AnyNotation | AnyExpression | FunctionScope | AssignmentExpression ;


export class GroupExpression extends Expression<GroupExpressionTargetType> implements Codeable {
  constructor(parentScope: Scope, target: GroupExpressionTargetType, attribute: ExpressionAttribute) {
    super(parentScope, target, attribute);
  }

  code(): string {
    return '(' + this.target.code() + ')' +
      (this.attribute === null ? '' : '.' + this.attribute.code());
  }
}
