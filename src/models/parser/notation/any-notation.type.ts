import { ObjectNotation } from "./object.notation";
import {NumberNotation} from "./number.notation";
import {StringNotation} from "./string.notation";
import {BigIntNotation} from "./big-int.notation";
import {ArrayNotation} from "./array-notation";
import {BooleanNotation} from "./boolean.notation";
import {RegexNotation} from "./regex.notation";

export declare type AnyNotation =
  ObjectNotation |
  NumberNotation |
  StringNotation |
  BigIntNotation |
  ArrayNotation |
  BooleanNotation |
  RegexNotation ;
