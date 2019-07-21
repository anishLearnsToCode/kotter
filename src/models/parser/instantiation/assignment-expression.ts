import { Construct } from "../construct";
import { Codeable } from "../../codeable";
import { Scope } from "../scope/scope.construct";
import { AnyExpression } from "../expression/any-expression.type";
import { AnyNotation } from "../notation/any-notation.type";
import {LambdaExpression} from "../expression/lambda-expression";
import {FunctionScope} from "../scope/function.scope";

export declare type AssignmentExpressionValueType =
  AnyExpression |
  AnyNotation |
  AssignmentExpression |
  FunctionScope |
  LambdaExpression;

// todo add deconstructed expresion in target
export declare type AssignmentExpressionTargetType = AnyExpression;

export class AssignmentExpression extends Construct implements Codeable {
  target: AssignmentExpressionTargetType;
  value: AssignmentExpressionValueType;

  constructor (parentScope: Scope | null, target: AssignmentExpressionTargetType, value: AssignmentExpressionValueType) {
    super();
    this.parentScope = parentScope;
    this.target = target;
    this.value = value;
  }

  code(): string {
    return this.target.code() + ' = ' + this.value.code();
  }
}
