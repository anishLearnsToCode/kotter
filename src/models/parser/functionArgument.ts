import { AnyExpression } from "./expression/any-expression.type";
import { AnyNotation } from "./notation/any-notation.type";
import {FunctionScope} from "./scope/function.scope";
import {LambdaExpression} from "./expression/lambda-expression";
import {FunctionDeclarationScope} from "./scope/function-declaration-scope";
import {AnonymousFunctionScope} from "./scope/anonymous-function.scope";
import {Statement} from "./statement/statement.construct";

export declare type FunctionArgument =
  AnyNotation |
  AnyExpression |
  FunctionScope |
  LambdaExpression |
  Statement;
