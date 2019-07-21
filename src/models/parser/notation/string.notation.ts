import {Notation} from "./notation.construct";
import {Codeable} from "../../codeable";
import {Delimiter} from "../delimiter.enum";
import {Scope} from "../scope/scope.construct";
import {ExpressionAttribute} from "../expression/expression.construct";

export class StringNotation extends Notation<string> implements Codeable {
  literal: Delimiter.BACK_TICK | Delimiter.SINGLE_QUOTE | Delimiter.DOUBLE_QUOTE ;

  constructor(parent: Scope, value: string, attribute: ExpressionAttribute,
              literal: Delimiter.BACK_TICK | Delimiter.SINGLE_QUOTE | Delimiter.DOUBLE_QUOTE ) {
    super(parent, value, attribute);
    this.literal = literal;
  }

  code(): string {
    return this.literal + this.value + this.literal;
  }
}
