import {Notation} from "./notation.construct";
import {Scope} from "../scope/scope.construct";
import {VariableExpression} from "../expression/variable.expression";
import {FunctionInvocationExpression} from "../expression/function-invocation.expression";
import {Codeable} from "../../codeable";
import {ParserService} from "../../../services/parser.service";

export class StringNotation extends Notation<string> implements Codeable {
  constructor(parent: Scope, value: string, attribute: VariableExpression | FunctionInvocationExpression | null) {
    super(parent, value, attribute)
  }

  code(): string {
    return this.value;
  }

  public static parseFromForParent(code: string, parent: Scope): VariableExpression {
    const parser = ParserService.getService();
    const attribute = parser.getAttributeConstructFor(code, parent);
    return new VariableExpression(parent, parser.getFirstTokenName(code), attribute);
  }
}
