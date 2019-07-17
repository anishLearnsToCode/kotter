import {Expression} from "./expression.construct";
import {Scope} from "../scope/scope.construct";
import {VariableExpression} from "./variable.expression";
import {Codeable} from "../../codeable";
import {ParserService} from "../../../services/parser.service";
import { Parameter } from "../parameter";

export class FunctionInvocationExpression extends Expression<string> implements Codeable {
  args: Array<Parameter> = [];

  constructor(parent: Scope, target: string, value: FunctionInvocationExpression | VariableExpression | null,
              args: Array<Parameter>) {
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
