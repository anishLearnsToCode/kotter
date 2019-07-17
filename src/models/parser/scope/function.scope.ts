import {Scope} from "./scope.construct";
import {Codeable} from "../../codeable";
import {VariableExpression} from "../expression/variable.expression";
import {AssignmentExpression} from "../instantiation-expressions/assignment-expression";
import {ReservedKeywords} from "../../reserved-keywords.enum";

// todo add DE
export declare type FunctionParameter = VariableExpression | AssignmentExpression;

export class FunctionScope extends Scope implements Codeable {
  private readonly name: string;
  private parameters: Array<FunctionParameter>;

  constructor(parent: Scope, name: string, parameters: Array<FunctionParameter>) {
    super(parent);
    this.name = name;
    this.parameters = parameters;
  }

  public code(): string {
    return ReservedKeywords.FUNCTION + ' (' + this.representationOfParameters() + ') {' +
      super.code()
    + ' }';
  }

  private representationOfParameters(): string {
    let args = '';
    for (const parameter of this.parameters) {
      args += ',' + parameter.code();
    }
    return args.substring(1);
  }
}
