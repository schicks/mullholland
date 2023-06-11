# mullholland
A library for creating type safe graphql queries in typescript without code generation.

**WORK IN PROGRESS**. this is not usable in its current form.

Using graphql in typescript on the client side often involves code generation to expose compile time knowledge encoded in the graphql schema and SDL queries into types that can be used in your typescript code.
Code generation complicates the build process, adds cognitive overhead, and slows down development when queries are changing.

Instead of code generation, mullholland allows you to define your queries as simple objects within your typescript code. 
It can transform these objects into SDL for use with any graphql client library, and the result type of the query is inferrable without any code generation, allowing for instant updates when the query changes.

## Selectors
mullholland builds up queries as *selectors*, objects which represent a subset of your graph. Selectors are simple objects designed to look like the graphql SDL they correspond to.

```graphql
# in graphql SDL
query getMullhollandUser {
  getUser(id: 'mullholland') {
    name
    location {
      zip
    }
  }
}
```
```typescript
// in mullholland selectors
const getMullhollandUser = query({
  getUser: [{id: 'mullholland'}, {
    name: true,
    location: {
      zip: true
    }
  }]
})

type GetMullhollandUserResult = Infer<typeof getMullhollandUser> // return types without code generation!
```
