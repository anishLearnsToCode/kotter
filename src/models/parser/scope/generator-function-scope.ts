import {FunctionParameter, FunctionScope} from "./function.scope";
import {Codeable} from "../../codeable";
import {Scope} from "./scope.construct";
import {Construct} from "../construct";
import {ReservedKeywords} from "../../reserved-keywords.enum";
import {Bracket} from "../bracket.enum";
import {ClassScope} from "./class.scope";

export class GeneratorFunctionScope extends FunctionScope implements Codeable {
  name: string;

  constructor(parent: Scope, body: Array<Construct>, parameters: Array<FunctionParameter>, name: string) {
    super(parent, body, parameters);
    this.name = name;
  }

  code(): string {
    return this.parentScope instanceof ClassScope ? '' : ReservedKeywords.GENERATOR_FUNCTION
      + this.name + Bracket.LEFT_BRACE
      + super.representationOfParameters()
    + Bracket.RIGHT_BRACE
    + super.code();
  }
}
