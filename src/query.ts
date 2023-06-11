import { Selector } from "./types/generated/selection-result";
import { Writeable, Simplify } from "./types/simple";

/**
 * Entrypoint function for creating well typed selectors.
 *
 * Usage:
 *
 * ```
 * import { make, Infer } from 'mullholland';
 * import { Query } from './graphql-codegen-output';
 *
 * const query = make<Query>();
 *
 * const getUsers = query({
 *  getUsers: [
 *    {sortBy: 'name', offset: 10}
 *    {
 *      id: true,
 *      name: true,
 *      location: {
 *        state: true
 *      }
 *    }
 * ]
 * } as const)
 * type GetUsersResult = Infer<typeof getUsers>
 * ```
 */
export const make =
  <T>() =>
  <S>(s: S): Simplify<Selector<Writeable<S>, T>> =>
    s as any; //eslint-disable-line @typescript-eslint/no-explicit-any
