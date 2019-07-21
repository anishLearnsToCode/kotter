import {Construct} from "../construct";
import {Scope} from "../scope/scope.construct";
import {Codeable} from "../../codeable";
import {AnyExpression} from "../expression/any-expression.type";
import {AnyNotation} from "../notation/any-notation.type";
import {ParserService} from "../../../services/parser.service";
import {OperatorExpression} from "../operator/operator.expression";


export class Statement extends Construct implements Codeable {
  tokens: Array<AnyExpression | OperatorExpression | AnyNotation>;

  constructor(parent: Scope, tokens: Array<AnyExpression | AnyNotation | OperatorExpression>) {
    super(parent);
    this.tokens = tokens;
  }

  code(): string {
    let code = '';
    for (const token of this.tokens) {
      code += token.code() + ' ';
    }

    return code;
  }
}
