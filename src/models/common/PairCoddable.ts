import {Codeable} from "../codeable";
import {Delimiter} from "../parser/delimiter.enum";

export class PairCodeable<T extends Codeable, U extends Codeable> implements Codeable {
  private key: T;
  private value: U;

  constructor(key: T, value: U) {
    this.key = key;
    this.value = value;
  }

  code(): string {
    return this.key.code() + Delimiter.COLON + this.value.code();
  }
}
