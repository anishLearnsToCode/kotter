import {Expression, ExpressionAttribute} from "./expression.construct";
import { Codeable } from "../../codeable";
import { AnyExpression } from "./any-expression.type";
import { Scope } from "../scope/scope.construct";
import {ObjectNotation} from "../notation/object.notation";


export declare type ArrayIndexExpressionTargeType = AnyExpression | ObjectNotation;

export class ArrayIndexExpression extends Expression<ArrayIndexExpressionTargeType> implements Codeable {
  public readonly index: number | AnyExpression ;

  constructor(parentScope: Scope, target: ArrayIndexExpressionTargeType, attribute: ExpressionAttribute,
              index: number | AnyExpression) {
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
