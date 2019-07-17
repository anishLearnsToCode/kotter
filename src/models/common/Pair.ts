export class Pair<T, U> {
  private key: T;
  private value: U;

  constructor(key: T, value: U) {
    this.key = key;
    this.value = value;
  }
}
