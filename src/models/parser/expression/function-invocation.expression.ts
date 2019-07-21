import {Expression, ExpressionAttribute} from "./expression.construct";
import {Scope} from "../scope/scope.construct";
import {Codeable} from "../../codeable";
import { FunctionArgument } from "../functionArgument";
import {AnyExpression} from "./any-expression.type";
import {FunctionScope} from "../scope/function.scope";


export declare type FunctionInvocationExpressionTarget = AnyExpression | FunctionScope;


export class FunctionInvocationExpression extends Expression<FunctionInvocationExpressionTarget> implements Codeable {
  args: Array<FunctionArgument> = [];

  constructor(parent: Scope, target: FunctionInvocationExpressionTarget,
              value: ExpressionAttribute, args: Array<FunctionArgument>) {

    super(parent, target, value);
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
