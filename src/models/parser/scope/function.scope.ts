import {Scope} from "./scope.construct";
import {VariableExpression} from "../expression/variable.expression";
import {AssignmentExpression} from "../instantiation/assignment-expression";
import {Construct} from "../construct";

// todo add deconstructed expression
export declare type FunctionParameter = VariableExpression | AssignmentExpression;

export abstract class FunctionScope extends Scope {
  readonly parameters: Array<FunctionParameter>;

  constructor(parent: Scope, body: Array<Construct>, parameters: Array<FunctionParameter>) {
    super(parent, body);
    this.parameters = parameters;
  }

  representationOfParameters(): string {
    let args = '';
    for (const parameter of this.parameters) {
      args += ',' + parameter.code();
    }
    return args.substring(1);
  }
}
