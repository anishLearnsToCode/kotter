import { Construct } from "../construct";
import { Codeable } from "../../codeable";
import { Scope } from "../scope/scope.construct";
import { AnyExpression } from "../expression/any-expression.type";
import { AnyNotation } from "../notation/any-notation.type";

export declare type AssignmentExpressionValueType =
  AnyExpression |
  AnyNotation |
  AssignmentExpression |
  Scope;

export declare type AssignmentExpressionTargetType = AnyExpression;

export class AssignmentExpression extends Construct implements Codeable {
  target: AssignmentExpressionTargetType; // TODO add deconstructed expression support
  value: AssignmentExpressionValueType; // TODO add array index expression (AIE) support an also add function scope
  // todo and anonymous function support

  constructor (parentScope: Scope | null, target: AssignmentExpressionTargetType, value: AssignmentExpressionValueType) {
    super(parentScope);
    this.target = target;
    this.value = value;
  }

  code(): string {
    return this.target.code() + ' = ' + this.value.code();
  }
}
