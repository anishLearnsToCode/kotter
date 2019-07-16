import {Scope} from "./scope/scope.construct";

export interface CreatableFromString<T> {
  parseFromForParent(code: string, parent: Scope): T;
}
