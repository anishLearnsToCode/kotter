import {Scope} from "./scope.construct";
import {FunctionParameter, FunctionScope} from "./function.scope";
import {Codeable} from "../../codeable";
import {Construct} from "../construct";
import {Bracket} from "../bracket.enum";
import {Delimiter} from "../delimiter.enum";

export class AnonymousFunctionScope extends FunctionScope implements Codeable {
  constructor(parent: Scope, body: Array<Construct>, parameters: Array<FunctionParameter>) {
    super(parent, body, parameters);
  }

  code(): string {
    return Bracket.LEFT_BRACE + ' '
      + this.representationOfParameters() + ' '
      + Bracket.RIGHT_BRACE + ' '
      + Delimiter.LAMBDA + ' '
      + super.code();
  }
}
