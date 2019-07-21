import {Notation} from "./notation.construct";
import {AnyExpression} from "../expression/any-expression.type";
import {AnyNotation} from "./any-notation.type";
import {FunctionDecelerationScope} from "../scope/function-deceleration-scope";
import {AnonymousFunctionScope} from "../scope/anonymous-function.scope";
import {Codeable} from "../../codeable";
import {ExpressionAttribute} from "../expression/expression.construct";
import {Scope} from "../scope/scope.construct";
import {Bracket} from "../bracket.enum";
import {Operator} from "../operator/operator.enum";
import {Delimiter} from "../delimiter.enum";


// todo add lambda expression and any notation
export declare type ObjectAttributeValue = AnyExpression | AnyNotation | FunctionDecelerationScope | AnonymousFunctionScope;
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
      code += Operator.COMMA + entry[0] + ' ' + Delimiter.COLON + ' ' + entry[1].code();
    }
    return code.substring(1);
  }
}
