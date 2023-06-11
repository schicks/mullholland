import { Scalar, ValidatedSelector } from "../simple";
import { CompleteSelector } from "./complete-selector";

type Selected<S, T> = T extends Scalar
  ? T
  : T extends Array<infer U>
  ? Array<SelectionResult<S, U>>
  : SelectionResult<S, T>;
export type SelectionResult<S, T> = CompleteSelector<T> extends S
  ? { [Key in keyof S]: Key extends keyof T ? Selected<S[Key], T[Key]> : never }
  : never;
export type Selector<S, T> = CompleteSelector<T> extends S
  ? S & ValidatedSelector<SelectionResult<S, T>>
  : never;
