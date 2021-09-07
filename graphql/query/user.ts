import { extendType } from "nexus"
import { Context } from "@graphql/context"

export const User = extendType({
  type: "Query",
  definition: (t) => {
    t.crud.user()
    t.crud.users()
  },
})
