import { Delimiter} from "../models/parser/delimiter.enum";
import { FunctionInvocationExpression} from "../models/parser/expression/function-invocation.expression";
import { VariableExpression} from "../models/parser/expression/variable.expression";
import { Scope} from "../models/parser/scope/scope.construct";
import { Bracket} from "../models/parser/bracket.enum";
import { Expression } from "../models/parser/expression/expression.construct";
import { GroupExpression } from "../models/parser/expression/group.expression";
import { AnyExpression } from "../models/parser/expression/any-expression.type";
import { PassableArgumentsType } from "../models/parser/passable-arguments.type";
import { Notation } from "../models/parser/notation/notation.construct";
import { AnyNotation } from "../models/parser/notation/any-notation.type";

export class ParserService {
  private static serviceInstance = new ParserService();

  public static getService(): ParserService {
    return this.serviceInstance;
  }

  private readonly brackets: Set<String> = new Set<String>([
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

  private CARRIAGE_RETURN: string = '\n';
  private WHITE_SPACE: string = ' ';

  /***
   * @param expression The code string to be parsed can only be a
   * VE, FIE, GE or AIE
   * @param parent The parent Scope
   */
  public fromExpression(expression: string, parent: Scope): AnyExpression | null {
    if (expression === null) {
      return null;
    }

    // Expression is a group expression (GE)
    if (expression.charAt(0) === Bracket.LEFT_BRACE) {
      return this.fromGroupExpression(expression, parent);
    }

    return null;
  }

  /***
   * @param expression is present inside code in a () bracket style and must be
   * either an Expression (VE, FIE, GE or AIE) or Notation or Assignment Expression (AE)
   * @param parent The parent Scope of the construct
   */
  public fromGroupExpression(expression: string, parent: Scope): GroupExpression {
    const codeInsideBrackets = expression.substring(1, expression.length-1);
    return new GroupExpression(parent, new VariableExpression(parent, '', null), null);
  }

  /***
   * @param expression The code expression to parse which contractually must be
   * a variable expression and can have an attribute as either FIE or VE
   * @param parent The parent scope that contains this expression
   */
  public fromVariableExpression(expression: string, parent: Scope): VariableExpression {
    const target = this.getFirstTokenName(expression);
    const attributeExpression = this.getFirstAttribute(expression);
    const attribute = attributeExpression ?
      this.fromFunctionInvocationOrVariableExpression(attributeExpression, parent) : null;

    return new VariableExpression(parent, target, attribute);
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
    const target = this.getFirstTokenName(expression);

    const leftBracketPosition = target.length + 1;
    const rightBracketPosition = this.partnerBracePosition(expression, leftBracketPosition);
    const argsExpression = expression.substring(leftBracketPosition, rightBracketPosition);
    const args = this.getMethodArguments(argsExpression, parent);

    const attributeExpression = expression.substr(rightBracketPosition + 2);
    const attribute = attributeExpression === '' ?
      null : this.fromFunctionInvocationOrVariableExpression(attributeExpression, parent);
    return new FunctionInvocationExpression(parent, target, attribute, args);
  }

  private getArgumentsFromFunctionInvocation(expression: string, parent: Scope, leftBracketPosition: number): Array<PassableArgumentsType> {
    const rightBracketPosition = this.partnerBracePosition(expression, leftBracketPosition);
    const argsExpression = expression.substring(leftBracketPosition, rightBracketPosition);
    return this.getMethodArguments(argsExpression, parent);
  }



  /***
   * @param attributeExpression The attribute attached to the end of either a
   * FunctionInvocationExpression or a normal VariableExpression. This attribute
   * can also be present after other constructs to access the properties or methods
   * of those constructs.
   * Attribute can be present after Notation and Expression constructs
   * @param parent
   */
  private fromFunctionInvocationOrVariableExpression(attributeExpression: string, parent: Scope):
    FunctionInvocationExpression | VariableExpression {
    if (this.attributeIsAFunctionInvocation(attributeExpression)) {
      return this.fromFunctionInvocationExpression(attributeExpression, parent);
    }

    return this.fromVariableExpression(attributeExpression, parent);
  }

  /***
   * Returns the corresponding bracket in a code sequence for any given left
   * indentation bracket a point
   * @param expression The code expression which much contractually be a valid code
   * snippet and also must have the left brace at the given index
   * @param leftBracePosition The index where one of the left brackets is present
   */
  private partnerBracePosition(expression: string, leftBracePosition: number): number {
    let bracketStack = 0;
    for(let index = 0 ; index < expression.length ; index++) {
      const character = expression.charAt(index);
      if (this.LEFT_BRACKETS.has(character)) {
        bracketStack++;
      }

      if (this.RIGHT_BRACKETS.has(character)) {
        bracketStack--;
      }

      if(this.RIGHT_BRACKETS.has(character) && bracketStack === 0) {
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
  public getMethodArguments(code: string, parent: Scope): Array<PassableArgumentsType> {
    const args = this.getParsedMethodArguments(code);
    let expressions: Array<PassableArgumentsType> = [];
    for (let expression of args) {
      expressions.push(this.fromExpressionOrNotation(expression, parent));
    }

    return expressions;
  }

  // TODO: Add functionality for all expressions and notations
  private fromExpressionOrNotation(expression: string, parent: Scope): AnyExpression | AnyNotation {
    return this.fromFunctionInvocationOrVariableExpression(expression, parent);
  }

  /***
   * @param expression The code expression received is contractually obliged to be
   * a comma separated list of arguments that can be syntactically passed into a
   * method as parameters. The arguments will be returned as strings bit will represent
   * either a valid Expression (VE | FIE | GE | AIE) or any Notation (N)
   */
  private getParsedMethodArguments(expression: string): Array<string> {
    const args: Array<string> = [];
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

  private getPartnerBracePosition(code: string, startIndex: number) {
    let counter = 0, index = startIndex;
    for (; index < code.length ; index++) {
      const character = code.charAt(index);
      if (this.isLeftBracket(character)) {
        counter++
      }

      if (this.isRightBracket(character)) {
        counter--;
      }

      if(counter === 0) {
        break;
      }
    }

    return index;
  }

  private isLeftBracket(character: string): boolean {
    return this.LEFT_BRACKETS.has(character);
  }

  private isRightBracket(character: string): boolean {
    return this.RIGHT_BRACKETS.has(character);
  }

  private isBracket(character: string): boolean {
    return this.brackets.has(character);
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
}
