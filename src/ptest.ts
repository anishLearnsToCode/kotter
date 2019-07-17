import {VariableExpression} from "./models/parser/expression/variable.expression";
import {Scope} from "./models/parser/scope/scope.construct";
import {FunctionInvocationExpression} from "./models/parser/expression/function-invocation.expression";
import { ParserService } from "./services/parser.service";

const globalScope = Scope.getGlobalScope();
const parser = ParserService.getService();

// // Testing for function Invocation Expression (FIE)
// variable = FunctionInvocationExpression.parseFromForParent('foo(test,    anish)', globalScope);
// console.log(variable.code());
//
// variable = FunctionInvocationExpression.parseFromForParent('foo(test.rte,    anish.lastName)', globalScope);
// console.log(variable.code());
//
// variable = FunctionInvocationExpression.parseFromForParent('foo(test.rte(),    anish.lastName)', globalScope);
// console.log(variable.code());
//
// variable = FunctionInvocationExpression.parseFromForParent('foo(test.rte,    anish.lastName(age, t34))', globalScope);
// console.log(variable.code());


// VE expression test
let variable = parser.fromVariableExpression('anish', globalScope);
console.log(variable.code());

variable = parser.fromVariableExpression('anish.firstName', globalScope);
console.log(variable.code());

variable = parser.fromVariableExpression('anish.father.son.age', globalScope);
console.log(variable.code());


// FIE test
console.log('\n\n\n\n');
variable = parser.fromFunctionInvocationExpression('foo(bar, bar2(bar, bar))', globalScope);
console.log(variable.code());

variable = parser.fromFunctionInvocationExpression('foo(bar, bar2(bar, bar)).test', globalScope);
console.log(variable.code());
