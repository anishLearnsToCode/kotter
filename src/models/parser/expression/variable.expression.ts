import {Expression} from "./expression.construct";
import {Scope} from "../scope/scope.construct";
import {FunctionInvocationExpression} from "./function-invocation.expression";
import {Codeable} from "../../codeable";
import {CreatableFromString} from "../creatable-from-string";
import {ParserService} from "../../../services/parser.service";

export class VariableExpression extends Expression implements Codeable {
  private readonly parser: ParserService = ParserService.getService();

  private constructor(parent: Scope, target: string, attribute: FunctionInvocationExpression | VariableExpression | null) {
    super(parent, target, attribute);
  }

  public code(): string {
    console.log(this.target);
    if (this.attribute !== null) {
      console.log(this.attribute.code());
    }

    return this.target + (this.attribute !== null ? '.' + this.attribute.code() : '' );
  }

  public static parseFromForParent(code: string, parent: Scope): VariableExpression {
    const parser = ParserService.getService();
    code = code.trim();

    if (parser.codeSnippetContainsAttribute(code)) {
      console.log(code);
    }

    const attribute = parser.getAttributeConstructFor(code, parent);

    return new VariableExpression(parent, code.trim(), null);
  }
}
