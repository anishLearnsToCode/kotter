import {Notation} from "./notation.construct";
import {Codeable} from "../../codeable";
import {Scope} from "../scope/scope.construct";
import {ExpressionAttribute} from "../expression/expression.construct";


export class RegexNotation extends Notation<RegExp> implements Codeable {
  constructor(parent: Scope, value: RegExp, attribute: ExpressionAttribute) {
    super(parent, value, attribute);
  }

  code(): string {
    return this.value + '';
  }
}
