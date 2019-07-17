import {Expression} from "./expression.construct";
import {Scope} from "../scope/scope.construct";
import {FunctionInvocationExpression} from "./function-invocation.expression";
import {Codeable} from "../../codeable";
import {ParserService} from "../../../services/parser.service";

export class VariableExpression extends Expression<string> implements Codeable {

  constructor(parent: Scope, target: string, attribute: FunctionInvocationExpression | VariableExpression | null) {
    super(parent, target, attribute);
  }

  public code(): string {
    return this.target + (this.attribute !== null ? '.' + this.attribute.code() : '' );
  }
}
