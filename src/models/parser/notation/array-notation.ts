import {Notation} from "./notation.construct";
import {Codeable} from "../../codeable";
import {Scope} from "../scope/scope.construct";
import {Construct} from "../construct";
import {AnyExpression} from "../expression/any-expression.type";
import {AnyNotation} from "./any-notation.type";
import {ExpressionAttribute} from "../expression/expression.construct";
import {Bracket} from "../bracket.enum";
import {Delimiter} from "../delimiter.enum";
import {FunctionScope} from "../scope/function.scope";
import {Statement} from "../statement/statement.construct";

// todo add support for all statements that support rest and spread operators as wel like so [...args]
export declare type ArrayElement = AnyExpression | AnyNotation | FunctionScope ;

export class ArrayNotation extends Notation<Array<ArrayElement>>implements Codeable {
  constructor(parent: Scope, value: Array<ArrayElement>, attribute: ExpressionAttribute) {
    super(parent, value, attribute);
  }

  code(): string {
    return Bracket.LEFT_SQUARED + this.allElementsCode() + Bracket.RIGHT_SQUARED ;
  }

  private allElementsCode(): string {
    let code = '';
    for (const element of this.value) {
      code += Delimiter.COMMA + element.code();
    }

    return code.substring(1);
  }
}
