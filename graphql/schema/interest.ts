import { objectType } from "nexus"

export const interest = objectType({
  name: "interest",
  definition(t) {
    t.model.created_at()
    t.model.post()
    t.model.user()
  },
})
