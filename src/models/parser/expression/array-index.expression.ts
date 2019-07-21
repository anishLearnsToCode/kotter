import {Expression, ExpressionAttribute} from "./expression.construct";
import { Codeable } from "../../codeable";
import { AnyExpression } from "./any-expression.type";
import { Scope } from "../scope/scope.construct";
import {ObjectNotation} from "../notation/object.notation";
import {Statement} from "../statement/statement.construct";
import {NumberNotation} from "../notation/number.notation";
import {StringNotation} from "../notation/string.notation";


export declare type ArrayIndexExpressionTargetType = AnyExpression | ObjectNotation;
export declare type ArrayIndex = NumberNotation | StringNotation | AnyExpression | Statement ;

export class ArrayIndexExpression extends Expression<ArrayIndexExpressionTargetType> implements Codeable {
  public readonly index: ArrayIndex;

  constructor(parentScope: Scope, target: ArrayIndexExpressionTargetType, attribute: ExpressionAttribute,
              index: ArrayIndex) {
    super(parentScope, target, attribute);
    this.index = index;
  }

  code(): string {
    return this.target.code() + '[' + this.getIndexCode() + ']' +
    (this.attribute === null ? '' : '.' + this.attribute.code());
  }

  private getIndexCode(): string {
    return this.index.code();
  }
}
