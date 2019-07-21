import {Notation} from "./notation.construct";
import {Codeable} from "../../codeable";
import {Scope} from "../scope/scope.construct";
import {ExpressionAttribute} from "../expression/expression.construct";

export class BigIntNotation extends Notation<BigInteger> implements Codeable {
  constructor(parent: Scope, value: BigInteger, attribute: ExpressionAttribute) {
    super(parent, value, attribute);
  }

  code(): string {
    return this.value.toString() + 'n';
  }
}
