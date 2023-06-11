import { SelectionResult } from "./selection-result";
type CompleteSelector<T> = { [Key in keyof T]: Key extends Scalar ? true : T[Key] extends Array<infer U> ? CompleteSelector<U> : CompleteSelector<T[Key]> };
type Selector<S, T> = CompleteSelector<T> extends S ? (S & {
  __resultType: SelectionResult<S, T>;
}) : never;