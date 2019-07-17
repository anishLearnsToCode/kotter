import {VariableExpression} from "./models/parser/expression/variable.expression";
import {Scope} from "./models/parser/scope/scope.construct";
import {FunctionInvocationExpression} from "./models/parser/expression/function-invocation.expression";
import { ParserService } from "./services/parser.service";
import { AnyExpression } from "./models/parser/expression/any-expression.type";
import { Construct } from "./models/parser/construct";
import { Expression } from "./models/parser/expression/expression.construct";

const globalScope = Scope.getGlobalScope();
const parser = ParserService.getService();

// let result = parser.fromAssignmentExpression('test = tst', globalScope);
// console.log(result);

// const result = parser.fromExpression('array[getNum()].attr.atr[0][10][10]', globalScope);
// console.log(result);
// console.log(result.code());

const result = parser.fromAssignmentExpression('a = 10', globalScope);
console.log(result);
