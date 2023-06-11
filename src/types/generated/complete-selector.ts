import { Scalar } from "../simple";

export type CompleteSelector<T> = {
  [Key in keyof T]: T[Key] extends Scalar
    ? true
    : T[Key] extends Array<infer U>
    ? CompleteSelector<U>
    : T[Key] extends (args: infer A) => infer R
    ? [A, CompleteSelector<R>]
    : CompleteSelector<T[Key]>;
};
