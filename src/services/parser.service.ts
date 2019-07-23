import { Delimiter } from "../models/parser/delimiter.enum";
import { FunctionInvocationExpression } from "../models/parser/expression/function-invocation.expression";
import { VariableExpression } from "../models/parser/expression/variable.expression";
import { Scope } from "../models/parser/scope/scope.construct";
import { Bracket } from "../models/parser/bracket.enum";
import { GroupExpression, GroupExpressionTargetType } from "../models/parser/expression/group.expression";
import { AnyExpression } from "../models/parser/expression/any-expression.type";
import { FunctionArgument } from "../models/parser/functionArgument";
import { AnyNotation } from "../models/parser/notation/any-notation.type";
import {
  AssignmentExpression,
  AssignmentExpressionTargetType,
  AssignmentExpressionValueType
} from "../models/parser/instantiation/assignment-expression";
import {
  ArrayIndex,
  ArrayIndexExpression,
  ArrayIndexExpressionTargetType
} from "../models/parser/expression/array-index.expression";
import { AnySymbol } from "../models/parser/symbol.type";
import { ObjectAttributeValue, ObjectNotation } from "../models/parser/notation/object.notation";
import { Pair } from "../models/common/Pair";
import { FunctionDeclarationScope } from "../models/parser/scope/function-declaration-scope";
import { AnonymousFunctionScope } from "../models/parser/scope/anonymous-function.scope";
import { ReservedKeywords } from "../models/reserved-keywords.enum";
import { ExpressionAttribute } from "../models/parser/expression/expression.construct";
import { StringNotation } from "../models/parser/notation/string.notation";
import { NumberNotation } from "../models/parser/notation/number.notation";
import { Statement } from "../models/parser/statement/statement.construct";
import { Operator } from "../models/parser/operator/operator.enum";
import { OperatorExpression } from "../models/parser/operator/operator.expression";
import { FunctionParameter, FunctionScope } from "../models/parser/scope/function.scope";
import { ArrayElement, ArrayNotation } from "../models/parser/notation/array-notation";
import { BooleanNotation } from "../models/parser/notation/boolean.notation";
import { LambdaExpression } from "../models/parser/expression/lambda-expression";
import { Construct } from "../models/parser/construct";
import { AnyDeconstructedExpression } from "../models/parser/instantiation/any-deconstructed-expression.type";
import { ArrayDeconstructedExpression } from "../models/parser/instantiation/array-deconstructed-expression";
import {
  ObjectDeconstructedElement,
  ObjectDeconstructedExpression
} from "../models/parser/instantiation/object-deconstructed-expression";
import { PairCodeable } from "../models/common/PairCodeable";
import { AssignmentOperator } from "../models/parser/operator/assignment-operator.enum";
import { GeneratorFunctionScope } from "../models/parser/scope/generator-function-scope";
import { IfElseBlock } from "../models/parser/block/if-else-block.construct";
import { ConditionalScope } from "../models/parser/scope/conditional.scope";
import { IfConditionalScope } from "../models/parser/scope/if-conditional-scope";
import { ElseIfConditionalScope } from "../models/parser/scope/else-if-conditional-scope";
import { ElseCondition } from "../models/parser/scope/else-condition";
import { DefaultConditionalScope } from "../models/parser/scope/default-conditional-scope";
import { CaseConditionalScope } from "../models/parser/scope/CaseConditionalScope";
import { SwitchBlock } from "../models/parser/block/switch-block";
import { TryCatchBlock } from "../models/parser/block/try-cach-block.construct";
import { TryScope } from "../models/parser/scope/try.scope";
import { CatchScope } from "../models/parser/scope/catch.scope";
import { ForLoop } from "../models/parser/scope/for.loop";
import { ForEachLoopScope } from "../models/parser/scope/for-each-loop-scope";
import { DoWhileLoopScope } from "../models/parser/scope/do-while-loop-scope";
import { WhileLoopScope } from "../models/parser/scope/while-loop-scope";
import { InstantiationExpression } from "../models/parser/instantiation/instantiation-expression.construct";
import { LoopScope } from "../models/parser/scope/loop.scope";
import { ClassScope } from "../models/parser/scope/class.scope";
import { ImportExportStatement } from "../models/parser/statement/import-export-statement";

export class ParserService {
  public static serviceInstance = new ParserService();

  public static getService(): ParserService {
    return this.serviceInstance;
  }

  public readonly BRACKETS: Set<String> = new Set<String>([
    Bracket.LEFT_CURLY_BRACE,
    Bracket.LEFT_BRACE,
    Bracket.LEFT_ANGLE,
    Bracket.LEFT_SQUARED,
    Bracket.RIGHT_ANGLE,
    Bracket.RIGHT_BRACE,
    Bracket.RIGHT_CURLY_BRACE,
    Bracket.RIGHT_SQUARED
  ]);

  public readonly SCOPE_OR_BLOCK_KEYWORDS = new Set([
    ReservedKeywords.ELSE,
    ReservedKeywords.IF,
    ReservedKeywords.ELSE_IF,
    ReservedKeywords.SWITCH,
    ReservedKeywords.TRY,
    ReservedKeywords.CATCH,
    ReservedKeywords.CLASS,
    ReservedKeywords.FOR,
    ReservedKeywords.WHILE,
    ReservedKeywords.DO_WHILE,
    ReservedKeywords.GENERATOR_FUNCTION,
    ReservedKeywords.FUNCTION
  ]);

  public readonly LEFT_BRACKETS: Set<String> = new Set<String>([
    Bracket.LEFT_CURLY_BRACE,
    Bracket.LEFT_BRACE,
    Bracket.LEFT_ANGLE,
    Bracket.LEFT_SQUARED
  ]);

  public readonly RIGHT_BRACKETS: Set<String> = new Set<String>([
    Bracket.RIGHT_ANGLE,
    Bracket.RIGHT_BRACE,
    Bracket.RIGHT_CURLY_BRACE,
    Bracket.RIGHT_SQUARED
  ]);

  public readonly NON_ARRAY_LEFT_BRACKETS: Set<String> = new Set<String>([
    Bracket.LEFT_CURLY_BRACE,
    Bracket.LEFT_BRACE,
    Bracket.LEFT_ANGLE
  ]);

  public readonly NON_ARRAY_RIGHT_BRACKETS: Set<String> = new Set<String>([
    Bracket.RIGHT_ANGLE,
    Bracket.RIGHT_BRACE,
    Bracket.RIGHT_CURLY_BRACE
  ]);

  public readonly STRING_LITERAL_DELIMITERS: Set<string> = new Set<string>([
    Delimiter.DOUBLE_QUOTE,
    Delimiter.SINGLE_QUOTE,
    Delimiter.BACK_TICK
  ]);

  public readonly OPERATORS = new Set<Operator>([
    Operator.INCREMENT,
    Operator.DECREMENT,
    Operator.DELETE,
    Operator.VOID,
    Operator.TYPEOF,
    Operator.BITWISE_NOT,
    Operator.LOGICAL_NOT,
    Operator.ADDITION,
    Operator.SUBTRACTION,
    Operator.DIVISION,
    Operator.MULTIPLICATION,
    Operator.REMAINDER,
    Operator.EXPONENTIAL,
    Operator.IN,
    Operator.INSTANCEOF,
    Operator.LESS_THAN,
    Operator.GREATER_THAN,
    Operator.LESS_THAN_EQUALS,
    Operator.GREATER_THAN_EQUALS,
    Operator.EQUALITY,
    Operator.INEQUALITY,
    Operator.IDENTITY,
    Operator.NON_IDENTITY,
    Operator.BITWISE_LEFT_SHIFT,
    Operator.BITWISE_RIGHT_SHIFT,
    Operator.BITWISE_UNSIGNED_RIGHT_SHIFT,
    Operator.BITWISE_AND,
    Operator.BITWISE_OR,
    Operator.BITWISE_XOR,
    Operator.LOGICAL_AND,
    Operator.LOGICAL_OR,
    Operator.CONDITIONAL_TERNARY_OPERATOR,
    Operator.ASSIGNMENT,
    Operator.ADDITION_ASSIGNMENT,
    Operator.MULTIPLICATION_ASSIGNMENT,
    Operator.SUBTRACTION_ASSIGNMENT,
    Operator.DIVISION_ASSIGNMENT,
    Operator.REMAINDER_ASSIGNMENT,
    Operator.LEFT_SHIFT_ASSIGNMENT,
    Operator.RIGHT_SHIFT_ASSIGNMENT,
    Operator.UNSIGNED_RIGHT_SHIFT_ASSIGNMENT,
    Operator.BITWISE_AND_ASSIGNMENT,
    Operator.BITWISE_OR_ASSIGNMENT,
    Operator.BITWISE_XOR_ASSIGNMENT,
    Operator.SPREAD
  ]);

  public ASSIGNMENT_OPERATORS = new Set<AssignmentOperator>([
    AssignmentOperator.ADDITION_ASSIGNMENT,
    AssignmentOperator.ASSIGNMENT,
    AssignmentOperator.BITWISE_AND_ASSIGNMENT,
    AssignmentOperator.BITWISE_OR_ASSIGNMENT,
    AssignmentOperator.MULTIPLICATION_ASSIGNMENT,
    AssignmentOperator.DIVISION_ASSIGNMENT,
    AssignmentOperator.SUBTRACTION_ASSIGNMENT,
    AssignmentOperator.REMAINDER_ASSIGNMENT,
    AssignmentOperator.LEFT_SHIFT_ASSIGNMENT,
    AssignmentOperator.UNSIGNED_RIGHT_SHIFT_ASSIGNMENT,
    AssignmentOperator.RIGHT_SHIFT_ASSIGNMENT,
    AssignmentOperator.BITWISE_XOR_ASSIGNMENT
  ]);

  public readonly BOOLEAN_VALUES = new Set<string>(["true", "false"]);

  public readonly DIGITS: Set<number> = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

  public readonly STATEMENT_TOKENS = new Set([
    ReservedKeywords.RETURN,
    ReservedKeywords.THROW,
    ReservedKeywords.IMPORT,
    ReservedKeywords.EXPORT
  ]);

  public readonly INSTANTIATION_KEYWORDS = new Set([
    ReservedKeywords.LET,
    ReservedKeywords.VAR,
    ReservedKeywords.CONST
  ]);

  public readonly CARRIAGE_RETURN: string = "\n";
  public readonly WHITE_SPACE: string = " ";

  /***
   * @param expression The expression to be parsed must not contain any /n/r new lien feed characters
   * and also must be trimmed. The expression can only contractually be a
   *  -- VariableExpression
   *  -- ArrayIndexExpression
   *  -- FunctionInvocationExpresion
   *  -- GroupExpression
   * @param parent The parent Scope of the expression
   * @return A valid Expression of above given types
   */
  public fromExpression(expression: string, parent: Scope): AnyExpression {
    const periodAttributeDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);

    if (periodAttributeDelimiterIndex !== -1) {
      const targetExpression = expression.substring(0, periodAttributeDelimiterIndex);
      const attributeExpression = expression.substring(periodAttributeDelimiterIndex + 1);
      const target = this.fromExpression(targetExpression, parent);
      target.attribute = this.fromExpressionAttribute(attributeExpression, parent);
      return target;
    }

    if (this.isArrayIndexExpression(expression)) {
      return this.fromArrayIndexExpression(expression, parent);
    }

    if (this.isGroupExpression(expression)) {
      return this.fromGroupExpression(expression, parent);
    }

    return this.fromFunctionInvocationOrVariableExpression(expression, parent);
  }

  /***
   * @param expression A expression that must have no \n\r new line characters and must also be trimmed
   * The expression can contractually only be of type ExpressionAttribute that must be a FIE | VE | AIE
   * @param parent The parent Scope of the expression
   */
  public fromExpressionAttribute(expression: string, parent: Scope): ExpressionAttribute {
    if(this.isArrayIndexExpression(expression)) {
      return this.fromArrayIndexExpression(expression, parent);
    }

    return this.fromFunctionInvocationOrVariableExpression(expression, parent);
  }

  /***
   * @param expression The expression string to be parsed that must not contain any newline /n/r
   * characters and must also be trimmed Any attribute present must also be trimmed and managed by the fromExpression()
   * method
   * @param parent The parent scope of the expression
   * @return The parsed ArrayIndexExpression object from valid code string
   */
  public fromArrayIndexExpression(expression: string, parent: Scope): ArrayIndexExpression {
    const periodDelimiterPosition = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);

    const leftSquareBracePosition = this.getLastSymbolPositionAtTopLevel(expression.substring(0, periodDelimiterPosition), Bracket.LEFT_SQUARED);
    const rightSquareBracePosition = this.getPartnerBracePosition(expression, leftSquareBracePosition);

    const targetExpression = expression.substring(0, leftSquareBracePosition).trim();
    const target: ArrayIndexExpressionTargetType = this.fromExpressionOrNotation(targetExpression, parent);

    const indexExpression = expression.substring(leftSquareBracePosition + 1, rightSquareBracePosition).trim();
    const index = this.fromArrayIndex(indexExpression, parent);

    const attributeExpression = expression.substring(periodDelimiterPosition + 1).trim();
    const attribute = this.fromExpressionAttribute(attributeExpression, parent);

    return new ArrayIndexExpression(parent, target, attribute, index);
  }

  /***
   * @param expression The expression that must be trimmed and not contain any \n\r new line
   * characters. Must also contractually by either number notation | String Notation | Any Expression
   * or Statement
   * @param parent The parent Scope of the Expression
   */
  public fromArrayIndex(expression: string, parent: Scope): ArrayIndex {
    if (this.isStringNotation(expression)) {
      return this.fromStringNotation(expression, parent);
    }

    if (this.isNumberNotation(expression)) {
      return this.fromNumberNotation(expression, parent);
    }

    return this.fromStatementOrExpressionOrNotationOrAssignmentOrInstantiation(expression, parent) as ArrayIndex;
  }
  
  public fromStatementOrExpressionOrNotationOrAssignmentElements(expressions: Array<string>, parent: Scope): 
    Array<Statement | AnyNotation | AnyExpression | InstantiationExpression> {
    
    const result = [];
    for (const expression of expressions) {
      result.push(this.fromStatementOrExpressionOrNotationOrAssignmentOrInstantiation(expression, parent));
    }
    return result;
  }

  public fromStatementOrExpressionOrNotationOrAssignmentOrInstantiation(expression: string, parent: Scope): Statement |
    AnyExpression | AssignmentExpression | AnyNotation | InstantiationExpression {

    const tokens = this.getTokensFromStatement(expression);
    if (this.hasInstantiationOperators(tokens)) {
      return this.fromInstantiationExpressionTokens(tokens, parent);
    }

    if (this.containsOperatorsOrStatementOperators(tokens)) {
      return this.fromStatement(tokens, parent);
    }

    return this.fromExpression(expression, parent);
  }

  public fromInstantiationExpressionTokens(tokens: Array<string>, parent: Scope): InstantiationExpression {
    // @ts-ignore
    const instantiationExpression = new InstantiationExpression(parent, [], this.fromInstantiationToken(tokens[0]));
    const instantiationExpressions: Array<string> = this.getCommaSeparatedConstructsFromTokens(tokens.slice(1));
    const result: Array<VariableExpression | AssignmentExpression> = [];
    for (const expression of instantiationExpressions) {
      if (this.isAssignmentExpression(expression)) {
        result.push(this.fromAssignmentExpression(expression, parent));
      } else {
        result.push(this.fromVariableExpression(expression, parent));
      }
    }

    instantiationExpression.instantiations = result;
    return instantiationExpression;
  }

  public fromInstantiationToken(expression: string): ReservedKeywords.LET | ReservedKeywords.CONST |
    ReservedKeywords.VAR | null {
    switch (expression) {
      case ReservedKeywords.LET: return ReservedKeywords.LET;
      case ReservedKeywords.VAR: return ReservedKeywords.VAR;
      case ReservedKeywords.CONST: return ReservedKeywords.CONST;
    }

    return null;
  }

  public hasInstantiationOperators(tokens: Array<string>): boolean {
    for (const token of tokens) {
      if (this.isInstantiationKeyword(token)) {
        return true;
      }
    }

    return false;
  }

  public isInstantiationKeyword(expression: string): boolean {
    return this.INSTANTIATION_KEYWORDS.has(expression as ReservedKeywords);
  }

  public containsOperatorsOrStatementOperators(tokens: Array<string>): boolean {
    return this.tokensContainsOperator(tokens) ||
      this.tokensContainsStatementOperators(tokens);
  }

  public tokensContainsStatementOperators(tokens: Array<string>): boolean {
    for (const token of tokens) {
      if (this.isStatementOperator(token)) {
        return true;
      }
    }

    return false;
  }

  public isStatementOperator (token: string): boolean {
    return this.STATEMENT_TOKENS.has(token as ReservedKeywords);
  }

  /***
   * @param tokens An Array of code tokens that do not contain ant \n\r newline characters but may have spaces
   * @param parent
   */
  public fromStatement(tokens: Array<string>, parent: Scope): Statement | AssignmentExpression | AnyNotation | AnyExpression {
    tokens = this.condenseTokens(tokens);

    if (tokens.length < 2) {
      return this.fromExpressionOrNotation(tokens[0], parent);
    }

    const operators: Array<string> = this.getOperators(tokens);
    if (operators.length === 1 && operators[0] === Operator.EQUALITY) {
      return this.fromAssignmentExpressionTokens(tokens, parent);
    }

    const resultTokens: Array<AnyExpression | AnyNotation | OperatorExpression> = [];
    for (const token of tokens) {
       if (this.isOperator(token)) {
         resultTokens.push(new OperatorExpression(token as Operator));
       }

       resultTokens.push(this.fromExpressionOrNotation(token, parent));
    }

    return new Statement(parent, resultTokens);
  }

  public getOperators(tokens: Array<string>): Array<string> {
    const result: Array<string> = [];
    for (const token of tokens) {
      if (this.isOperator(token)) {
        result.push(token);
      }
    }

    return result;
  }

  public condenseTokens(tokens: Array<string>): Array<string> {
    const result: Array<string> = [];
    let currentOperator = null;
    for (const token of tokens) {
      if (this.isOperator(token)) {
        if (!currentOperator) {
          currentOperator = token;
          continue;
        }

        if (this.isOperator(currentOperator + token)) {
          currentOperator += token;
        } else {
          result.push(currentOperator, token);
          currentOperator = null;
        }
      } else {
        if (currentOperator) {
          result.push(currentOperator);
          currentOperator = null;
        }
        result.push(token);
      }
    }

    return result;
  }

  public tokensContainsOperator(tokens: string[]): boolean {
    for (const token of tokens) {
      if (this.isOperator(token)) {
        return true;
      }
    }

    return false;
  }

  public getTokensFromStatement(expression: string): Array<string> {
    const tokens: Array<string> = [];
    let index = 0, lastIndex = 0;
    for (let bracketStack = 0, insideString = false ; index < expression.length ; index++) {
      const character = expression.charAt(index);

      if (insideString) {
        if (this.isStringLiteral(character)) {
          insideString = false;
          continue;
        }

        if (character === Delimiter.BACK_SLASH) {
          index++;
          continue;
        }
      }

      if (this.isStringLiteral(character)) {
        insideString = true;
        continue;
      }

      if (this.isLeftBracket(character)) {
        bracketStack++;
        continue;
      }

      if (this.isRightBracket(character)) {
        bracketStack--;
        continue;
      }

      if (this.isOperator(character)) {
        tokens.push(expression.substring(lastIndex, index));
        tokens.push(expression.substr(index, 1));
        lastIndex = index + 1;
      }
    }

    if (lastIndex != index) {
      tokens.push(expression.substring(lastIndex, index));
    }

    return tokens;
  }

  public isStringLiteral(character: string): boolean {
    return this.STRING_LITERAL_DELIMITERS.has(character);
  }

  public isStringNotation (expression: string): boolean {
    return this.STRING_LITERAL_DELIMITERS.has(expression.charAt(0));
  }

  public isNumberNotation(expression: string): boolean {
    // @ts-ignore
    return !isNaN(expression.charAt(0));
  }

  public fromNumberNotation(expression: string, parent: Scope): NumberNotation {
    const lastDigitIndex = this.getLastDigitIndexInNumber(expression);
    const attributeExpression = expression.substring(lastDigitIndex + 2).trim();
    const attribute = attributeExpression === "" ?
      null : this.fromExpressionAttribute(attributeExpression, parent);
    const number = +expression.substring(0, lastDigitIndex + 1).trim();

    return new NumberNotation(parent, number, attribute);
  }

  public getLastDigitIndexInNumber(expression: string): number {
    let index = 0, hasEncounteredPeriod = false;

    for( ; index < expression.length ; index++) {
      if (expression.charAt(index) === Delimiter.PERIOD) {
        if (hasEncounteredPeriod) {
          return index;
        } else {
          if (!this.isDigit(expression.charAt(index + 1))) {
            return index;
          }

          hasEncounteredPeriod = true;
        }
      }
    }

    return -1;
  }

  public isDigit(expression: string): boolean {
    return this.DIGITS.has(+expression);
  }

  /***
   * @param expression must be trimmed and not contain any \n\r linefeeds.
   * @param parent The parent scope of the expression
   */
  public fromStringNotation(expression: string, parent: Scope): StringNotation {
    // @ts-ignore
    const delimiter: Delimiter.DOUBLE_QUOTE | Delimiter.SINGLE_QUOTE | Delimiter.BACK_TICK = expression.charAt(0);
    const partnerDelimiterIndex = this.getPartnerLiteral(expression, 0);

    const attributeExpression = expression.substring(partnerDelimiterIndex + 2).trim();
    const attribute = attributeExpression === "" ?
      null : this.fromExpressionAttribute(attributeExpression, parent);

    return new StringNotation(parent, expression.substring(1, partnerDelimiterIndex), attribute, delimiter);
  }

  public isGroupExpression(expression: string): boolean {
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    if (periodDelimiterIndex === -1) {
      return expression.charAt(expression.length - 1) === Bracket.RIGHT_BRACE &&
        expression.charAt(0) === Bracket.LEFT_BRACE ;
    }

    return this.isGroupExpression(expression.substring(0, periodDelimiterIndex).trim());
  }

  public isArrayIndexExpression(expression: string): boolean {
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    if (periodDelimiterIndex === -1) {
      return expression.charAt(expression.length - 1) === Bracket.RIGHT_SQUARED ;
    }

    return this.isArrayIndexExpression(expression.substring(0, periodDelimiterIndex).trim());
  }

  /***
   * @param expression is present inside code in a () bracket style and must be
   * either an Expression (VE, FIE, GE or AIE) or Notation or Assignment Expression (AE)
   * @param parent The parent Scope of the construct
   */
  public fromGroupExpression(expression: string, parent: Scope): GroupExpression {
    expression = expression.trim();
    const rightBracketPosition = this.getPartnerBracePosition(expression, 0);
    const codeInsideBrackets = expression.substring(1, rightBracketPosition).trim();
    const attributeExpression = expression.substr(rightBracketPosition + 2).trim();
    const attribute = attributeExpression === "" ?
      null : this.fromFunctionInvocationOrVariableExpression(attributeExpression, parent);

    return new GroupExpression(
      parent,
      this.fromExpressionOrNotationOrFunctionScopeOrLambdaOrAssignment(codeInsideBrackets, parent) as GroupExpressionTargetType,
      attribute
    );
  }

  public fromNotationOrExpressionOrAssignmentExpression(expression: string, parent: Scope): GroupExpressionTargetType {
    if (this.isAssignmentExpression(expression)) {
      return this.fromAssignmentExpression(expression, parent);
    }

    return this.fromExpressionOrNotation(expression, parent);
  }

  public isAssignmentExpression(expression: string): boolean {
    return this.getFirstSymbolPositionAtTopLevel(expression,Operator.EQUALITY) !== -1;
  }

  /***
   *
   * @param expression The expression has to contractually conform to the form
   * target = value where target can be of type any Expression or a deconstructed
   * expression and the value can be any expression, notation and also another
   * assignment expression. It can also be a function scope or anonymous function scope
   * @param parent The parent scope
   */
  // public fromAssignmentExpression(expression: string, parent: Scope): AssignmentExpression {
  //   const equalsSymbolPosition = this.getFirstSymbolPositionAtTopLevel(expression, Symbol.EQUAL);
  //
  //   const targetExpression = expression.substring(0, equalsSymbolPosition).trim();
  //   const target: AssignmentExpressionTargetType = this.fromExpression(targetExpression, parent);
  //
  //   const valueExpression = expression.substring(equalsSymbolPosition + 1).trim();
  //   const value: AssignmentExpressionValueType = this.fromNotationOrExpressionOrAssignmentExpression(valueExpression, parent);
  //
  //   return new AssignmentExpression(parent, target, value);
  // }

  /***
   *
   * @param tokens The string tokens received here must be exactly 3 in number one target expression,
   * one EQUALS delimiter operator token (or some other assignment type operator) and one value expression
   * @param parent The parent scope of the expression
   */
  public fromAssignmentExpressionTokens(tokens: Array<string>, parent: Scope): AssignmentExpression {
    const target = this.fromExpressionOrDeconstructedExpression(tokens[0], parent);
    const assignmentOperator = tokens[1] as AssignmentOperator;
    const value = this.fromExpressionOrNotationOrFunctionScopeOrLambdaOrAssignment(tokens[2], parent);
    return new AssignmentExpression(parent, target, value, assignmentOperator);
  }

  public getAllPositionsAtTopLevel(expression: string, symbol: AnySymbol): Array<number> {
    const result: Array<number> = [];
    const firstSymbolIndex = this.getFirstSymbolPositionAtTopLevel(expression, symbol);
    result.push(
      firstSymbolIndex,
      ...this.getAllPositionsAtTopLevel(expression.substring(firstSymbolIndex + 1).trim(), symbol)
    );
    return result;
  }

  public getFirstSymbolPositionAtTopLevel(expression: string, symbol: AnySymbol): number {
    let expectedStack = 0;
    if (this.isBracket(symbol)) {
      expectedStack = this.isRightBracket(symbol) ? -1 : 1;
    }
    for (let bracketStack = 0, stringLiteralChar = null, index = 0 ; index < expression.length ; index++) {
      const character = expression.charAt(index);

      if (stringLiteralChar) {
        if (character === Delimiter.BACK_SLASH) {
          index++;
          continue;
        }

        if (character === stringLiteralChar) {
          stringLiteralChar = null;
        }

        continue;
      }

      if (this.isStringLiteral(character)) {
        stringLiteralChar = character;
        continue;
      }

      if (this.isLeftBracket(character)) {
        bracketStack++;
      }

      if(this.isRightBracket(character)) {
        bracketStack--;
      }

      if (bracketStack === expectedStack && character === symbol) {
        return  index;
      }
    }

    return -1;
  }

  /***
   * @param expression
   * @param symbol
   */
  public getLastSymbolPositionAtTopLevel(expression: string, symbol: AnySymbol): number {
    let expectedStack = 0;
    if (this.isBracket(symbol)) {
      expectedStack = this.isRightBracket(symbol) ? -1 : 1;
    }

    for (let stringLiteralChar = null, bracketStack = 0, index = expression.length - 1; index >= 0 ; index--) {
      const character = expression.charAt(index);

      if (stringLiteralChar) {
        if (character === Delimiter.BACK_SLASH) {
          index++;
          continue;
        }

        if (character === stringLiteralChar) {
          stringLiteralChar = null;
        }

        continue;
      }

      if (this.isStringLiteral(character)) {
        stringLiteralChar = character;
        continue;
      }

      if (this.isLeftBracket(character)) {
        bracketStack++;
      }

      if(this.isRightBracket(character)) {
        bracketStack--;
      }

      if (bracketStack === expectedStack && character === symbol) {
        return  index;
      }
    }

    return -1;
  }

  public getLastSymbolPositionAtTopLevelAfter(expression: string, symbol: AnySymbol, startIndex: number): number {
    for (let stringLiteralChar = null, bracketStack = 0, index = expression.length - 1; index >= startIndex ; index--) {
      const character = expression.charAt(index);

      if (stringLiteralChar) {
        if (character === Delimiter.BACK_SLASH) {
          index++;
          continue;
        }

        if (character === stringLiteralChar) {
          stringLiteralChar = null;
        }

        continue;
      }

      if (this.isStringLiteral(character)) {
        stringLiteralChar = character;
        continue;
      }

      if (this.isLeftBracket(character)) {
        bracketStack++;
      }

      if(this.isRightBracket(character)) {
        bracketStack--;
      }

      if (bracketStack === 0 && character === symbol) {
        return  index;
      }
    }

    return -1;
  }

  /***
   * @param expression The code expression to parse which contractually must be
   * a variable expression and can have an attribute as either FIE or VE
   * @param parent The parent scope that contains this expression
   */
  public fromVariableExpression(expression: string, parent: Scope): VariableExpression {
    expression = expression.trim();
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    const target = expression.substring(0, periodDelimiterIndex).trim();
    const attributeExpression = expression.substring(periodDelimiterIndex + 1);
    const attribute = attributeExpression !== "" ?
      this.fromExpressionAttribute(attributeExpression, parent) : null;

    return new VariableExpression(parent, target, attribute);
  }


  public fromObjectNotation(expression: string, parent: Scope): ObjectNotation {
    let attributeExpression = null, targetExpression = expression;
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    if (periodDelimiterIndex !== -1) {
      targetExpression = expression.substring(0, periodDelimiterIndex).trim();
      attributeExpression = expression.substring(periodDelimiterIndex + 1).trim();
    }

    const body = targetExpression.substring(0, targetExpression.length - 1);
    const commaSeparatedConstructs: Array<string> = this.getCommaSeparatedConstructs(body);
    const objectValue = this.getObjectValue(commaSeparatedConstructs, parent);
    const attribute = attributeExpression ?
      this.fromExpressionAttribute(attributeExpression, parent) : null ;

    return new ObjectNotation(parent, objectValue, attribute);
  }

  public getObjectValue(pairs: Array<string>, parent: Scope): Map<string, ObjectAttributeValue> {
    const result: Map<string, ObjectAttributeValue> = new Map();
    for (const pair of pairs) {
      const keyValuePair = this.getObjectKeyValuePairFrom(pair, parent);
      result.set(keyValuePair.getKey(), keyValuePair.getValue());
    }

    return result;
  }

  public getObjectKeyValuePairFrom(pair: string, parent: Scope): Pair<string, ObjectAttributeValue> {
    const semiColonPosition = this.getFirstSymbolPositionAtTopLevel(pair, Delimiter.COLON);
    const key = pair.substring(0, semiColonPosition).trim();
    const valueExpression = pair.substring(semiColonPosition + 1).trim();
    const value = this.fromExpressionOrNotationOrFunctionScopeOrLambda(valueExpression, parent);

    return new Pair(key, value);
  }

  public fromExpressionOrNotationOrFunctionScopeOrLambda(expression: string, parent: Scope): FunctionScope | 
    AnyExpression | AnyNotation | LambdaExpression {
    
    if (this.isLambdaExpression(expression)) {
      return this.fromLambdaExpression(expression, parent);
    }
    
    return this.fromExpressionOrNotationOrFunctionScope(expression, parent);
  }

  public fromLambdaExpression(expression: string, parent: Scope): LambdaExpression {
    const lambdaOperatorIndex = this.getFirstSymbolPositionAtTopLevel(expression, Operator.EQUALITY);
    const parametersExpression = expression.substring(0, lambdaOperatorIndex).trim();
    const commaSeparatedParameters = parametersExpression.charAt(0) === Bracket.LEFT_BRACE ?
      parametersExpression.substring(1, parametersExpression.length - 1) : parametersExpression;
    const parametersList = this.getCommaSeparatedConstructs(commaSeparatedParameters);
    const parameters: Array<VariableExpression> = this.fromVariableExpressionElements(parametersList, parent);
    const statementExpression = expression.substring(lambdaOperatorIndex + 2);
    const statement = this.fromStatementOrExpressionOrNotationOrAssignmentOrInstantiation(statementExpression, parent);

    return new LambdaExpression(parent, parameters, statement);
  }

  public fromVariableExpressionElements(parameters: Array<string>, parent: Scope): Array<VariableExpression> {
    const result: Array<VariableExpression> = [];
    for (const parameter of parameters) {
      result.push(this.fromVariableExpression(parameter, parent));
    }
    return result;
  }

  public isLambdaExpression(expression: string): boolean {
    const equalsDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Operator.EQUALITY);
    if (equalsDelimiterIndex !== -1 && expression.charAt(equalsDelimiterIndex + 1) === Operator.GREATER_THAN) {
      for (let index = equalsDelimiterIndex + 2 ; index < expression.length ; index++) {
        const character = expression.charAt(index);
        if (character === Bracket.LEFT_CURLY_BRACE) {
          return false;
        }
        if (character !== " ") {
          break;
        }
      }
      return true;
    }

    return false;
  }

  public fromExpressionOrNotationOrFunctionScope(expression: string, parent: Scope): AnyExpression | AnyNotation | FunctionScope {
    if (this.isAnyFunctionScope(expression)) {
      return this.fromAnyFunctionScope(expression, parent);
    }

    return this.fromExpressionOrNotation(expression, parent);
  }

  public isAnyFunctionScope(expression: string): boolean {
    return this.isFunctionOrGeneratorFunction(expression)
      || this.isAnonymousFunction(expression);
  }

  public isFunctionOrGeneratorFunction(expression: string): boolean {
    return expression.substring(0, ReservedKeywords.FUNCTION.length) === ReservedKeywords.FUNCTION;
  }

  public isAnonymousFunction(expression: string): boolean {
    const equalsDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Operator.EQUALITY);
    if (equalsDelimiterIndex !== -1 && expression.charAt(equalsDelimiterIndex + 1) === Operator.GREATER_THAN) {
      for (let index = equalsDelimiterIndex + 2 ; index < expression.length ; index++) {
        const character = expression.charAt(index);
        if (character === Bracket.LEFT_CURLY_BRACE) {
          return true;
        }
        if (character !== this.WHITE_SPACE) {
          break;
        }
      }
      return false;
    }

    return false;
  }

  public fromAnyFunctionScope(expression: string, parent: Scope): FunctionScope {
    if (this.isFunctionOrGeneratorFunction(expression)) {
      return this.fromFunctionScope(expression, parent);
    }

    return this.fromAnonymousFunctionScope(expression, parent);
  }

  public fromFunctionScope(expression: string, parent: Scope): FunctionScope {
    if (this.isFunctionOrGeneratorFunction(expression)) {
      return <FunctionScope>this.fromFunctionOrGeneratorFunctionScope(expression, parent);
    }

    return this.fromAnonymousFunctionScope(expression, parent);
  }

  public fromFunctionOrGeneratorFunctionScope(expression: string, parent: Scope): FunctionDeclarationScope | GeneratorFunctionScope {
    if (expression.charAt(ReservedKeywords.FUNCTION.length) === Operator.MULTIPLICATION) {
      return this.fromGeneratorFunctionScope(expression, parent);
    }

    return this.fromFunctionDeclarationScope(expression, parent);
  }

  public fromFunctionDeclarationScope(expression: string, parent: Scope): FunctionDeclarationScope {
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_BRACE);
    const rightBraceIndex = this.getPartnerBracePosition(expression, leftBraceIndex);
    const name = expression.substring(ReservedKeywords.FUNCTION.length, leftBraceIndex).trim();
    const commaSeparatedParameters = expression.substring(leftBraceIndex + 1, rightBraceIndex).trim();
    const parametersList = this.getCommaSeparatedConstructs(commaSeparatedParameters);
    const parameters = this.getParameters(parametersList, parent);
    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getPartnerBracePosition(expression, leftCurlyBraceIndex);
    const functionScope = new FunctionDeclarationScope(parent, [], parameters, name);
    const bodyExpression = expression.substring(leftCurlyBraceIndex + 1, rightCurlyBraceIndex).trim();
    functionScope.body = this.fromScopeBody(bodyExpression, functionScope);

    return functionScope;
  }

  public fromScopeBody(expression: string, parent: Scope): Array<Construct> {
    const constructs: Array<Construct> = [];
    for (let index = 0; index < expression.length; index++) {
      const token = this.getFirstWord(expression, index);

      if (this.isScopeOrBlockKeyword(token)) {
        switch (token) {
          case ReservedKeywords.IMPORT:
          case ReservedKeywords.EXPORT:
            const importStatementData = this.parseFromImportStatement(expression, index, parent);
            constructs.push(importStatementData.getKey());
            index = importStatementData.getValue();
            break;

          case ReservedKeywords.FOR:
          case ReservedKeywords.DO_WHILE:
          case ReservedKeywords.WHILE:
            const loopScopeData = this.parseFromLoopScope(expression, index);
            constructs.push(loopScopeData.getKey());
            index = loopScopeData.getValue();
            break;

          case ReservedKeywords.SWITCH:
            const switchBlockData = this.parseFromSwitchBlock(expression, index);
            constructs.push(switchBlockData.getKey());
            index = switchBlockData.getValue();
            break;

          case ReservedKeywords.FUNCTION:
          case ReservedKeywords.GENERATOR_FUNCTION:
            const functionScopeData = this.parseFromFunctionOrGeneratorFunctionScope(expression, index, parent);
            constructs.push(functionScopeData.getKey());
            index = functionScopeData.getValue();
            break;

          case ReservedKeywords.TRY:
          case ReservedKeywords.CATCH:
            const tryBlockData = this.parseFromTryBlock(expression, index);
            constructs.push(tryBlockData.getKey());
            index = tryBlockData.getValue();
            break;

          case ReservedKeywords.CLASS:
            const classScopeData = this.parseFromClassScope(expression, index);
            constructs.push(classScopeData.getKey());
            index = classScopeData.getValue();
            break;

          case ReservedKeywords.IF:
          case ReservedKeywords.ELSE:
          case ReservedKeywords.ELSE_IF:
            const ifElseBlockData = this.parseFromIfElseBlock(expression, index);
            constructs.push(ifElseBlockData.getKey());
            index = ifElseBlockData.getValue();
            break;
        }
      } else {
        const semiColonIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.SEMI_COLON);
        constructs.push(this.fromStatementOrExpressionOrNotationOrAssignmentOrInstantiation(
          expression.substring(index, semiColonIndex).trim(), parent)
        );
        index = semiColonIndex;
      }
    }

    return constructs;
  }

  public parseFromImportStatement(expression: string, startIndex: number, parent: Scope): Pair<ImportExportStatement, number> {
    const semiColonIndex = this.getFirstSymbolPositionAtTopLevel(expression.substring(startIndex), Delimiter.SEMI_COLON);
    const importExportStatement = this.fromImportExportStatement(expression.substring(startIndex, semiColonIndex).trim(), parent);
    return new Pair<ImportExportStatement, number>(importExportStatement, semiColonIndex);
  }

  public fromImportExportStatement(expression: string, parent: Scope): ImportExportStatement {
    return new ImportExportStatement(parent, expression);
  }

  public parseFromIfElseBlock(expression: string, startIndex: number): Pair<IfElseBlock, number> {

  }

  public parseFromClassScope(expression: string, startIndex: number): Pair<ClassScope, number> {

  }

  public parseFromTryBlock(expression: string, startIndex: number): Pair<TryCatchBlock, number> {

  }

  public parseFromFunctionOrGeneratorFunctionScope(expression: string, startIndex: number, parent: Scope): Pair<FunctionDeclarationScope | GeneratorFunctionScope, number> {
    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getPartnerBracePosition(expression, leftCurlyBraceIndex);
    const loopExpression = expression.substring(startIndex, rightCurlyBraceIndex + 1);
    const loopScope = this.fromFunctionOrGeneratorFunctionScope(loopExpression, parent);
    return new Pair<FunctionDeclarationScope|GeneratorFunctionScope, number>(loopScope, rightCurlyBraceIndex);
  }

  public parseFromLoopScope(expression: string, startIndex: number, parent: Scope): Pair<LoopScope, number> {
    const token = this.getFirstWord(expression, startIndex);
    if (token === ReservedKeywords.DO_WHILE) {
      return this.parseFromDoWhileLoopScope(expression, startIndex, parent);
    }

    return this.parseFromForOrWhileLoopScope(expression, startIndex, parent);
  }

  public parseFromForOrWhileLoopScope(expression: string, startIndex: number, parent: Scope): Pair<ForEachLoopScope | ForLoop | WhileLoopScope, number> {
    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression.substring(startIndex), Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getPartnerBracePosition(expression, leftCurlyBraceIndex);
    const loopExpression = expression.substring(leftCurlyBraceIndex, rightCurlyBraceIndex + 1);
    const loopScope = this.fromForOrForeachOrWhileLoopScope(loopExpression, parent);
    return new Pair<ForEachLoopScope|ForLoop|WhileLoopScope, number>(loopScope, rightCurlyBraceIndex);
  }

  public fromForOrForeachOrWhileLoopScope(expression: string, parent: Scope): ForEachLoopScope | ForLoop | WhileLoopScope {
    const token = this.getFirstWord(expression, 0);
    if (token as ReservedKeywords === ReservedKeywords.WHILE) {
      return this.fromWhileLoopScope(expression, parent);
    }

    return this.fromForOrForeachLoopScope(expression, parent);
  }

  public parseFromDoWhileLoopScope(expression: string, startIndex: number, parent: Scope): Pair<DoWhileLoopScope, number> {
    const rightBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.RIGHT_BRACE);
    const loopExpression = expression.substring(startIndex, rightBraceIndex + 1);
    const doWhileLoop = this.fromDoWhileLoopScope(loopExpression, parent);
    return new Pair<DoWhileLoopScope, number>(doWhileLoop, rightBraceIndex);
  }

  public parseFromSwitchBlock(expression: string, startIndex: number): Pair<SwitchBlock, number> {

  }

  public isScopeOrBlockKeyword(expression: string): boolean  {
    return this.SCOPE_OR_BLOCK_KEYWORDS.has(expression as ReservedKeywords);
  }

  public getFirstWord(expression: string, from: number): string {
    const tokenIndices = this.getFirstWordStartAndEndIndex(expression, from);
    return expression.substring(tokenIndices.getKey(), tokenIndices.getValue() + 1);
  }

  public getParameters(parameters: Array<string>, parent: Scope): Array<FunctionParameter> {
    const result: Array<FunctionParameter> = [];
    for (const parameter of parameters) {
      result.push(this.fromFunctionParameter(parameter, parent));
    }
    return result;
  }

  public fromFunctionParameter(parameter: string, parent: Scope): FunctionParameter {
    if (this.isAssignmentExpression(parameter)) {
      return this.fromAssignmentExpression(parameter, parent);
    }

    return this.fromVariableOrDeconstructedExpression(parameter, parent);
  }

  public fromVariableOrDeconstructedExpression(expression: string, parent: Scope):
    AnyDeconstructedExpression | VariableExpression {
    if (this.isVariableExpression(expression)) {
      return this.fromVariableExpression(expression, parent);
    }

    return this.fromDeconstructedExpression(expression, parent);
  }

  public fromDeconstructedExpression(expression: string, parent: Scope): AnyDeconstructedExpression {
    if (this.isDeconstructedObjectExpression(expression)) {
      return this.fromDeconstructedObjectExpression(expression, parent);
    }

    return this.fromDeconstructedArrayExpression(expression, parent);
  }

  public fromDeconstructedArrayExpression(expression: string, parent: Scope): ArrayDeconstructedExpression {
    const commaSeparatedElements = expression.substring(1, expression.length - 1);
    const elementsList = this.getCommaSeparatedConstructs(commaSeparatedElements);
    const elements = this.getParameters(elementsList, parent);
    return new ArrayDeconstructedExpression(parent, elements as Array<VariableExpression | AnyDeconstructedExpression>);
  }

  public fromDeconstructedObjectExpression(expression: string, parent: Scope): ObjectDeconstructedExpression {
    const commaSeparatedBody = expression.substring(1, expression.length - 1).trim();
    const elementsList = this.getCommaSeparatedConstructs(commaSeparatedBody);
    const elements = this.fromObjectDeconstructedElements(elementsList, parent);
    return new ObjectDeconstructedExpression(parent, elements);
  }

  public fromObjectDeconstructedElements(elements: Array<string>, parent: Scope): Array<ObjectDeconstructedElement> {
    const result: Array<ObjectDeconstructedElement> = [];
    for (const element of elements) {
      if (this.isVariableExpression(element)) {
        result.push(this.fromVariableExpression(element, parent));
      } else {
        result.push(this.fromObjectDeconstructedPair(element, parent));
      }
    }

    return result;
  }

  public fromObjectDeconstructedPair(pair: string, parent: Scope): PairCodeable<VariableExpression | StringNotation, VariableExpression | AnyDeconstructedExpression> {
    const colonDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(pair, Delimiter.COLON);
    const keyExpression = pair.substring(0, colonDelimiterIndex).trim();
    const key = this.fromExpressionOrNotation(keyExpression, parent) as VariableExpression | StringNotation ;
    const valueExpression = pair.substring(colonDelimiterIndex + 1);
    const value = this.fromVariableOrDeconstructedExpression(valueExpression, parent);
    return new PairCodeable(key, value);
  }

  public isVariableExpression(expression: string): boolean {
    const colonPosition = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.COLON);
    if (colonPosition !== -1) {
      return false;
    }

    const periodIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    const tokens = this.getTokensFromStatement(expression);
    const operators = this.getOperators(tokens);
    return operators.length === 0 && !this.containsBrackets(expression.substring(0, periodIndex).trim()) ;
  }

  public containsBrackets(expression: string): boolean {
    for (const character of expression) {
      if (this.isBracket(character)) {
        return false;
      }
    }

    return true;
  }

  public isDeconstructedExpression(expression: string): boolean {
    return this.isDeconstructedArrayExpression(expression) ||
      this.isDeconstructedObjectExpression(expression) ;
  }

  public isDeconstructedArrayExpression(expression: string): boolean {
    return expression.charAt(0) === Bracket.LEFT_SQUARED &&
      expression.charAt(expression.length - 1) === Bracket.RIGHT_SQUARED ;
  }

  public isDeconstructedObjectExpression(expression: string): boolean {
    return expression.charAt(0) === Bracket.LEFT_CURLY_BRACE &&
      expression.charAt(expression.length - 1) === Bracket.RIGHT_CURLY_BRACE ;
  }

  public fromAssignmentExpression(expression: string, parent: Scope): AssignmentExpression {
    const equalsIndex = this.getFirstSymbolPositionAtTopLevel(expression, Operator.EQUALITY);
    const previousOperators = this.getPreviousContiguousOperators(expression, equalsIndex - 1);
    let targetExpression, valueExpression = expression.substring(equalsIndex + 1), assignmentOperator = AssignmentOperator.ASSIGNMENT;
    if (previousOperators.length > 0 && this.isAssignmentOperator(previousOperators + Operator.EQUALITY)) {
      targetExpression = expression.substring(0, equalsIndex - previousOperators.length);
      assignmentOperator = (previousOperators + Operator.EQUALITY) as AssignmentOperator;
    } else {
      targetExpression = expression.substring(0, equalsIndex);
    }

    const target = this.fromExpressionOrDeconstructedExpression(targetExpression, parent);
    const value = this.fromExpressionOrNotationOrFunctionScopeOrLambdaOrAssignment(valueExpression, parent);
    return new AssignmentExpression(parent, target, value, assignmentOperator);
  }

  public fromExpressionOrNotationOrFunctionScopeOrLambdaOrAssignment(expression: string, parent: Scope): AssignmentExpressionValueType {
    if (this.isAssignmentExpression(expression)) {
      return this.fromAssignmentExpression(expression, parent);
    }

    return this.fromExpressionOrNotationOrFunctionScopeOrLambda(expression, parent);
  }

  public fromExpressionOrDeconstructedExpression(expression: string, parent: Scope): AssignmentExpressionTargetType {
    if (this.isExpression(expression)) {
      return this.fromExpression(expression, parent);
    }

    return this.fromDeconstructedExpression(expression, parent);
  }

  public isExpression(expression: string): boolean {
    return this.isVariableExpression(expression) ||
      this.isArrayIndexExpression(expression) ||
      this.isGroupExpression(expression) ||
      this.isFunctionInvocationExpression(expression) ;
  }

  public isAssignmentOperator(expression: string): boolean {
    return this.ASSIGNMENT_OPERATORS.has(expression as AssignmentOperator);
  }

  public getPreviousContiguousOperators(expression: string, from: number): string {
    let result = "";
    for (let index = from ; index >= 0 ; index--) {
      if (this.isOperator(expression.charAt(index))) {
        result += expression.charAt(index);
      } else {
        break;
      }
    }

    return result;
  }

  public fromGeneratorFunctionScope(expression: string, parent: Scope): GeneratorFunctionScope {
    const generatorFunction = new GeneratorFunctionScope(parent, [], [], "");
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_BRACE);
    const rightBraceIndex = this.partnerBracePosition(expression, leftBraceIndex);
    generatorFunction.name = expression.substring(ReservedKeywords.GENERATOR_FUNCTION.length, leftBraceIndex).trim();

    const commaSeparatedParameters = expression.substring(leftBraceIndex + 1, rightBraceIndex).trim();
    const parametersList = this.getCommaSeparatedConstructs(commaSeparatedParameters);
    generatorFunction.parameters = this.getParameters(parametersList, generatorFunction);

    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getLastSymbolPositionAtTopLevel(expression, Bracket.RIGHT_CURLY_BRACE);
    const bodyExpression = expression.substring(leftCurlyBraceIndex + 1, rightCurlyBraceIndex).trim();
    generatorFunction.body = this.fromScopeBody(bodyExpression, generatorFunction);

    return generatorFunction;
  }

  public fromAnonymousFunctionScope(expression: string, parent: Scope): AnonymousFunctionScope {
    const lambdaIndex = this.getFirstSymbolPositionAtTopLevel(expression, Operator.EQUALITY) ;
    let commaSeparatedParameters;
    if (expression.charAt(0) === Bracket.LEFT_BRACE) {
      const rightBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.RIGHT_BRACE);
      commaSeparatedParameters = expression.substring(1, rightBraceIndex).trim();
    } else {
      commaSeparatedParameters = expression.substring(0, lambdaIndex).trim();
    }

    const parametersList = this.getCommaSeparatedConstructs(commaSeparatedParameters);
    const anonymousFunction = new AnonymousFunctionScope(parent, [], []);
    anonymousFunction.parameters = this.getParameters(parametersList, anonymousFunction);
    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getLastSymbolPositionAtTopLevel(expression, Bracket.RIGHT_CURLY_BRACE);
    const bodyExpression = expression.substring(leftCurlyBraceIndex + 1, rightCurlyBraceIndex);
    anonymousFunction.body = this.fromScopeBody(bodyExpression, anonymousFunction);
    return anonymousFunction;
  }

  public fromScope(expression: string, parent: Scope): Scope {
    const scope = new Scope(parent, []);
    scope.body = this.fromScopeBody(expression, scope);
    return scope;
  }


  /***
   * @param expression The expression passed into this method is can
   * contractually obliged to only be a FunctionInvocationExpression
   * as so foo(), foo(bar, person), foo({age: 10, name: john}). It can also
   * contain an attribute like foo(args).firstName or foo(args).func(arg2)
   * The attribute is contractually obliged to be either a VariableExpression
   * or a FunctionInvocationExpression
   * @param parent The parent scope of the FunctionInvocationExpression
   */
  public fromFunctionInvocationExpression(expression: string, parent: Scope): FunctionInvocationExpression {
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_BRACE);
    const rightBraceIndex = this.getPartnerBracePosition(expression, leftBraceIndex);
    const targetExpression = expression.substring(0, leftBraceIndex).trim();
    const target = this.fromExpressionOrNotationOrFunctionScope(targetExpression, parent);

    const commaSeparatedArgs = expression.substring(leftBraceIndex + 1, rightBraceIndex).trim();
    const argsList = this.getCommaSeparatedConstructs(commaSeparatedArgs);
    const args = this.getMethodArguments(argsList, parent);

    const attributeExpression = expression.substring(periodDelimiterIndex + 1);
    const attribute = this.fromExpressionAttribute(attributeExpression, parent);

    return new FunctionInvocationExpression(parent, target, attribute, args);
  }

  public fromExpressionOrFunctionScopeElements(args: Array<string>, parent: Scope): Array<AnyExpression | FunctionScope> {
    const result: Array<AnyExpression | FunctionScope> = [];
    for(const arg of args) {
      result.push(this.fromExpressionOrFunctionScope(arg, parent));
    }

    return result;
  }

  public fromExpressionOrFunctionScope(expression: string, parent: Scope): AnyExpression | FunctionScope {
    if (this.isAnyFunctionScope(expression)) {
      return this.fromFunctionScope(expression, parent);
    }

    return this.fromExpression(expression, parent);
  }



  /***
   * @param expression The attribute attached to the end of either a
   * FunctionInvocationExpression or a normal VariableExpression. This attribute
   * can also be present after other constructs to access the properties or methods
   * of those constructs.
   * Attribute can be present after Notation and Expression constructs
   * @param parent
   */
  public fromFunctionInvocationOrVariableExpression(expression: string, parent: Scope):
    FunctionInvocationExpression | VariableExpression {
    if (this.isFunctionInvocationExpression(expression)) {
      return this.fromFunctionInvocationExpression(expression, parent);
    }

    return this.fromVariableExpression(expression, parent);
  }

  public isFunctionInvocationExpression(expression: string): boolean {
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    if (periodDelimiterIndex === -1) {
      return expression.charAt(expression.length - 1) === Bracket.RIGHT_BRACE;
    }

    return this.isFunctionInvocationExpression(expression.substring(0, periodDelimiterIndex).trim());
  }

  /***
   * Returns the corresponding bracket in a code sequence for any given left
   * indentation bracket a point
   * @param expression The code expression which much contractually be a valid code
   * snippet and also must have the left brace at the given index
   * @param leftBracePosition The index where one of the left BRACKETS is present
   */
  public partnerBracePosition(expression: string, leftBracePosition: number): number {
    let bracketStack = 0;
    for(let index = 0 ; index < expression.length ; index++) {
      const character = expression.charAt(index);
      if (this.isLeftBracket(character)) {
        bracketStack++;
      }

      if (this.isRightBracket(character)) {
        bracketStack--;
      }

      if(this.isRightBracket(character) && bracketStack === 0) {
        return index;
      }
    }

    return -1;
  }

  public codeSnippetContainsAttribute(code: string): boolean {
    return this.containsPeriodDelimiterAfterFirstWord(code);
  }

  public getFirstAttribute(code: string): string | null {
    const delimiterPosition = this.getDelimiterPositionAfterFirstExpression(code);
    if (delimiterPosition !== -1 && code.charAt(delimiterPosition) === Delimiter.PERIOD) {
      return code.substring(delimiterPosition + 1);
    }

    return null;
  }

  public getFirstTokenName(code: string): string {
    let token = "";
    for (let character of code) {
      if (this.isDelimiter(character) || this.isBracket(character) || this.isWhitespaceCharacter(character)) {
        break;
      }
      token += character;
    }

    return token;
  }

  public isWhitespaceCharacter(character: string): boolean {
    return character === this.CARRIAGE_RETURN || character === this.WHITE_SPACE;
  }

  public attributeIsAFunctionInvocation(attribute: string): boolean {
    const nextImportantCharacterPosition = this.getOtherCharacterPositionAfterFirstWord(attribute);
    return attribute.charAt(nextImportantCharacterPosition) === Bracket.LEFT_BRACE;
  }

  public getOtherCharacterPositionAfterFirstWord(code: string): number {
    for (let index = 0 ; index < code.length ; index++) {
      let character = code.charAt(index);
      if(this.isDelimiter(character) || this.isBracket(character)) {
        return index;
      }
    }

    return -1;
  }

  public getDelimiterPositionAfterFirstExpression(code: string): number {
    let bracketStack = 0;
    for (let index = 0 ; index < code.length ; index++) {
      const character = code.charAt(index);
      if (this.isLeftBracket(character)) {
        bracketStack++;
      }

      if (this.isRightBracket(character)) {
        bracketStack--;
      }

      if(bracketStack === 0 && this.isDelimiter(character)) {
        return index;
      }
    }

    return -1;
  }

  public getMethodArguments(args: Array<string>, parent: Scope): Array<FunctionArgument> {
    const result: Array<FunctionArgument> = [];
    for (const arg of args) {
      result.push(this.fromStatementOrFunctionScopeOrLambda(arg, parent) as FunctionArgument);
    }

    return result;
  }

  public fromStatementOrFunctionScopeOrLambda(expression: string, parent: Scope):
    Statement | AnyExpression | AnyNotation | FunctionScope | AssignmentExpression | LambdaExpression {

    if (this.isAnyFunctionScope(expression)) {
      return this.fromFunctionScope(expression, parent);
    }

    if (this.isLambdaExpression(expression)) {
      return this.fromLambdaExpression(expression, parent);
    }

    return this.fromStatementOrExpressionOrNotationOrAssignmentOrInstantiation(expression, parent);
  }

  public fromExpressionOrNotation(expression: string, parent: Scope): AnyExpression | AnyNotation {
    if (this.isNotation(expression)) {
      return this.fromNotation(expression, parent);
    }

    return this.fromExpression(expression, parent);
  }

  public isNotation(expression: string): boolean {
    return this.isStringNotation(expression) ||
      this.isNumberNotation(expression) ||
      this.isObjectNotation(expression) ||
      this.isArrayNotation(expression) ||
      this.isBooleanNotation(expression) ;
  }

  public isBooleanNotation(expression: string): boolean {
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    if (periodDelimiterIndex === -1) {
      return this.BOOLEAN_VALUES.has(expression);
    }

    return this.isBooleanNotation(expression.substring(0, periodDelimiterIndex).trim());
  }

  public isArrayNotation(expression: string): boolean {
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    if (periodDelimiterIndex === -1) {
      return expression.charAt(0) === Bracket.LEFT_SQUARED &&
        expression.charAt(expression.length - 1) === Bracket.RIGHT_SQUARED ;
    }

    return this.isArrayNotation(expression.substring(0, periodDelimiterIndex).trim());
  }

  public isObjectNotation(expression: string): boolean {
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);

    try {
      JSON.parse(expression.substring(0, periodDelimiterIndex));
    } catch (exception) {
      return false;
    }

    return true;
  }

  public fromNotation(expression: string, parent: Scope): AnyNotation {
    if (this.isStringNotation(expression)) {
      return this.fromStringNotation(expression, parent);
    }

    if (this.isBooleanNotation(expression)) {
      return this.fromBooleanNotation(expression, parent);
    }

    if(this.isArrayNotation(expression)) {
      return this.fromArrayNotation(expression, parent);
    }

    if (this.isNumberNotation(expression)) {
      return this.fromNumberNotation(expression, parent);
    }

    return this.fromObjectNotation(expression, parent);
  }

  public fromBooleanNotation(expression: string, parent: Scope): BooleanNotation {
    let attributeExpression = null, targetExpression = expression;
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    if (periodDelimiterIndex !== -1) {
      targetExpression = expression.substring(0, periodDelimiterIndex);
      attributeExpression = expression.substring(periodDelimiterIndex + 1);
    }
    const target = Boolean(targetExpression);
    const attribute = attributeExpression ? this.fromExpressionAttribute(attributeExpression, parent) : null;

    return new BooleanNotation(parent, target, attribute);
  }

  public fromArrayNotation(expression: string, parent: Scope): ArrayNotation {
    let attributeExpression = null, targetExpression = expression;
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    if (periodDelimiterIndex !== -1) {
      const targetExpression = expression.substring(0, periodDelimiterIndex).trim();
      const attributeExpression = expression.substring(periodDelimiterIndex + 1);
    }

    const commaSeparatedElements = expression.substring(1, expression.length - 1);
    const elementExpressions: Array<string> = this.getCommaSeparatedConstructs(commaSeparatedElements);
    const arrayElements: Array<ArrayElement> = this.fromArrayElements(elementExpressions, parent);
    const attribute = attributeExpression ? this.fromExpressionAttribute(attributeExpression, parent) : null ;

    return new ArrayNotation(parent, arrayElements, attribute);
  }

  /***
   * @return can be AnyExpression | AnyNotation | FunctionScope | Statement | LambdaExpression
   * @param elements
   * @param parent
   */
  public fromArrayElements(elements: Array<string>, parent: Scope): Array<ArrayElement> {
    const result: Array<ArrayElement> = [];
    for (const element of elements) {
      result.push(this.fromArrayElement(element, parent));
    }

    return result;
  }

  public fromArrayElement(expression: string, parent: Scope): ArrayElement {
    if (this.isAnyFunctionScope(expression)) {
      return this.fromFunctionScope(expression, parent);
    }

    if (this.isLambdaExpression(expression)) {
      return this.fromLambdaExpression(expression, parent);
    }

    return this.fromStatementOrExpressionOrNotationOrAssignmentOrInstantiation(expression, parent) as ArrayElement ;
  }

  public fromExpressionOrNotationOrFunctionScopeElements(expressions: string[], parent: Scope):
    Array<FunctionScope | AnyExpression | AnyNotation> {

    const result: Array<FunctionScope | AnyExpression | AnyNotation> = [];
    for (const expression of expressions) {
      result.push(this.fromExpressionOrNotationOrFunctionScope(expression, parent));
    }

    return result;
  }

  public fromSwitchBlock(expression: string, parent: Scope): SwitchBlock {
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_BRACE);
    const rightBraceIndex = this.getPartnerBracePosition(expression, leftBraceIndex);
    const switchBlock = new
      SwitchBlock(parent, [], expression.substring(leftBraceIndex + 1, rightBraceIndex).trim());

    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getPartnerBracePosition(expression, leftCurlyBraceIndex);
    const bodyExpression = expression.substring(leftCurlyBraceIndex + 1, rightCurlyBraceIndex).trim();
    const conditionalExpressions = this.getCaseAndDefaultConditionalExpressions(bodyExpression);
    switchBlock.conditionalScopes = this.fromConditionalScopeElements(conditionalExpressions, parent);
    return switchBlock;
  }

  public getCaseAndDefaultConditionalExpressions(expression: string): Array<string> {
    const colonIndexes: Array<number> = this.getAllPositionsAtTopLevel(expression, Delimiter.COLON);
    const result: Array<string> = [];

    if (colonIndexes.length < 2) {
      result.push(expression);
      return result;
    }

    for (let index = 0, startIndex = 0, endIndex; index < colonIndexes.length ;
         result.push(expression.substring(startIndex, endIndex + 1).trim()), index++, startIndex = endIndex + 1) {
      if (index === colonIndexes.length - 1) {
        endIndex = expression.length - 1;
        continue;
      }

      endIndex = this.getPreviousWordStartAndEndIndex(expression, colonIndexes[index + 1]).getValue() - 1;
    }

    return result;
  }

  public getFirstWordStartAndEndIndex(expression: string, from: number): Pair<number, number> {
    let startIndex = from, encounteredWhiteSpace = false, wordStarted = !this.isWhitespaceCharacter(expression.charAt(from));
    for (let index = from ; index < expression.length ; index++) {
      const character = expression.charAt(index);

      if (wordStarted) {
         if (this.isWhitespaceCharacter(character)) {
           return new Pair<number, number>(startIndex, index - 1);
         }
      } else {
        if (!this.isWhitespaceCharacter(character)) {
          wordStarted = true;
          startIndex = index;
        }
      }
    }

    return new Pair<number, number>(-1, -1);
  }

  public getNextWordStartAndEndIndex(expression: string, from: number): Pair<number, number> {
    let startIndex = -1;
    let encounteredWhitespace = false;
    let wordStarted = false;
    for (let index = from ; index < expression.length ; index++) {
      const character = expression.charAt(index);

      if (wordStarted) {
        if (this.isWhitespaceCharacter(character)) {
          return new Pair<number, number>(startIndex, index - 1);
        }
        continue;
      } else {
        if (this.isWhitespaceCharacter(character)) {
          encounteredWhitespace = true;
          continue;
        }
      }

      if (encounteredWhitespace) {
        if (!this.isWhitespaceCharacter(character)) {
          wordStarted = true;
          startIndex = index;
        }
      }
    }

    return new Pair<number, number>(-1, -1);
  }

  /***
   * @return returns a pair in the form (startIndex, endIndex)
   * @param expression
   * @param from
   */
  public getPreviousWordStartAndEndIndex(expression: string, from: number): Pair<number, number> {
    let endIndex = -1;
    let encounteredWhitespace = false;
    let wordStarted = false;
    for (let index = from ; index >= 0 ; index--) {
      const character = expression.charAt(index);

      if (wordStarted) {
        if (this.isWhitespaceCharacter(character)) {
          return new Pair<number, number>(index + 1, endIndex);
        }
        continue;
      } else {
        if (this.isWhitespaceCharacter(character)) {
          encounteredWhitespace = true;
          continue;
        }
      }

      if (encounteredWhitespace) {
        if (!this.isWhitespaceCharacter(character)) {
          wordStarted = true;
          endIndex = index;
        }
      }
    }

    return new Pair<number, number>(-1, -1);
  }

  public fromTryCatchBlock(expression: string, parent: Scope): TryCatchBlock {
    const tryCatchBlock = new TryCatchBlock(parent, []);
    const handlingExpressions = this.getScopeExpression(expression);
    tryCatchBlock.conditionalScopes = this.fromTryOrCatchExpressionElements(handlingExpressions, parent);
    return tryCatchBlock;
  }

  public fromTryOrCatchExpressionElements(expressions: Array<string>, parent: Scope): Array<TryScope | CatchScope> {
    const result: Array<TryScope | CatchScope> = [];
    for(const expression of expressions) {
      result.push(this.fromTryOrCatchScope(expression, parent));
    }
    return result;
  }

  public fromTryOrCatchScope(expression: string, parent: Scope): TryScope | CatchScope {
    if (this.isTryScope(expression)) {
      return this.fromTryScope(expression, parent);
    }

    return this.fromCatchScope(expression, parent);
  }

  public isTryScope(expression: string): boolean {
    return expression.substring(0, ReservedKeywords.TRY.length) === ReservedKeywords.TRY;
  }

  public fromTryScope(expression: string, parent: Scope): TryScope {
    const tryScope = new TryScope(parent, []);
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.RIGHT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getPartnerBracePosition(expression, leftBraceIndex);
    tryScope.body = this.fromScopeBody(expression.substring(leftBraceIndex + 1, rightCurlyBraceIndex).trim(), tryScope);
    return tryScope;
  }

  public fromCatchScope(expression: string, parent: Scope): CatchScope {
    const catchScope = new CatchScope(parent, [], "");
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_BRACE);
    const rightBraceIndex = this.getPartnerBracePosition(expression, leftBraceIndex);
    catchScope.condition = expression.substring(leftBraceIndex + 1, rightBraceIndex).trim();

    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getPartnerBracePosition(expression, leftCurlyBraceIndex);
    catchScope.body = this.fromScopeBody(expression.substring(leftCurlyBraceIndex + 1, rightBraceIndex).trim(), catchScope);
    return catchScope;
  }

  public fromIfElseBlock(expression: string, parent: Scope): IfElseBlock {
    const conditionalScopesExpressions: string[] = this.getScopeExpression(expression);
    const conditionalScopes = this.fromConditionalScopeElements(conditionalScopesExpressions, parent);
    return new IfElseBlock(parent, conditionalScopes);
  }

  public fromConditionalScopeElements(conditionalScopeExpressions: Array<string>, parent: Scope): Array<ConditionalScope> {
    let result: Array<ConditionalScope> = [];
    for (const conditionalScopeExpression of conditionalScopeExpressions) {
      result.push(this.fromConditionalScope(conditionalScopeExpression, parent));
    }
    return result;
  }

  /***
   * @return Any Conditional Scope i.e IfScope | IfElse | Else and also CaseScope and DefaultScope
   * @param expression
   * @param parent
   */
  public fromConditionalScope(expression: string, parent: Scope): ConditionalScope {
    if (this.isIfOrElseOrIfElseScope(expression)) {
      return this.fromIfOrElseOrIfElseExpression(expression, parent);
    }

    return this.fromDefaultOrCaseConditionalScope(expression, parent);
  }

  public fromIfOrElseOrIfElseExpression(expression: string, parent: Scope): IfConditionalScope | ElseIfConditionalScope | ElseCondition {
    if (this.isIfScopeCondition(expression)) {
      return this.fromIfScopeExpression(expression, parent);
    } else if (this.isElseIfScopeExpression(expression)) {
      return this.fromElseIfScope(expression, parent);
    }

    return this.fromElseScope(expression, parent);
  }

  public fromElseScope (expression: string, parent: Scope): ElseCondition {
    const elseScope = new IfConditionalScope(parent, [], "");
    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getPartnerBracePosition(expression, leftCurlyBraceIndex);
    elseScope.body = this.fromScopeBody(expression.substring(leftCurlyBraceIndex + 1, rightCurlyBraceIndex).trim(), elseScope);

    return elseScope;
  }

  public fromElseIfScope(expression: string, parent: Scope): ElseIfConditionalScope {
    const elseIfScope = new ElseIfConditionalScope(parent, [], "");
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_BRACE);
    const rightBraceIndex = this.getPartnerBracePosition(expression, leftBraceIndex);
    elseIfScope.condition = expression.substring(leftBraceIndex + 1, rightBraceIndex).trim();

    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getPartnerBracePosition(expression, leftCurlyBraceIndex);
    elseIfScope.body = this.fromScopeBody(expression.substring(leftCurlyBraceIndex + 1, rightCurlyBraceIndex).trim(), elseIfScope);

    return elseIfScope;
  }

  public fromIfScopeExpression(expression: string, parent: Scope): IfConditionalScope {
    const ifScope = new IfConditionalScope(parent, [], "");
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_BRACE);
    const rightBraceIndex = this.getPartnerBracePosition(expression, leftBraceIndex);
    ifScope.condition = expression.substring(leftBraceIndex + 1, rightBraceIndex).trim();

    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getPartnerBracePosition(expression, leftCurlyBraceIndex);
    ifScope.body = this.fromScopeBody(expression.substring(leftCurlyBraceIndex + 1, rightCurlyBraceIndex).trim(), ifScope);

    return ifScope;
  }

  public fromDefaultOrCaseConditionalScope(expression: string, parent: Scope): DefaultConditionalScope | CaseConditionalScope {
    if (this.isCaseConditionScope(expression)) {
      return this.fromCaseConditionalScope(expression, parent);
    }

    return this.fromDefaultConditionalScope(expression, parent);
  }

  public fromCaseConditionalScope(expression: string, parent: Scope): CaseConditionalScope {
    const caseScope = new CaseConditionalScope(parent, [], "");
    const colonIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.COLON);
    caseScope.condition = expression.substring(ReservedKeywords.CASE.length, colonIndex).trim();
    caseScope.body = this.fromScopeBody(expression.substring(colonIndex + 1).trim(), caseScope);
    return caseScope;
  }

  public fromDefaultConditionalScope(expression: string, parent: Scope): DefaultConditionalScope {
    const defaultCase = new DefaultConditionalScope(parent, []);
    const colonIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.COLON);
    defaultCase.body = this.fromScopeBody(expression.substring(colonIndex + 1).trim(), defaultCase);
    return defaultCase;
  }

  public isCaseConditionScope(expression: string): boolean {
    return expression.substring(0, ReservedKeywords.CASE.length) === ReservedKeywords.CASE ;
  }

  public isIfOrElseOrIfElseScope(expression: string): boolean {
    return this.isIfScopeCondition(expression)
      || this.isElseIfScopeExpression(expression)
      || this.isElseScopeCondition(expression);
  }

  public isIfScopeCondition(expression: string): boolean {
    return expression.substring(0, ReservedKeywords.IF.length) === ReservedKeywords.IF;
  }

  public isElseScopeCondition(expression: string): boolean {
    return expression.substring(0, ReservedKeywords.ELSE.length) === ReservedKeywords.ELSE;
  }

  public isElseIfScopeExpression(expression: string): boolean {
    return expression.substring(0, ReservedKeywords.ELSE_IF.length) === ReservedKeywords.ELSE_IF;
  }

  /***
   * @param expression Recieves a string expression without any \n\r characters and also
   * of the form [any name | any expression] { //scope } [name  expression] { // scope}
   * @return a string array of all of these scope expressions  as
   * [ '[name | expression]' { // scope }' , .... ]
   */
  public getScopeExpression(expression: string): Array<string> {
    const firstLeftCurlyBrace = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    if (firstLeftCurlyBrace === -1) {
      return [];
    }

    const result: Array<string> = [];
    const rightCurlyBrace = this.getPartnerBracePosition(expression, firstLeftCurlyBrace);
    result.push(
      expression.substring(0, rightCurlyBrace + 1),
      ...this.getScopeExpression(expression.substring(rightCurlyBrace + 1).trim())
    );

    return result;
  }

  /***
   * @param expression It has already been determined that the scope is either for or
   * foreach and hence must start with a for
   * @param parent
   */
  public fromForOrForeachLoopScope(expression: string, parent: Scope): ForLoop | ForEachLoopScope {
    if (this.isForLoopScope(expression)) {
      return this.fromForLoopScope(expression, parent);
    }

    return this.fromForeachLoopScope(expression, parent);
  }

  public isForLoopScope(expression: string): boolean {
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_BRACE);
    const rightBraceIndex = this.getPartnerBracePosition(expression, leftBraceIndex);
    const argsExpression = expression.substring(leftBraceIndex + 1, rightBraceIndex);
    return this.getFirstSymbolPositionAtTopLevel(argsExpression, Delimiter.SEMI_COLON) !== -1 ;
  }

  public fromForeachLoopScope(expression: string, parent: Scope): ForEachLoopScope {
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_BRACE);
    const rightBraceIndex = this.getPartnerBracePosition(expression, leftBraceIndex);
    const foreachLoop = new ForEachLoopScope(parent,
      [],
      expression.substring(leftBraceIndex + 1, rightBraceIndex).trim()
    );

    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.partnerBracePosition(expression, leftCurlyBraceIndex);
    foreachLoop.body = this.fromScopeBody(expression.substring(leftCurlyBraceIndex + 1, rightCurlyBraceIndex).trim(),
      foreachLoop);
    return foreachLoop;
  }

  public fromForLoopScope(expression: string, parent: Scope): ForLoop {
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_BRACE);
    const rightBraceIndex = this.getPartnerBracePosition(expression, leftBraceIndex);
    const forLoop = new ForLoop(parent, [], "", [], []);
    const loopConditionalExpression = expression.substring(leftBraceIndex + 1, rightBraceIndex);
    const conditionalExpressions: Array<string> = this.getDelimiterSeparatedConstructs(loopConditionalExpression, Delimiter.SEMI_COLON);
    const preStatementExpressions = this.getCommaSeparatedConstructs(conditionalExpressions[0]);
    const postStatements = this.getCommaSeparatedConstructs(conditionalExpressions[2]);
    forLoop.statement = conditionalExpressions[1];
    forLoop.preStatements = this.fromStatementOrExpressionOrNotationOrAssignmentElements(preStatementExpressions, forLoop);
    forLoop.postStatements = this.fromStatementOrExpressionOrNotationOrAssignmentElements(preStatementExpressions, forLoop);

    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getPartnerBracePosition(expression, leftCurlyBraceIndex);
    forLoop.body = this.fromScopeBody(expression.substring(leftCurlyBraceIndex + 1, rightCurlyBraceIndex).trim(), forLoop);
    return forLoop;
  }

  public fromDoWhileLoopScope(expression: string, parent: Scope): DoWhileLoopScope {
    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getPartnerBracePosition(expression, leftCurlyBraceIndex);
    const whileEndIndex = this.getPreviousWordStartAndEndIndex(expression, rightCurlyBraceIndex).getValue();
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression.substring(whileEndIndex), Bracket.LEFT_BRACE);
    const rightBraceIndex = this.getPartnerBracePosition(expression, leftBraceIndex);
    const doWhileLoop = new DoWhileLoopScope(parent, [], expression.substring(leftBraceIndex + 1, rightBraceIndex).trim());
    doWhileLoop.body = this.fromScopeBody(expression.substring(leftCurlyBraceIndex + 1, rightCurlyBraceIndex).trim(), doWhileLoop);

    return doWhileLoop;
  }

  public fromWhileLoopScope(expression: string, parent: Scope): WhileLoopScope {
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_BRACE);
    const rightBraceIndex = this.getPartnerBracePosition(expression, leftBraceIndex);
    const condition = expression.substring(leftBraceIndex + 1, rightBraceIndex).trim();
    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getPartnerBracePosition(expression, leftCurlyBraceIndex);
    const whileLoop = new WhileLoopScope(parent, [], condition);
    whileLoop.body = this.fromScopeBody(expression.substring(leftCurlyBraceIndex + 1, rightCurlyBraceIndex).trim(), whileLoop);

    return whileLoop;
  }

  public getCommaSeparatedConstructsFromTokens(tokens: Array<string>): Array<string> {
    const result = [];
    for (let index = 0, expression = '' ; index < tokens.length ; index++) {
      if (tokens[index] === Delimiter.COMMA) {
        result.push(expression);
        expression = '';
      } else {
        expression += tokens[index];
      }
    }

    return result;
  }
  
  public getDelimiterSeparatedConstructs(expression: string, delimiter: Delimiter): Array<string> {
    const result: Array<string> = [];
    const firstDelimiterPosition = this.getFirstSymbolPositionAtTopLevel(expression, delimiter);
    if (firstDelimiterPosition === -1) {
      result.push(expression);
      return result;
    }

    result.push(
      expression.substring(0, firstDelimiterPosition),
      ...this.getDelimiterSeparatedConstructs(expression.substring(firstDelimiterPosition + 1), delimiter)
    );

    return result;
  }

  public getCommaSeparatedConstructs(expression: string): Array<string> {
    return this.getDelimiterSeparatedConstructs(expression, Delimiter.COMMA);
  }

  /***
   * @param expression The code expression received is contractually obliged to be
   * a comma separated list of arguments that can be syntactically passed into a
   * method as parameters. The arguments will be returned as strings bit will represent
   * either a valid Expression (VE | FIE | GE | AIE) or any Notation (N)
   */
  public getParsedMethodArguments(expression: string): Array<string> {
    expression = expression.trim();
    const args: Array<string> = [];
    if (expression === "") {
      return args;
    }

    let bracketStack = 0, startIndex = 0;
    for (let index = 0 ; index < expression.length ; index++) {
      const character = expression.charAt(index);
      if (this.isLeftBracket(character)) {
        bracketStack++;
      }

      if (this.isRightBracket(character)) {
        bracketStack--;
      }

      if(bracketStack === 0 && character === Delimiter.COMMA) {
        args.push(expression.substring(startIndex, index).trim());
        startIndex = index + 1;
      }
    }

    args.push(expression.substring(startIndex, expression.length).trim());
    return args;
  }

  public getPartnerLiteral(expression: string, startIndex: number): number {
    // @ts-ignore
    const literal: Delimiter.SINGLE_QUOTE | Delimiter.BACK_TICK | Delimiter.DOUBLE_QUOTE = expression.charAt(startIndex);
    let index=startIndex;

    for ( ; index < expression.length ; index++) {
      if (expression.charAt(index) === Delimiter.BACK_SLASH) {
        index++;
        continue;
      }

      if (expression.charAt(index) === literal) {
        return index;
      }
    }

    return -1;
  }

  public getPartnerBracePosition(code: string, startIndex: number) {
    let index = startIndex;
    for (let bracketStack = 0, stringLiteral = null ; index < code.length ; index++) {
      const character = code.charAt(index);

      if (stringLiteral && character === stringLiteral) {
        stringLiteral = null;
        continue;
      }

      if (stringLiteral) {
        continue;
      }

      if (!stringLiteral) {
        if (this.STRING_LITERAL_DELIMITERS.has(character)) {
          stringLiteral = character;
          continue;
        }

        if (this.isLeftBracket(character)) {
          bracketStack++;
        }

        if (this.isRightBracket(character)) {
          bracketStack--;
        }

        if(this.isRightBracket(character) && bracketStack === 0) {
          return index;
        }
      }
    }

    return -1;
  }

  public isLeftBracket(character: string): boolean {
    return this.LEFT_BRACKETS.has(character);
  }

  public isRightBracket(character: string): boolean {
    return this.RIGHT_BRACKETS.has(character);
  }

  public isBracket(character: string): boolean {
    return this.BRACKETS.has(character);
  }

  public isDelimiter(character: string): boolean {
    return Delimiter.PERIOD === character || Delimiter.SEMI_COLON === character;
  }

  public containsPeriodDelimiterAfterFirstWord(code: string): boolean{
    for (let character of code) {
      if(Delimiter.PERIOD === character) {
        return true;
      }
    }

    return false;
  }

  public isOperator(token: string): boolean {
    return this.OPERATORS.has(token as Operator);
  }

  public removeAllLineBreaks(expression: string): string {
    return expression.replace(/(\r\n|\n|\r)/gm, " ");
  }
}
