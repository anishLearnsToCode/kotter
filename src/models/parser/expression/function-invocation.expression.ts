import {Expression} from "./expression.construct";
import {Scope} from "../scope/scope.construct";
import {VariableExpression} from "./variable.expression";
import {Codeable} from "../../codeable";
import {ParserService} from "../../../services/parser.service";

export class FunctionInvocationExpression extends Expression implements Codeable {
  arguments: Array<VariableExpression> = []; // DE to be added later

  constructor(parent: Scope, target: string, value: FunctionInvocationExpression | VariableExpression | null) {
    super(parent, target, value);
  }

  code(): string {
    return 'i am func()';
  }

  public static parseFromForParent(code: string, parent: Scope): FunctionInvocationExpression {
    const parser = ParserService.getService();
    code = code.trim();

    if (parser.codeSnippetContainsAttribute(code)) {
      console.log(code);
    }

    const attribute = parser.getAttributeConstructFor(code, parent);

    return new FunctionInvocationExpression(parent, code.trim(), null);
  }
}
