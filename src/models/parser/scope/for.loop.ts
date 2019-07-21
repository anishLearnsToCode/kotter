import {LoopScope} from "./loop.scope";
import {Codeable} from "../../codeable";
import {Statement} from "../statement/statement.construct";
import {Scope} from "./scope.construct";
import {Construct} from "../construct";
import {ReservedKeywords} from "../../reserved-keywords.enum";
import {Bracket} from "../bracket.enum";
import {Delimiter} from "../delimiter.enum";

export class ForLoop extends LoopScope implements Codeable {
  preStatements: Array<Statement>;
  postStatements: Array<Statement>;

  constructor(parent: Scope, body: Array<Construct>, statement: string, preStatements: Array<Statement>, postStatements: Array<Statement>) {
    super(parent, body, statement);
    this.preStatements = preStatements;
    this.postStatements = postStatements;
  }

  code(): string {
    return ReservedKeywords.FOR + Bracket.LEFT_BRACE
        + this.commaSeparatedStatements(this.preStatements)
        + this.statement
        + this.commaSeparatedStatements(this.postStatements)
      + Bracket.RIGHT_BRACE
    + super.code();
  }

  commaSeparatedStatements(statements: Array<Statement>): string {
    let code = '';
    for( const statement of statements) {
      code += Delimiter.COMMA + statement.code();
    }

    return code.substring(1);
  }
}
