import {Notation} from "./notation.construct";
import {AnyExpression} from "../expression/any-expression.type";
import {AnyNotation} from "./any-notation.type";
import {FunctionScope} from "../scope/function.scope";
import {AnonymousFunctionScope} from "../scope/anonymous-function.scope";
import {Codeable} from "../../codeable";
import {ExpressionAttribute} from "../expression/expression.construct";
import {Scope} from "../scope/scope.construct";


export declare type ObjectAttributeValue = AnyExpression | ObjectNotation | FunctionScope | AnonymousFunctionScope;
export declare type ObjectValue = Map<string, ObjectAttributeValue>;

export class ObjectNotation extends Notation<Map<string, ObjectAttributeValue>> implements Codeable {

  constructor(parent: Scope, value: ObjectValue, attribute: ExpressionAttribute) {
    super(parent, value, attribute);
  }

  code(): string {
    return "";
  }

}
