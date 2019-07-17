import { FunctionInvocationExpression } from "./function-invocation.expression";
import { VariableExpression } from "./variable.expression";
import { ArrayIndexExpression } from "./array-index.expression";
import { GroupExpression } from "./group.expression";

export declare type AnyExpression =
  FunctionInvocationExpression |
  VariableExpression |
  ArrayIndexExpression |
  GroupExpression ;
