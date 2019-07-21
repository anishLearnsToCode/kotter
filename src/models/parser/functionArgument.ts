import { AnyExpression } from "./expression/any-expression.type";
import { AnyNotation } from "./notation/any-notation.type";
import {FunctionScope} from "./scope/function.scope";
import {LambdaExpression} from "./expression/lambda-expression";

// todo we can also pass in any function declaration scope FS (FDS | AFS)
export declare type FunctionArgument = AnyNotation | AnyExpression | FunctionScope | LambdaExpression;
