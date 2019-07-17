import {Expression} from "./expression.construct";
import {Scope} from "../scope/scope.construct";
import {VariableExpression} from "./variable.expression";
import {Codeable} from "../../codeable";
import {ParserService} from "../../../services/parser.service";
import { PassableArgumentsType } from "../passable-arguments.type";

export class FunctionInvocationExpression extends Expression<string> implements Codeable {
  args: Array<PassableArgumentsType> = [];

  constructor(parent: Scope, target: string, value: FunctionInvocationExpression | VariableExpression | null,
              args: Array<PassableArgumentsType>) {
    super(parent, target, value);
    this.args = args;
  }

  code(): string {
    return this.target + '(' + this.representationOfArgs() + ')' +
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
