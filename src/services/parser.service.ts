import {Delimiter} from "../models/parser/delimiter.enum";
import {Construct} from "../models/parser/construct";
import {Char} from "../models/parser/char.declaration";
import {FunctionInvocationExpression} from "../models/parser/expression/function-invocation.expression";
import {VariableExpression} from "../models/parser/expression/variable.expression";

export class ParserService {
  private static serviceInstance = new ParserService();

  public static getService(): ParserService {
    return this.serviceInstance;
  }

  // public getAttributeIfPresent(code: string): string {
  //
  // }

  public codeSnippetContainsAttribute(code: string): boolean {
    return this.containsPeriodDelimiterAfterFirstWord(code);
  }

  public getAttributeConstructType(code: string): Construct {
    const delimiterPosition = this.getDelimiterPositionAfterFirstWord(code);
    if (delimiterPosition !== -1 && code.charAt(delimiterPosition) === Delimiter.PERIOD) {
      const attribute = code.substring(0, delimiterPosition);
      if (this.attributeIsAFunctionInvocation(attribute)) {
        return FunctionInvocationExpression;
      }
    }
  }

  private getDelimiterPositionAfterFirstWord(code: string): number {
    for (let index = 0 ; index < code.length ; index++) {
      if(this.isADelimiter(code.charAt(index))) {
        return index;
      }
    }

    return -1;
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
