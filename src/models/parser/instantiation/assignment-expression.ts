import { Construct } from "../construct";
import { Codeable } from "../../codeable";
import { Scope } from "../scope/scope.construct";
import { AnyExpression } from "../expression/any-expression.type";
import { AnyNotation } from "../notation/any-notation.type";
import {LambdaExpression} from "../expression/lambda-expression";
import {FunctionScope} from "../scope/function.scope";
import {AnyDeconstructedExpression} from "./any-deconstructed-expression.type";
import {AssignmentOperator} from "../operator/assignment-operator.enum";

export declare type AssignmentExpressionValueType =
  AnyExpression |
  AnyNotation |
  AssignmentExpression |
  FunctionScope |
  LambdaExpression;

export declare type AssignmentExpressionTargetType = AnyExpression | AnyDeconstructedExpression;


export class AssignmentExpression extends Construct implements Codeable {
  target: AssignmentExpressionTargetType;
  value: AssignmentExpressionValueType;
  assignmentOperator: AssignmentOperator;

  constructor (parentScope: Scope, target: AssignmentExpressionTargetType, value: AssignmentExpressionValueType,
               assignmentOperator: AssignmentOperator) {
    super(parentScope);
    this.target = target;
    this.value = value;
    this.assignmentOperator = assignmentOperator;
  }

  code(): string {
    return this.target.code() + ' = ' + this.value.code();
  }
}
