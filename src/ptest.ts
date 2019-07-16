import {VariableExpression} from "./models/parser/expression/variable.expression";
import {Scope} from "./models/parser/scope/scope.construct";

const globalScope = Scope.getGlobalScope();
const variable = VariableExpression.parseFromForParent('anish.firstName', globalScope);
console.log(variable.code());
