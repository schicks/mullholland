/** Standard graphql scalar types.
 *
 * Mostly used as base case for type recursions.
 */
export type Scalar = string | number | boolean | undefined | null;

/**
 * Improve user display of complex types.
 *
 * see [The display of types](https://effectivetypescript.com/2022/02/25/gentips-4-display/) for more context.
 */
export type Simplify<T> = T extends Function //eslint-disable-line @typescript-eslint/ban-types
  ? T
  : { [K in keyof T]: Simplify<T[K]> };

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidatedSelector<T = any> = { __resultType: T };

/**
 * Infers the result type of running a valid selector against graphql.
 */
export type Infer<S extends ValidatedSelector> = Simplify<S["__resultType"]>;

export type Writeable<T> = { -readonly [K in keyof T]: Writeable<T[K]> };
