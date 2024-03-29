import {Expression, ExpressionAttribute} from "./expression.construct";
import {Scope} from "../scope/scope.construct";
import {Codeable} from "../../codeable";
import { FunctionArgument } from "../functionArgument";
import {AnyExpression} from "./any-expression.type";
import {FunctionScope} from "../scope/function.scope";
import { AnyNotation } from "../notation/any-notation.type";


export declare type FunctionInvocationExpressionTarget = AnyExpression | FunctionScope | AnyNotation ;


export class FunctionInvocationExpression extends Expression<FunctionInvocationExpressionTarget> implements Codeable {
  args: Array<FunctionArgument> = [];

  constructor(parent: Scope, target: FunctionInvocationExpressionTarget,
              attribute: ExpressionAttribute, args: Array<FunctionArgument>) {

    super(parent, target, attribute);
    this.args = args;
  }

  code(): string {
    return this.target.code() + ' '
      + '(' + this.representationOfArgs() + ')' +
      (this.attribute === null ? '' : '.' + this.attribute.code());
  }

  private representationOfArgs(): string {
    let args = '';
    for (const construct of this.args) {
      args += ',' + construct.code();
    }

    return args.substring(1);
  }
}
