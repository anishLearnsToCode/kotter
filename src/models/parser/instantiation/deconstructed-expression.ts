import {Construct} from "../construct";
import {Scope} from "../scope/scope.construct";
import {Delimiter} from "../delimiter.enum";
import {Codeable} from "../../codeable";

export abstract class DeconstructedExpression<T extends Codeable> extends Construct {
  elements: Array<T>;

  protected constructor(parent: Scope, elements: Array<T>) {
    super(parent);
    this.elements = elements;
  }

  public elementsAsCode(): string {
    let code = '';
    for (const element of this.elements) {
      code += Delimiter.COMMA + Delimiter.WHITE_SPACE + element.code();
    }

    return code.substring(1);
  }
}
