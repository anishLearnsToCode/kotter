import {DeconstructedExpression} from "./deconstructed-expression";
import {Codeable} from "../../codeable";
import {VariableExpression} from "../expression/variable.expression";
import {Scope} from "../scope/scope.construct";
import {Bracket} from "../bracket.enum";
import {AnyDeconstructedExpression} from "./any-deconstructed-expression.type";

export class ArrayDeconstructedExpression extends DeconstructedExpression<VariableExpression | AnyDeconstructedExpression>
  implements Codeable {

  constructor(parent: Scope, elements: Array<VariableExpression | AnyDeconstructedExpression>) {
    super(parent, elements);
  }

  code(): string {
    return Bracket.LEFT_SQUARED
    + this.elementsAsCode()
    + Bracket.RIGHT_SQUARED ;
  }
}
