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

  private brackets: Set<String> = new Set<String>([
    Bracket.LEFT_CURLY_BRACE,
    Bracket.LEFT_BRACE,
    Bracket.LEFT_ANGLE,
    Bracket.LEFT_SQUARED,
    Bracket.RIGHT_ANGLE,
    Bracket.RIGHT_BRACE,
    Bracket.RIGHT_CURLY_BRACE,
    Bracket.RIGHT_SQUARED
  ]);

  private CARRIAGE_RETURN: string = '\n';
  private WHITE_SPACE: string = ' ';

  public codeSnippetContainsAttribute(code: string): boolean {
    return this.containsPeriodDelimiterAfterFirstWord(code);
  }

  public getAttributeConstructFor(code: string, parent: Scope): FunctionInvocationExpression | VariableExpression | null {
    const delimiterPosition = this.getDelimiterPositionAfterFirstWord(code);
    // console.log(delimiterPosition, code.charAt(delimiterPosition));

    if (delimiterPosition !== -1 && code.charAt(delimiterPosition) === Delimiter.PERIOD) {
      const attribute = code.substring(delimiterPosition + 1);
      if (this.attributeIsAFunctionInvocation(attribute)) {
        return FunctionInvocationExpression.parseFromForParent(attribute, parent);
      }
      return VariableExpression.parseFromForParent(attribute, parent)
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

  private getDelimiterPositionAfterFirstWord(code: string): number {
    for (let index = 0 ; index < code.length ; index++) {
      if(this.isADelimiter(code.charAt(index))) {
        return index;
      }
    }

    return -1;
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
