import {Construct} from "../construct";
import {Codeable} from "../../codeable";
import {VariableExpression} from "./variable.expression";
import {Statement} from "../statement/statement.construct";
import {Scope} from "../scope/scope.construct";
import {Bracket} from "../bracket.enum";
import {Operator} from "../operator/operator.enum";
import {AssignmentExpression} from "../instantiation/assignment-expression";
import {AnyNotation} from "../notation/any-notation.type";
import {AnyExpression} from "./any-expression.type";
import {Delimiter} from "../delimiter.enum";

export class LambdaExpression extends Construct implements Codeable {
  parameters: Array<VariableExpression>;
  statement: Statement | AssignmentExpression | AnyNotation | AnyExpression ;

  constructor(parent: Scope, parameters: Array<VariableExpression>,
              statement: Statement | AssignmentExpression | AnyNotation | AnyExpression ) {
    super(parent);
    this.parameters = parameters;
    this.statement = statement;
  }

  code(): string {
    return Bracket.LEFT_BRACE + ' '
    + this.representationOfParameters() + ' '
    + Bracket.RIGHT_BRACE + ' '
    + Delimiter.LAMBDA + ' '
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
