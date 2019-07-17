import {Delimiter} from "../models/parser/delimiter.enum";
import {FunctionInvocationExpression} from "../models/parser/expression/function-invocation.expression";
import {VariableExpression} from "../models/parser/expression/variable.expression";
import {Scope} from "../models/parser/scope/scope.construct";
import {Bracket} from "../models/parser/bracket.enum";

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

  public getAttributeOf(code: string): string | null {

  }

  public codeSnippetContainsAttribute(code: string): boolean {
    return this.containsPeriodDelimiterAfterFirstWord(code);
  }

  public getAttributeConstructFor(code: string, parent: Scope): FunctionInvocationExpression | VariableExpression | null {
    const attribute = this.getFirstAttribute(code);
    if (attribute) {
      if (this.attributeIsAFunctionInvocation(attribute)) {
        return FunctionInvocationExpression.parseFromForParent(attribute, parent);
      }
      return VariableExpression.parseFromForParent(attribute, parent)
    }

    return null;
  }

  private getFirstAttribute(code: string): string | null {
    const delimiterPosition = this.getDelimiterPositionAfterFirstExpression(code);
    if (delimiterPosition !== -1 && code.charAt(delimiterPosition) === Delimiter.PERIOD) {
      return code.substring(delimiterPosition + 1);
    }

    return null;
  }

  public getFirstTokenName(code: string): string {
    let token = '';
    for (let character of code) {
      if (this.isADelimiter(character) || this.isBracket(character) || this.isWhitespaceCharacter(character)) {
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
      if(this.isADelimiter(character) || this.isBracket(character)) {
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

      if(bracketStack === 0 && this.isADelimiter(character)) {
        return index;
      }
    }

    return -1;
  }

  public getMethodArguments(code: string, parent: Scope): Array<VariableExpression> {
    const leftBracePosition = this.getOtherCharacterPositionAfterFirstWord(code);
    const rightBracePosition = this.getPartnerBracePosition(code, leftBracePosition);
    const args = this.getParsedMethodArguments(code.substring(leftBracePosition + 1, rightBracePosition));
    // console.log(args);

    let expressions: Array<VariableExpression> = [];
    for (let expression of args) {
      expressions.push(VariableExpression.parseFromForParent(expression, parent));
    }

    return expressions;
  }

  private getParsedMethodArguments(code: string): Array<string> {
    const args: Array<string> = [];
    let bracketStack = 0, startIndex = 0;
    for (let index = 0 ; index < code.length ; index++) {
      const character = code.charAt(index);
      if (this.isLeftBracket(character)) {
        bracketStack++;
      }

      if (this.isRightBracket(character)) {
        bracketStack--;
      }

      if(bracketStack === 0 && character === Delimiter.COMMA) {
        args.push(code.substring(startIndex, index).trim());
        startIndex = index + 1;
      }
    }

    args.push(code.substring(startIndex, code.length).trim());
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

  private isADelimiter(character: string): boolean {
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
