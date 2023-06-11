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
  getUser: (args: {id: string}) => User
};

const query = make<Query>();

describe("inference", () => {
  it("should infer the result of simple queries", () => {
    const selector = query({
      currentUser: {
        name: true,
        location: {
          zip: true,
        },
      },
    });

    const result = null as unknown as Infer<typeof selector>;

    expectTypeOf(result).toEqualTypeOf<{
      currentUser: {
        name: string;
        location: {
          zip: number;
        };
      };
    }>();
  });

  it("should infer the result of constant queries", () => {
    const selector = query({
      currentUser: {
        name: true,
        location: {
          zip: true,
        },
      },
    } as const);

    const result = null as unknown as Infer<typeof selector>;

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
    const selector = query({
      currentUser: {
        org: {
          members: {
            id: true,
          },
        },
      },
    });

    const result = null as unknown as Infer<typeof selector>;

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
    const selector = query({
      currentUser: {
        org: {
          leader: {
            name: true,
          },
        },
      },
    });

    const result = null as unknown as Infer<typeof selector>;

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

  it("should infer the result of queries with arguments", () => {
    const selector = query({
      getUser: [{id: 'mullholland'}, {
        name: true
      }]
    } as const); // const is necessary for queries containing tuples

    const result = null as unknown as Infer<typeof selector>;

    expectTypeOf(result).toEqualTypeOf<{
      getUser: {
        name: string
      }
    }>();
  });
});
