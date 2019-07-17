import {Notation} from "./notation.construct";
import {Scope} from "../scope/scope.construct";
import {VariableExpression} from "../expression/variable.expression";
import {FunctionInvocationExpression} from "../expression/function-invocation.expression";
import {Codeable} from "../../codeable";


export class StringNotation extends Notation<string> implements Codeable {
  constructor(parent: Scope, value: string, attribute: VariableExpression | FunctionInvocationExpression | null) {
    super(parent, value, attribute)
  }

  code(): string {
    return this.value;
  }
}
