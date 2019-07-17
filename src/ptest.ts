import {VariableExpression} from "./models/parser/expression/variable.expression";
import {Scope} from "./models/parser/scope/scope.construct";
import {FunctionInvocationExpression} from "./models/parser/expression/function-invocation.expression";
import { ParserService } from "./services/parser.service";
import { AnyExpression } from "./models/parser/expression/any-expression.type";
import { Construct } from "./models/parser/construct";
import { Expression } from "./models/parser/expression/expression.construct";

const globalScope = Scope.getGlobalScope();
const parser = ParserService.getService();

// // VE expression test
// let variable: AnyExpression = parser.fromVariableExpression('anish', globalScope);
// console.log(variable.code());
//
// variable = parser.fromVariableExpression('anish.firstName', globalScope);
// console.log(variable.code());
//
// variable = parser.fromVariableExpression('anish.father.son.age', globalScope);
// console.log(variable.code());


// // FIE test
// console.log('\n\n\n');
// variable = parser.fromFunctionInvocationExpression('foo()', globalScope);
// console.log(variable.code());
//
// variable = parser.fromFunctionInvocationExpression('foo(bar, bar2(bar, bar))', globalScope);
// console.log(variable.code());
//
// variable = parser.fromFunctionInvocationExpression('foo(bar, bar2(bar, bar)).test', globalScope);
// console.log(variable.code());

// Get partner brace position
let bracePosition = parser.getPartnerBracePosition('test(bar)', 4);
console.log('right brace', bracePosition, 'test(bar)'.charAt(bracePosition));

let expression = 'test("this is str", {})';
bracePosition = parser.getPartnerBracePosition(expression, 4);
console.log('right brace', bracePosition, expression.charAt(bracePosition));

// GE Expression test
// Group Expression
// variable = parser.fromGroupExpression('(test)', globalScope);
// console.log(variable);

// method getPartnerBracePosition(expression: string, startIndex: number)
// console.log(parser.getPartnerBracePosition('test()', 4));
