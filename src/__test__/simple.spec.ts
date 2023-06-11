import { Simplify, Writeable } from "../types/simple";
import { describe, it } from "@jest/globals";
import { expectTypeOf } from "expect-type";

describe("Writeable", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const writeable = <T>(a: T): Simplify<Writeable<T>> => a as any;

  it("should remove readonly annotations", () => {
    expectTypeOf(writeable({ a: 5 } as const)).toEqualTypeOf<{
      a: 5;
    }>();
  });
});
