import { Construct} from "../construct";
import { VariableExpression} from "../expression/variable.expression";
import { FunctionInvocationExpression} from "../expression/function-invocation.expression";
import { Scope} from "../scope/scope.construct";
import { Codeable } from "../../codeable";
import { ExpressionAttribute} from "../expression/expression.construct";

export class Notation<T> extends Construct {
  value: T;
  attribute: ExpressionAttribute;

  constructor(parent: Scope, value: T, attribue: VariableExpression | FunctionInvocationExpression | null) {
    super(parent);
    this.value = value;
    this.attribute = attribue;
  }
}
