import {Construct} from "../construct";
import {Codeable} from "../../codeable";
import {VariableExpression} from "../expression/variable.expression";
import {AssignmentExpression} from "./assignment-expression";
import {ReservedKeywords} from "../../reserved-keywords.enum";
import {Scope} from "../scope/scope.construct";
import {Delimiter} from "../delimiter.enum";

// todo implement parser
export class InstantiationExpression extends Construct implements Codeable {
  instantiations: Array<VariableExpression | AssignmentExpression>;
  initializer: ReservedKeywords.VAR | ReservedKeywords.LET | ReservedKeywords.CONST;

  constructor(parent: Scope, instantiations: Array<VariableExpression | AssignmentExpression>,
              initializer: ReservedKeywords.VAR | ReservedKeywords.LET | ReservedKeywords.CONST) {
    super();
    this.parentScope = parent;
    this.initializer = initializer;
    this.instantiations = instantiations;
  }

  code(): string {
    return this.initializer + ' ' + this.allInstantiationsAsCode();
  }

  allInstantiationsAsCode(): string {
    let code = '';
    for(const instantiation of this.instantiations) {
      code += Delimiter.COMMA + instantiation.code();
    }

    return code.substring(1);
  }
}
