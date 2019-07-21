import {Construct} from "../construct";
import {Codeable} from "../../codeable";
import {VariableExpression} from "./variable.expression";
import {Statement} from "../statement/statement.construct";
import {Scope} from "../scope/scope.construct";
import {Bracket} from "../bracket.enum";
import {Operator} from "../operator/operator.enum";

export class LambdaExpression extends Construct implements Codeable {
  parameters: Array<VariableExpression>;
  statement: Statement;

  constructor(parent: Scope, parameters: Array<VariableExpression>, statement: Statement) {
    super(parent);
    this.parameters = parameters;
    this.statement = statement;
  }

  code(): string {
    return Bracket.LEFT_BRACE + ' '
    + this.representationOfParameters() + ' '
    + Bracket.RIGHT_BRACE + ' '
    + Operator.LAMBDA + ' '
    + this.statement.code();
  }

  representationOfParameters(): string {
    let args = '';
    for (const parameter of this.parameters) {
      args += ',' + parameter.code();
    }

    return args.substring(1);
  }
}
