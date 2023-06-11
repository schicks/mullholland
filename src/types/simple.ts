export type Scalar = string | number | boolean | undefined | null;

export type Simplify<T> = T extends Function //eslint-disable-line @typescript-eslint/ban-types
  ? T
  : { [K in keyof T]: Simplify<T[K]> };

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidatedSelector<T = any> = { __resultType: T };

export type Infer<S extends ValidatedSelector> = Simplify<S["__resultType"]>;
