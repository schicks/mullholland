import { Infer, make } from "..";
import { describe, it } from "@jest/globals";
import { expectTypeOf } from "expect-type";

// sample graph types
type User = {
  id: string;
  name: string;
  org: Organization;
  location: Location;
};

type Location = {
  state: string;
  zip: number;
};

type Organization = {
  id: string;
  leader: User;
  second: User;
  members: User[];
};

type Query = {
  currentUser: User;
};

const query = make<Query>();

describe("inference", () => {
  it("should infer the result of simple queries", () => {
    const userName = query({
      currentUser: {
        name: true,
        location: {
          zip: true,
        },
      },
    });

    const result = null as unknown as Infer<typeof userName>;

    expectTypeOf(result).toEqualTypeOf<{
      currentUser: {
        name: string;
        location: {
          zip: number;
        };
      };
    }>();
  });

  it("should infer the result of queries with arrays", () => {
    const userName = query({
      currentUser: {
        org: {
          members: {
            id: true,
          },
        },
      },
    });

    const result = null as unknown as Infer<typeof userName>;

    expectTypeOf(result).toEqualTypeOf<{
      currentUser: {
        org: {
          members: {
            id: string;
          }[];
        };
      };
    }>();
  });

  it("should infer the result of queries with type cycles", () => {
    const userName = query({
      currentUser: {
        org: {
          leader: {
            name: true,
          },
        },
      },
    });

    const result = null as unknown as Infer<typeof userName>;

    expectTypeOf(result).toEqualTypeOf<{
      currentUser: {
        org: {
          leader: {
            name: string;
          };
        };
      };
    }>();
  });
});
