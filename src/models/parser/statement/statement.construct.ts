import {Construct} from "../construct";
import {Scope} from "../scope/scope.construct";

export class Statement<T> extends Construct {
  private readonly keyWord: string;
  value: T;

  constructor(parent: Scope, keyWord: string, value: T) {
    super(parent);
    this.keyWord = keyWord;
    this.value = value;
  }
}
