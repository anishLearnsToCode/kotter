import {DeconstructedExpression} from "./deconstructed-expression";
import {Codeable} from "../../codeable";
import {VariableExpression} from "../expression/variable.expression";
import {Pair} from "../../common/Pair";
import {StringNotation} from "../notation/string.notation";
import {Bracket} from "../bracket.enum";
import {Delimiter} from "../delimiter.enum";
import {PairCodeable} from "../../common/PairCodeable";
import {Scope} from "../scope/scope.construct";
import {AnyDeconstructedExpression} from "./any-deconstructed-expression.type";


export declare type ObjectDeconstructedElement =
  VariableExpression |
  PairCodeable<VariableExpression | StringNotation, VariableExpression | AnyDeconstructedExpression>;

export class ObjectDeconstructedExpression extends DeconstructedExpression<ObjectDeconstructedElement> implements Codeable {

  constructor(parent: Scope, elements: Array<ObjectDeconstructedElement>) {
    super(parent, elements);
  }

  code(): string {
    return Bracket.LEFT_CURLY_BRACE + Delimiter.WHITE_SPACE
    + this.elementsAsCode() + Delimiter.WHITE_SPACE
    + Bracket.RIGHT_CURLY_BRACE ;
  }
}
