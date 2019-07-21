import {Delimiter} from "../models/parser/delimiter.enum";
import {FunctionInvocationExpression} from "../models/parser/expression/function-invocation.expression";
import {VariableExpression} from "../models/parser/expression/variable.expression";
import {Scope} from "../models/parser/scope/scope.construct";
import {Bracket} from "../models/parser/bracket.enum";
import {GroupExpression, GroupExpressionTargetType} from "../models/parser/expression/group.expression";
import {AnyExpression} from "../models/parser/expression/any-expression.type";
import {FunctionArgument} from "../models/parser/functionArgument";
import {AnyNotation} from "../models/parser/notation/any-notation.type";
import {
  AssignmentExpression,
  AssignmentExpressionTargetType,
  AssignmentExpressionValueType
} from "../models/parser/instantiation/assignment-expression";
import {Symbol} from "../models/parser/symbol.enum";
import {
  ArrayIndex,
  ArrayIndexExpression,
  ArrayIndexExpressionTargetType
} from "../models/parser/expression/array-index.expression";
import {AnySymbol} from "../models/parser/symbol.type";
import {ObjectAttributeValue, ObjectNotation} from "../models/parser/notation/object.notation";
import {Pair} from "../models/common/Pair";
import {FunctionDeclarationScope} from "../models/parser/scope/function-declaration-scope";
import {AnonymousFunctionScope} from "../models/parser/scope/anonymous-function.scope";
import {ReservedKeywords} from "../models/reserved-keywords.enum";
import {ExpressionAttribute} from "../models/parser/expression/expression.construct";
import {StringNotation} from "../models/parser/notation/string.notation";
import {NumberNotation} from "../models/parser/notation/number.notation";
import {Statement} from "../models/parser/statement/statement.construct";
import {Operator} from "../models/parser/operator/operator.enum";
import {OperatorExpression} from "../models/parser/operator/operator.expression";
import {FunctionParameter, FunctionScope} from "../models/parser/scope/function.scope";
import {ArrayElement, ArrayNotation} from "../models/parser/notation/array-notation";
import {BooleanNotation} from "../models/parser/notation/boolean.notation";
import {LambdaExpression} from "../models/parser/expression/lambda-expression";
import {Construct} from "../models/parser/construct";
import {AnyDeconstructedExpression} from "../models/parser/instantiation/any-deconstructed-expression.type";
import {ArrayDeconstructedExpression} from "../models/parser/instantiation/array-deconstructed-expression";
import {
  ObjectDeconstructedElement,
  ObjectDeconstructedExpression
} from "../models/parser/instantiation/object-deconstructed-expression";
import {PairCodeable} from "../models/common/PairCodeable";
import {AssignmentOperator} from "../models/parser/operator/assignment-operator.enum";
import {GeneratorFunctionScope} from "../models/parser/scope/generator-function-scope";

export class ParserService {
  private static serviceInstance = new ParserService();

  public static getService(): ParserService {
    return this.serviceInstance;
  }

  private readonly BRACKETS: Set<String> = new Set<String>([
    Bracket.LEFT_CURLY_BRACE,
    Bracket.LEFT_BRACE,
    Bracket.LEFT_ANGLE,
    Bracket.LEFT_SQUARED,
    Bracket.RIGHT_ANGLE,
    Bracket.RIGHT_BRACE,
    Bracket.RIGHT_CURLY_BRACE,
    Bracket.RIGHT_SQUARED
  ]);

  private readonly LEFT_BRACKETS: Set<String> = new Set<String>([
    Bracket.LEFT_CURLY_BRACE,
    Bracket.LEFT_BRACE,
    Bracket.LEFT_ANGLE,
    Bracket.LEFT_SQUARED
  ]);

  private readonly RIGHT_BRACKETS: Set<String> = new Set<String>([
    Bracket.RIGHT_ANGLE,
    Bracket.RIGHT_BRACE,
    Bracket.RIGHT_CURLY_BRACE,
    Bracket.RIGHT_SQUARED
  ]);

  private readonly NON_ARRAY_LEFT_BRACKETS: Set<String> = new Set<String>([
    Bracket.LEFT_CURLY_BRACE,
    Bracket.LEFT_BRACE,
    Bracket.LEFT_ANGLE
  ]);

  private readonly NON_ARRAY_RIGHT_BRACKETS: Set<String> = new Set<String>([
    Bracket.RIGHT_ANGLE,
    Bracket.RIGHT_BRACE,
    Bracket.RIGHT_CURLY_BRACE
  ]);

  private readonly STRING_LITERAL_DELIMITERS: Set<string> = new Set<string>([
    Delimiter.DOUBLE_QUOTE,
    Delimiter.SINGLE_QUOTE,
    Delimiter.BACK_TICK
  ]);

  private readonly OPERATORS = new Set<Operator>([
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

  private ASSIGNMENT_OPERATORS = new Set<AssignmentOperator>([
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

  private readonly BOOLEAN_VALUES = new Set<string>(['true', 'false']);

  private readonly DIGITS: Set<number> = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

  private readonly CARRIAGE_RETURN: string = '\n';
  private readonly WHITE_SPACE: string = ' ';

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
    // if has attribute
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
  private fromArrayIndexExpression(expression: string, parent: Scope): ArrayIndexExpression {
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
  private fromArrayIndex(expression: string, parent: Scope): ArrayIndex {
    if (this.isStringNotation(expression)) {
      return this.fromStringNotation(expression, parent);
    }

    if (this.isNumberNotation(expression)) {
      return this.fromNumberNotation(expression, parent);
    }

    return this.fromStatementOrExpression(expression, parent) as ArrayIndex;
  }

  private fromStatementOrExpression(expression: string, parent: Scope): Statement | AnyExpression | AssignmentExpression | AnyNotation {
    const tokens = this.getTokensFromStatement(expression);
    if (this.tokensContainsOperator(tokens)) {
      return this.fromStatement(tokens, parent);
    }

    return this.fromExpression(expression, parent);
  }

  /***
   * @param tokens An Array of code tokens that do not contain ant \n\r newline characters but may have spaces
   * @param parent
   */
  private fromStatement(tokens: Array<string>, parent: Scope): Statement | AssignmentExpression | AnyNotation | AnyExpression {
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

  private getOperators(tokens: Array<string>): Array<string> {
    const result: Array<string> = [];
    for (const token of tokens) {
      if (this.isOperator(token)) {
        result.push(token);
      }
    }

    return result;
  }

  private condenseTokens(tokens: Array<string>): Array<string> {
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

  private tokensContainsOperator(tokens: string[]): boolean {
    for (const token of tokens) {
      if (this.isOperator(token)) {
        return true;
      }
    }

    return false;
  }

  private getTokensFromStatement(expression: string): Array<string> {
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

  private isStringLiteral(character: string): boolean {
    return this.STRING_LITERAL_DELIMITERS.has(character);
  }

  private isStringNotation (expression: string): boolean {
    return this.STRING_LITERAL_DELIMITERS.has(expression.charAt(0));
  }

  private isNumberNotation(expression: string): boolean {
    // @ts-ignore
    return !isNaN(expression.charAt(0));
  }

  private fromNumberNotation(expression: string, parent: Scope): NumberNotation {
    const lastDigitIndex = this.getLastDigitIndexInNumber(expression);
    const attributeExpression = expression.substring(lastDigitIndex + 2).trim();
    const attribute = attributeExpression === '' ?
      null : this.fromExpressionAttribute(attributeExpression, parent);
    const number = +expression.substring(0, lastDigitIndex + 1).trim();

    return new NumberNotation(parent, number, attribute);
  }

  private getLastDigitIndexInNumber(expression: string): number {
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

  private isDigit(expression: string): boolean {
    return this.DIGITS.has(+expression);
  }

  /***
   * @param expression must be trimmed and not contain any \n\r linefeeds.
   * @param parent The parent scope of the expression
   */
  private fromStringNotation(expression: string, parent: Scope): StringNotation {
    // @ts-ignore
    const delimiter: Delimiter.DOUBLE_QUOTE | Delimiter.SINGLE_QUOTE | Delimiter.BACK_TICK = expression.charAt(0);
    const partnerDelimiterIndex = this.getPartnerLiteral(expression, 0);

    const attributeExpression = expression.substring(partnerDelimiterIndex + 2).trim();
    const attribute = attributeExpression === '' ?
      null : this.fromExpressionAttribute(attributeExpression, parent);

    return new StringNotation(parent, expression.substring(1, partnerDelimiterIndex), attribute, delimiter);
  }

  private isGroupExpression(expression: string): boolean {
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    if (periodDelimiterIndex === -1) {
      return expression.charAt(expression.length - 1) === Bracket.RIGHT_BRACE &&
        expression.charAt(0) === Bracket.LEFT_BRACE ;
    }

    return this.isGroupExpression(expression.substring(0, periodDelimiterIndex).trim());
  }

  private isArrayIndexExpression(expression: string): boolean {
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
    const attribute = attributeExpression === '' ?
      null : this.fromFunctionInvocationOrVariableExpression(attributeExpression, parent);

    return new GroupExpression(
      parent,
      this.fromNotationOrExpressionOrAssignmentExpression(codeInsideBrackets, parent),
      attribute
    );
  }

  // TODO: Implement for all Expression types and add support for notations
  private fromNotationOrExpressionOrAssignmentExpression(expression: string, parent: Scope): GroupExpressionTargetType {
    if (this.isAssignmentExpression(expression)) {
      return this.fromAssignmentExpression(expression, parent);
    }

    return this.fromExpressionOrNotation(expression, parent);
  }

  // TODO: Implement logic for whether a statement is an assignment expression
  private isAssignmentExpression(expression: string): boolean {
    for (let index = 0, bracketStack = 0 ; index < expression.length ; index++) {
      const character = expression.charAt(index);
      if (this.isLeftBracket(character)) {
        bracketStack++;
      }

      if (this.isRightBracket(character)) {
        bracketStack--;
      }

      if (bracketStack === 0 && character === Symbol.EQUAL) {
        return true;
      }
    }

    return false;
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
   * @param tokens The string tokens received here must eb exactly 3 in number one target expression,
   * one EQUALS delimiter operator token (or some other assignment type operator) and one value expression
   * @param parent The parent scope of the expression
   */
  public fromAssignmentExpressionTokens(tokens: Array<string>, parent: Scope): AssignmentExpression {

  }

  private getFirstSymbolPositionAtTopLevel(expression: string, symbol: AnySymbol): number {
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

      if (bracketStack === 0 && character === symbol) {
        return  index;
      }
    }

    return -1;
  }

  /***
   * @param expression
   * @param symbol
   */
  private getLastSymbolPositionAtTopLevel(expression: string, symbol: AnySymbol): number {
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

  private getLastSymbolPositionAtTopLevelAfter(expression: string, symbol: AnySymbol, startIndex: number): number {
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
    const attribute = attributeExpression !== '' ?
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

  private getObjectValue(pairs: Array<string>, parent: Scope): Map<string, ObjectAttributeValue> {
    const result: Map<string, ObjectAttributeValue> = new Map();
    for (const pair of pairs) {
      const keyValuePair = this.getObjectKeyValuePairFrom(pair, parent);
      result.set(keyValuePair.getKey(), keyValuePair.getValue());
    }

    return result;
  }

  private getObjectKeyValuePairFrom(pair: string, parent: Scope): Pair<string, ObjectAttributeValue> {
    const semiColonPosition = this.getFirstSymbolPositionAtTopLevel(pair, Delimiter.COLON);
    const key = pair.substring(0, semiColonPosition).trim();
    const valueExpression = pair.substring(semiColonPosition + 1).trim();
    const value = this.fromExpressionOrNotationOrFunctionScopeOrLambda(valueExpression, parent);

    return new Pair(key, value);
  }

  private fromExpressionOrNotationOrFunctionScopeOrLambda(expression: string, parent: Scope): ObjectAttributeValue {
    if (this.isLambdaExpression(expression)) {
      return this.fromLambdaExpression(expression, parent);
    }

    return this.fromExpressionOrNotationOrFunctionScope(expression, parent);
  }

  private fromLambdaExpression(expression: string, parent: Scope): LambdaExpression {
    const lambdaOperatorIndex = this.getFirstSymbolPositionAtTopLevel(expression, Operator.EQUALITY);
    const parametersExpression = expression.substring(0, lambdaOperatorIndex).trim();
    const commaSeparatedParameters = parametersExpression.charAt(0) === Bracket.LEFT_BRACE ?
      parametersExpression.substring(1, parametersExpression.length - 1) : parametersExpression;
    const parametersList = this.getCommaSeparatedConstructs(commaSeparatedParameters);
    const parameters: Array<VariableExpression> = this.fromVariableExpressionElements(parametersList, parent);
    const statementExpression = expression.substring(lambdaOperatorIndex + 2);
    const statement = this.fromStatementOrExpression(statementExpression, parent);

    return new LambdaExpression(parent, parameters, statement);
  }

  private fromVariableExpressionElements(parameters: Array<string>, parent: Scope): Array<VariableExpression> {
    const result: Array<VariableExpression> = [];
    for (const parameter of parameters) {
      result.push(this.fromVariableExpression(parameter, parent));
    }
    return result;
  }

  private isLambdaExpression(expression: string): boolean {
    const equalsDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Operator.EQUALITY);
    if (equalsDelimiterIndex !== -1 && expression.charAt(equalsDelimiterIndex + 1) === Operator.GREATER_THAN) {
      for (let index = equalsDelimiterIndex + 2 ; index < expression.length ; index++) {
        const character = expression.charAt(index);
        if (character === Bracket.LEFT_CURLY_BRACE) {
          return false;
        }
        if (character !== ' ') {
          break;
        }
      }
      return true;
    }

    return false;
  }

  private fromExpressionOrNotationOrFunctionScope(expression: string, parent: Scope): ObjectAttributeValue {
    if (this.isAnyFunctionScope(expression)) {
      return this.fromAnyFunctionScope(expression, parent);
    }

    return this.fromExpressionOrNotation(expression, parent);
  }

  private isAnyFunctionScope(expression: string): boolean {
    return this.isFunctionOrGeneratorFunction(expression)
      || this.isAnonymousFunction(expression);
  }

  private isFunctionOrGeneratorFunction(expression: string): boolean {
    return expression.substring(0, ReservedKeywords.FUNCTION.length) === ReservedKeywords.FUNCTION;
  }

  private isAnonymousFunction(expression: string): boolean {
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

  private indexOfPatternInUnNested(expression: string, pattern: string): number {
    for (let index = 0, bracketStack = 0, stringLiteral = null ; index < expression.length ; index++) {
      const character = expression.charAt(index);
      if (stringLiteral && stringLiteral === character) {
        stringLiteral = null;
        continue;
      }

      if (stringLiteral) {
        continue;
      }

      if (this.isLeftBracket(character)) {
        bracketStack++;
      }

      if (this.isRightBracket(character)) {
        bracketStack--;
      }

      if (bracketStack === 0 && character === pattern.charAt(0)) {
        if(pattern === expression.substr(index, pattern.length)) {
          return index;
        }
      }
    }

    return -1;
  }

  private fromAnyFunctionScope(expression: string, parent: Scope): FunctionScope {
    if (this.isFunctionOrGeneratorFunction(expression)) {
      return this.fromFunctionScope(expression, parent);
    }

    return this.fromAnonymousFunctionScope(expression, parent);
  }

  private fromFunctionScope(expression: string, parent: Scope): FunctionScope {
    if (this.isFunctionOrGeneratorFunction(expression)) {
      return <FunctionScope>this.fromFunctionOrGeneratorFunctionScope(expression, parent);
    }

    return this.fromAnonymousFunctionScope(expression, parent);
  }

  private fromFunctionOrGeneratorFunctionScope(expression: string, parent: Scope): FunctionDeclarationScope | GeneratorFunctionScope {
    if (expression.charAt(ReservedKeywords.FUNCTION.length) === Operator.MULTIPLICATION) {
      return this.fromGeneratorFunctionScope(expression, parent);
    }

    return this.fromFunctionDeclarationScope(expression, parent);
  }

  private fromFunctionDeclarationScope(expression: string, parent: Scope): FunctionDeclarationScope {
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

  private fromScopeBody(expression: string, parent: Scope): Array<Construct> {

  }

  private getParameters(parameters: Array<string>, parent: Scope): Array<FunctionParameter> {
    const result: Array<FunctionParameter> = [];
    for (const parameter of parameters) {
      result.push(this.fromFunctionParameter(parameter, parent));
    }
    return result;
  }

  private fromFunctionParameter(parameter: string, parent: Scope): FunctionParameter {
    if (this.isAssignmentExpression(parameter)) {
      return this.fromAssignmentExression(parameter, parent);
    }

    return this.fromVariableOrDeconstructedExpression(parameter, parent);
  }

  private fromVariableOrDeconstructedExpression(expression: string, parent: Scope):
    AnyDeconstructedExpression | VariableExpression {
    if (this.isVariableExpression(expression)) {
      return this.fromVariableExpression(expression, parent);
    }

    return this.fromDeconstructedExpression(expression, parent);
  }

  private fromDeconstructedExpression(expression: string, parent: Scope): AnyDeconstructedExpression {
    if (this.isDeconstructedObjectExpression(expression)) {
      return this.fromDeconstructedObjectExpression(expression, parent);
    }

    return this.fromDeconstructedArrayExpression(expression, parent);
  }

  private fromDeconstructedArrayExpression(expression: string, parent: Scope): ArrayDeconstructedExpression {
    const commaSeparatedElements = expression.substring(1, expression.length - 1);
    const elementsList = this.getCommaSeparatedConstructs(commaSeparatedElements);
    const elements = this.getParameters(elementsList, parent);
    return new ArrayDeconstructedExpression(parent, elements as Array<VariableExpression | AnyDeconstructedExpression>);
  }

  private fromDeconstructedObjectExpression(expression: string, parent: Scope): ObjectDeconstructedExpression {
    const commaSeparatedBody = expression.substring(1, expression.length - 1).trim();
    const elementsList = this.getCommaSeparatedConstructs(commaSeparatedBody);
    const elements = this.fromObjectDeconstructedElements(elementsList, parent);
    return new ObjectDeconstructedExpression(parent, elements);
  }

  private fromObjectDeconstructedElements(elements: Array<string>, parent: Scope): Array<ObjectDeconstructedElement> {
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

  private fromObjectDeconstructedPair(pair: string, parent: Scope): PairCodeable<VariableExpression | StringNotation, VariableExpression | AnyDeconstructedExpression> {
    const colonDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(pair, Delimiter.COLON);
    const keyExpression = pair.substring(0, colonDelimiterIndex).trim();
    const key = this.fromExpressionOrNotation(keyExpression, parent) as VariableExpression | StringNotation ;
    const valueExpression = pair.substring(colonDelimiterIndex + 1);
    const value = this.fromVariableOrDeconstructedExpression(valueExpression, parent);
    return new PairCodeable(key, value);
  }

  private isVariableExpression(expression: string): boolean {
    const colonPosition = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.COLON);
    if (colonPosition !== -1) {
      return false;
    }

    const periodIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    const tokens = this.getTokensFromStatement(expression);
    const operators = this.getOperators(tokens);
    return operators.length === 0 && !this.containsBrackets(expression.substring(0, periodIndex).trim()) ;
  }

  private containsBrackets(expression: string): boolean {
    for (const character of expression) {
      if (this.isBracket(character)) {
        return false;
      }
    }

    return true;
  }

  private isDeconstructedExpression(expression: string): boolean {
    return this.isDeconstructedArrayExpression(expression) ||
      this.isDeconstructedObjectExpression(expression) ;
  }

  private isDeconstructedArrayExpression(expression: string): boolean {
    return expression.charAt(0) === Bracket.LEFT_SQUARED &&
      expression.charAt(expression.length - 1) === Bracket.RIGHT_SQUARED ;
  }

  private isDeconstructedObjectExpression(expression: string): boolean {
    return expression.charAt(0) === Bracket.LEFT_CURLY_BRACE &&
      expression.charAt(expression.length - 1) === Bracket.RIGHT_CURLY_BRACE ;
  }

  private fromAssignmentExpression(expression: string, parent: Scope): AssignmentExpression {
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
    const value = this.fromExpressionOrNotationOrFunctionScopeOrLambda(valueExpression, parent);
    return new AssignmentExpression(parent, target, value, assignmentOperator);
  }

  private fromExpressionOrNotationOrFunctionScopeOrLambdaOrAssignment(expression: string, parent: Scope): AssignmentExpressionValueType {
    if (this.isAssignmentExpression(expression)) {
      return this.fromAssignmentExpression(expression, parent);
    }

    return this.fromExpressionOrNotationOrFunctionScopeOrLambda(expression, parent);
  }

  private fromExpressionOrDeconstructedExpression(expression: string, parent: Scope): AssignmentExpressionTargetType {

  }

  private isAssignmentOperator(expression: string): boolean {
    return this.ASSIGNMENT_OPERATORS.has(expression as AssignmentOperator);
  }

  private getPreviousContiguousOperators(expression: string, from: number): string {
    let result = '';
    for (let index = from ; index >= 0 ; index--) {
      if (this.isOperator(expression.charAt(index))) {
        result += expression.charAt(index);
      } else {
        break;
      }
    }

    return result;
  }

  private fromGeneratorFunctionScope(expression: string, parent: Scope): GeneratorFunctionScope {
    const leftBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_BRACE);
    const rightBraceIndex = this.partnerBracePosition(expression, leftBraceIndex);
    const name = expression.substring(ReservedKeywords.GENERATOR_FUNCTION.length, leftBraceIndex).trim();
    const commaSeparatedParameters = expression.substring(leftBraceIndex + 1, rightBraceIndex).trim();
    const parametersList = this.getCommaSeparatedConstructs(commaSeparatedParameters);
    const parameters = this.getParameters(parametersList, parent);
    const leftCurlyBraceIndex = this.getFirstSymbolPositionAtTopLevel(expression, Bracket.LEFT_CURLY_BRACE);
    const rightCurlyBraceIndex = this.getLastSymbolPositionAtTopLevel(expression, Bracket.RIGHT_CURLY_BRACE);
    const bodyExpression = expression.substring(leftBraceIndex + 1, rightCurlyBraceIndex);
    const generatorFunction = new GeneratorFunctionScope(parent, [], parameters, name);
    generatorFunction.body = this.fromScopeBody(bodyExpression, generatorFunction);
    return generatorFunction;
  }

  private fromAnonymousFunctionScope(expression: string, parent: Scope): AnonymousFunctionScope {
    
  }

  private fromScope(expression: String, parent: Scope): Scope {

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

    const targetExpression = expression.substring(0, periodDelimiterIndex).trim();
    const target = this.fromExpressionOrFunctionScope(targetExpression, parent);

    const leftBracketPosition = this.getLastSymbolPositionBefore(expression, Bracket.LEFT_BRACE, periodDelimiterIndex);
    const rightBracketPosition = this.getPartnerBracePosition(expression, leftBracketPosition);
    const argsExpression = expression.substring(leftBracketPosition + 1, rightBracketPosition);
    const args = this.getMethodArguments(argsExpression, parent);

    const attributeExpression = expression.substr(rightBracketPosition + 2);
    const attribute = attributeExpression === '' ?
      null : this.fromFunctionInvocationOrVariableExpression(attributeExpression, parent);
    return new FunctionInvocationExpression(parent, target, attribute, args);
  }

  private getArgumentsFromFunctionInvocation(expression: string, parent: Scope, leftBracketPosition: number): Array<FunctionArgument> {
    const rightBracketPosition = this.partnerBracePosition(expression, leftBracketPosition);
    const argsExpression = expression.substring(leftBracketPosition, rightBracketPosition);
    return this.getMethodArguments(argsExpression, parent);
  }

  private fromExpressionOrFunctionScope(expression: string, parent: Scope): AnyExpression | FunctionScope {

  }



  /***
   * @param expression The attribute attached to the end of either a
   * FunctionInvocationExpression or a normal VariableExpression. This attribute
   * can also be present after other constructs to access the properties or methods
   * of those constructs.
   * Attribute can be present after Notation and Expression constructs
   * @param parent
   */
  private fromFunctionInvocationOrVariableExpression(expression: string, parent: Scope):
    FunctionInvocationExpression | VariableExpression {
    if (this.isFunctionInvocationExpression(expression)) {
      return this.fromFunctionInvocationExpression(expression, parent);
    }

    return this.fromVariableExpression(expression, parent);
  }

  private isFunctionInvocationExpression(expression: string): boolean {
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
  private partnerBracePosition(expression: string, leftBracePosition: number): number {
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

  private getFirstAttribute(code: string): string | null {
    const delimiterPosition = this.getDelimiterPositionAfterFirstExpression(code);
    if (delimiterPosition !== -1 && code.charAt(delimiterPosition) === Delimiter.PERIOD) {
      return code.substring(delimiterPosition + 1);
    }

    return null;
  }

  private getFirstTokenName(code: string): string {
    let token = '';
    for (let character of code) {
      if (this.isDelimiter(character) || this.isBracket(character) || this.isWhitespaceCharacter(character)) {
        break;
      }
      token += character;
    }

    return token;
  }

  private isWhitespaceCharacter(character: string): boolean {
    return character === this.CARRIAGE_RETURN || character === this.WHITE_SPACE;
  }

  private attributeIsAFunctionInvocation(attribute: string): boolean {
    const nextImportantCharacterPosition = this.getOtherCharacterPositionAfterFirstWord(attribute);
    return attribute.charAt(nextImportantCharacterPosition) === Bracket.LEFT_BRACE;
  }

  private getOtherCharacterPositionAfterFirstWord(code: string): number {
    for (let index = 0 ; index < code.length ; index++) {
      let character = code.charAt(index);
      if(this.isDelimiter(character) || this.isBracket(character)) {
        return index;
      }
    }

    return -1;
  }

  private getDelimiterPositionAfterFirstExpression(code: string): number {
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

  /***
   * @param code the code snippet passed along must obey the valid syntactic
   * contract and also be of the form argument1, arg2 ... where the args string is
   * <b>not</b> enclosed by parentheses. The arguments although represented by
   * strings here have to be valid parameters that can be passed in js methods.
   * They can be Expressions (VE | FIE | GE | AIE), Notations
   * @param parent The parent scope of the FunctionInvocation
   */
  public getMethodArguments(code: string, parent: Scope): Array<FunctionArgument> {
    const args = this.getParsedMethodArguments(code);
    let expressions: Array<FunctionArgument> = [];
    for (let expression of args) {
      expressions.push(this.fromExpressionOrNotation(expression, parent));
    }

    return expressions;
  }

  private fromExpressionOrNotation(expression: string, parent: Scope): AnyExpression | AnyNotation {
    if (this.isNotation(expression)) {
      return this.fromNotation(expression, parent);
    }

    return this.fromExpression(expression, parent);
  }

  private isNotation(expression: string): boolean {
    return this.isStringNotation(expression) ||
      this.isNumberNotation(expression) ||
      this.isObjectNotation(expression) ||
      this.isArrayNotation(expression) ||
      this.isBooleanNotation(expression) ;
  }

  private isBooleanNotation(expression: string): boolean {
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    if (periodDelimiterIndex === -1) {
      return this.BOOLEAN_VALUES.has(expression);
    }

    return this.isBooleanNotation(expression.substring(0, periodDelimiterIndex).trim());
  }

  private isArrayNotation(expression: string): boolean {
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    if (periodDelimiterIndex === -1) {
      return expression.charAt(0) === Bracket.LEFT_SQUARED &&
        expression.charAt(expression.length - 1) === Bracket.RIGHT_SQUARED ;
    }

    return this.isArrayNotation(expression.substring(0, periodDelimiterIndex).trim());
  }

  private isObjectNotation(expression: string): boolean {
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);

    try {
      JSON.parse(expression.substring(0, periodDelimiterIndex));
    } catch (exception) {
      return false;
    }

    return true;
  }

  private fromNotation(expression: string, parent: Scope): AnyNotation {
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

  private fromBooleanNotation(expression: string, parent: Scope): BooleanNotation {
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

  private fromArrayNotation(expression: string, parent: Scope): ArrayNotation {
    let attributeExpression = null, targetExpression = expression;
    const periodDelimiterIndex = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.PERIOD);
    if (periodDelimiterIndex !== -1) {
      const targetExpression = expression.substring(0, periodDelimiterIndex).trim();
      const attributeExpression = expression.substring(periodDelimiterIndex + 1);
    }

    const commaSeparatedElements = expression.substring(1, expression.length - 1);
    const elementExpressions: Array<string> = this.getCommaSeparatedConstructs(commaSeparatedElements);
    const arrayElements: Array<ArrayElement> = this.fromExpressionOrNotationOrFunctionScopeElements(elementExpressions, parent);
    const attribute = attributeExpression ? this.fromExpressionAttribute(attributeExpression, parent) : null ;

    return new ArrayNotation(parent, arrayElements, attribute);
  }

  private fromExpressionOrNotationOrFunctionScopeElements(expressions: string[], parent: Scope):
    Array<FunctionScope | AnyExpression | AnyNotation> {

    const result: Array<FunctionScope | AnyExpression | AnyNotation> = [];
    for (const expression of expressions) {
      result.push(this.fromExpressionOrNotationOrFunctionScope(expression, parent));
    }

    return result;
  }

  private getCommaSeparatedConstructs(expression: string): Array<string> {
    const result: Array<string> = [];
    const firstCommaPosition = this.getFirstSymbolPositionAtTopLevel(expression, Delimiter.COMMA);
    if (firstCommaPosition === -1) {
      result.push(expression);
      return result;
    }

    result.push(
      expression.substring(0, firstCommaPosition),
      ...this.getCommaSeparatedConstructs(expression.substring(firstCommaPosition + 1))
    );

    return result;
  }

  private fromExpressionOrNotationTokens(tokens: Array<string>, parent: Scope): AnyExpression | AnyNotation {

  }

  /***
   * @param expression The code expression received is contractually obliged to be
   * a comma separated list of arguments that can be syntactically passed into a
   * method as parameters. The arguments will be returned as strings bit will represent
   * either a valid Expression (VE | FIE | GE | AIE) or any Notation (N)
   */
  private getParsedMethodArguments(expression: string): Array<string> {
    expression = expression.trim();
    const args: Array<string> = [];
    if (expression === '') {
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

  private getPartnerLiteral(expression: string, startIndex: number): number {
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
          bracketStack++
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

  private isLeftBracket(character: string): boolean {
    return this.LEFT_BRACKETS.has(character);
  }

  private isRightBracket(character: string): boolean {
    return this.RIGHT_BRACKETS.has(character);
  }

  private isBracket(character: string): boolean {
    return this.BRACKETS.has(character);
  }

  private isDelimiter(character: string): boolean {
    return Delimiter.PERIOD === character || Delimiter.SEMI_COLON === character;
  }

  private containsPeriodDelimiterAfterFirstWord(code: string): boolean{
    for (let character of code) {
      if(Delimiter.PERIOD === character) {
        return true;
      }
    }

    return false;
  }

  public isOperator(token: string): boolean {

  }

  public removeAllLineBreaks(expression: string): string {
    return expression.replace(/(\r\n|\n|\r)/gm, ' ');
  }
}
