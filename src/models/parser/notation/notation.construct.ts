import { Construct} from "../construct";
import { VariableExpression} from "../expression/variable.expression";
import { FunctionInvocationExpression} from "../expression/function-invocation.expression";
import { Scope} from "../scope/scope.construct";
import { ExpressionAttribute} from "../expression/expression.construct";


// todo create an attributeExpression type
export abstract class Notation<T> extends Construct {
  value: T;
  attribute: ExpressionAttribute;

  protected constructor(parent: Scope, value: T, attribute: ExpressionAttribute) {
    super();
    this.parentScope = parent;
    this.value = value;
    this.attribute = attribute;
  }
}
