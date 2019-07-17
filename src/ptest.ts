import {VariableExpression} from "./models/parser/expression/variable.expression";
import {Scope} from "./models/parser/scope/scope.construct";
import {FunctionInvocationExpression} from "./models/parser/expression/function-invocation.expression";

const globalScope = Scope.getGlobalScope();

// Testing for Variable Expression (VE)
let variable = VariableExpression.parseFromForParent('anish.firstName', globalScope);
console.log(variable.code());

variable = VariableExpression.parseFromForParent('anish.father.firstName', globalScope);
console.log(variable.code());

variable = VariableExpression.parseFromForParent('anish.name()', globalScope);
console.log(variable.code());

// Testing for function Invocation Expression (FIE)
variable = FunctionInvocationExpression.parseFromForParent('foo(test,    anish)', globalScope);
console.log(variable.code());

variable = FunctionInvocationExpression.parseFromForParent('foo(test.rte,    anish.lastName)', globalScope);
console.log(variable.code());

variable = FunctionInvocationExpression.parseFromForParent('foo(test.rte(),    anish.lastName)', globalScope);
console.log(variable.code());

variable = FunctionInvocationExpression.parseFromForParent('foo(test.rte,    anish.lastName(age, t34))', globalScope);
console.log(variable.code());
