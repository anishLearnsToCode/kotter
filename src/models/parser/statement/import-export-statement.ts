import { Construct } from "../construct";
import { Codeable } from "../../codeable";
import { Scope } from "../scope/scope.construct";

export class ImportExportStatement extends Construct implements Codeable {
  statement: string;

  constructor(parent: Scope, statement: string) {
    super(parent);
    this.statement = statement;
  }

  code(withBrackets?: boolean): string {
    return this.statement;
  }
}
