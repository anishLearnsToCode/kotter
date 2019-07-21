import {Scope} from "./scope.construct";
import {FunctionParameter, FunctionScope} from "./function.scope";
import {Codeable} from "../../codeable";
import {Construct} from "../construct";
import {Operator} from "../operator/operator.enum";
import {Bracket} from "../bracket.enum";

export class AnonymousFunctionScope extends FunctionScope implements Codeable {
  constructor(parent: Scope, body: Array<Construct>, parameters: Array<FunctionParameter>, isScoped: boolean) {
    super(parent, body, parameters);
  }

  code(): string {
    return Bracket.LEFT_BRACE + ' '
      + this.representationOfParameters() + ' '
      + Bracket.RIGHT_BRACE + ' '
      + Operator.LAMBDA + ' '
      + super.code();
  }
}
