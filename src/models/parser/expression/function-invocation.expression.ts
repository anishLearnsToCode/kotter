import {Expression} from "./expression.construct";
import {Scope} from "../scope/scope.construct";
import {VariableExpression} from "./variable.expression";
import {Codeable} from "../../codeable";
import {ParserService} from "../../../services/parser.service";

export class FunctionInvocationExpression extends Expression implements Codeable {
  args: Array<VariableExpression> = []; // DE to be added later

  constructor(parent: Scope, target: string, value: FunctionInvocationExpression | VariableExpression | null,
              args: Array<VariableExpression>) {
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

  public static parseFromForParent(code: string, parent: Scope): FunctionInvocationExpression {
    const parser = ParserService.getService();
    const target = parser.getFirstTokenName(code);
    const args = parser.getMethodArguments(code, parent);

    return new FunctionInvocationExpression(parent, target, parser.getAttributeConstructFor(code, parent), args);
  }
}
