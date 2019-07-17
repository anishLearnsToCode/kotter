import {Construct} from "../construct";
import { Codeable } from "../../codeable";

export class Scope extends Construct implements Codeable {
  private constructs: Array<Construct> = [];

  public static getGlobalScope() {
    return new Scope(null);
  }

  public constructor(parentScope: Scope | null) {
    super(parentScope);
  }

  code(): string {
    return "";
  }
}
