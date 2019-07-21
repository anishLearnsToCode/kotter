import {Scope} from "./scope.construct";
import {Codeable} from "../../codeable";
import {VariableExpression} from "../expression/variable.expression";
import {AssignmentExpression} from "../instantiation/assignment-expression";
import {ReservedKeywords} from "../../reserved-keywords.enum";
import {FunctionParameter, FunctionScope} from "./function.scope";
import {Construct} from "../construct";
import {ClassScope} from "./class.scope";

// todo add DE


export class FunctionDecelerationScope extends FunctionScope implements Codeable {
  private readonly name: string;

  constructor(parent: Scope, body: Array<Construct>, parameters: Array<FunctionParameter>, name: string) {
    super(parent, body, parameters);
    this.name = name;
  }

  public code(): string {
    return (this.parentScope instanceof ClassScope ? '' : ReservedKeywords.FUNCTION ) + ' '
      + this.name + ' (' + this.representationOfParameters() + ') {' +
      super.code()
    + ' }';
  }
}
