import {Notation} from "./notation.construct";
import {AnyExpression} from "../expression/any-expression.type";
import {AnyNotation} from "./any-notation.type";
import {Codeable} from "../../codeable";
import {ExpressionAttribute} from "../expression/expression.construct";
import {Scope} from "../scope/scope.construct";
import {Bracket} from "../bracket.enum";
import {Delimiter} from "../delimiter.enum";
import {FunctionScope} from "../scope/function.scope";
import {LambdaExpression} from "../expression/lambda-expression";


export declare type ObjectAttributeValue = AnyExpression | AnyNotation | FunctionScope | LambdaExpression;
export declare type ObjectValue = Map<string, ObjectAttributeValue>;

export class ObjectNotation extends Notation<Map<string, ObjectAttributeValue>> implements Codeable {

  constructor(parent: Scope, value: ObjectValue, attribute: ExpressionAttribute) {
    super(parent, value, attribute);
  }

  code(): string {
    return Bracket.LEFT_CURLY_BRACE + this.objectBody() + Bracket.RIGHT_CURLY_BRACE;
  }

  private objectBody(): string {
    let code = '';
    for (const entry of this.value.entries()) {
      code += Delimiter.COMMA + entry[0] + ' ' + Delimiter.COLON + ' ' + entry[1].code();
    }
    return code.substring(1);
  }
}
