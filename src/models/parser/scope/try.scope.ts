import {Scope} from "./scope.construct";
import {Codeable} from "../../codeable";
import {Construct} from "../construct";
import {ReservedKeywords} from "../../reserved-keywords.enum";

export class TryScope extends Scope implements Codeable {
  constructor(parent: Scope, body: Array<Construct>) {
    super(parent, body);
  }

  code(): string {
    return ReservedKeywords.TRY + ' '
    + super.code();
  }
}
