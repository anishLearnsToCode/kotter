import {Scope} from "./scope.construct";
import {Codeable} from "../../codeable";
import {VariableExpression} from "../expression/variable.expression";
import {AssignmentExpression} from "../instantiation-expressions/assignment-expression";
import {ReservedKeywords} from "../../reserved-keywords.enum";

// todo add DE
export declare type FunctionArguments = VariableExpression | AssignmentExpression;

export class FunctionScope extends Scope implements Codeable {
  private readonly name: string;
  private args: Array<FunctionArguments>;

  constructor(parent: Scope, name: string, args: Array<FunctionArguments>) {
    super(parent);
    this.name = name;
    this.args = args;
  }

  public code(): string {
    return ReservedKeywords.FUNCTION + ' (' + this.representationOfArgs() + ') {' +
      super.code()
    + ' }';
  }

  private representationOfArgs(): string {
    let args = '';
    for (const argument of this.args) {
      args += ',' + argument.code();
    }
    return args.substring(1);
  }
}
