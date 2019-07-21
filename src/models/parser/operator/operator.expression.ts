import {Codeable} from "../../codeable";
import {Operator} from "./operator.enum";

export class OperatorExpression implements Codeable {
  private readonly operator: Operator;

  constructor(operator: Operator) {
    this.operator = operator;
  }

  code(): string {
    return this.operator + '';
  }
}
