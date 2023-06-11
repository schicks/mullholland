import { Scalar, ValidatedSelector } from "../simple";
import { CompleteSelector } from "./complete-selector";

type Selected<S, T> = T extends Scalar
  ? T
  : T extends Array<infer U>
  ? Array<SelectionResult<S, U>>
  : T extends (args: infer A) => infer R
  ? S extends [A, infer SR]
    ? SelectionResult<SR, R>
    : never
  : SelectionResult<S, T>;
export type SelectionResult<S, T> = CompleteSelector<T> extends S
  ? {
      [Key in keyof S]: Key extends keyof T
        ? Selected<S[Key], T[Key]>
        : "keys of S are keys of T, so this case is impossible but hard to prove";
    }
  : "invalid selector. S is not a selector for T.";
export type Selector<S, T> = CompleteSelector<T> extends S
  ? S & ValidatedSelector<SelectionResult<S, T>>
  : "invalid selector. S is not a selector for T.";
