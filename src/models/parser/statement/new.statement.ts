import {Statement} from "./statement.construct";
import {Codeable} from "../../codeable";
import {FunctionInvocationExpression} from "../expression/function-invocation.expression";
import {ArrayIndexExpression} from "../expression/array-index.expression";
import {AnyExpression} from "../expression/any-expression.type";
import {Scope} from "../scope/scope.construct";


/***
 * The new statement although technically will always be a Function Invocation Expression
 * can also be of the form new Person()[0].attr hence also a ArrayIndexExpression. Hence it has
 * been instantiated with AnyExpression type allowed so that we can simply parse it using the
 * fromExpression() method available to us
 */
export class NewStatement extends Statement<AnyExpression> implements Codeable {
  private readonly NEW = 'new';

  constructor(parent: Scope, value: AnyExpression) {
    super(parent, 'new', value);
  }

  code(): string {
    return this.NEW + ' ' + this.value.code();
  }
}
