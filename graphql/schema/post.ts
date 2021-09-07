import { objectType } from "nexus"

export const post = objectType({
  name: "post",
  definition(t) {
    t.model.id()
    t.model.pre_content()
    t.model.thumbnail()
    t.model.title()
    t.model.url()
    t.model.user()
    t.model.user_id()
    t.model.content()
    t.model.created_at()
    t.model.hidden()
    t.model.read()
    t.model.comment()
    t.model.interest()
    t.model.post_tag_ref()
    t.model.post_temp()
  },
})
