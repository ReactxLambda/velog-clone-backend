import { objectType } from "nexus"

export const post_temp = objectType({
  name: "post_temp",
  definition(t) {
    t.model.post()
    t.model.content()
    t.model.title()
    t.model.post_id()
  },
})
