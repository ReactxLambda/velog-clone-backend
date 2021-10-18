import { extendType } from "nexus"
import { Context } from "@graphql/common/context"

export const Tag = extendType({
  type: "Query",
  definition: (t) => {
    t.crud.tag()
    t.crud.tags()
    t.crud.postTagRef()
    t.crud.postTagRefs()
  },
})
