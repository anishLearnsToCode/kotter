import {Construct} from "../construct";
import { Codeable } from "../../codeable";
import {Delimiter} from "../delimiter.enum";
import {Bracket} from "../bracket.enum";

export class Scope extends Construct implements Codeable {
  body: Array<Construct> = [];

  public static getGlobalScope() {
    return new Scope(null, []);
  }

  public constructor(parentScope: Scope | null, body: Array<Construct>) {
    super();
    super.parentScope = parentScope;
    this.body = body;
  }

  code(): string {
    return this.parentScope === null ? this.codeFromBody() :
      Bracket.LEFT_CURLY_BRACE + this.codeFromBody() + Bracket.RIGHT_CURLY_BRACE ;
  }

  private codeFromBody(): string {
    let code = '';
    for(const construct of this.body) {
      code += (construct instanceof Scope) ? construct.code() :
        construct.code() + Delimiter.SEMI_COLON;
    }

    return code;
  }
}
