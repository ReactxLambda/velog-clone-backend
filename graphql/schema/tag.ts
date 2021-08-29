import { objectType } from 'nexus'

export const tag = objectType({
  name: 'tag',
  definition(t) {
    t.model.name()
    t.model.post_tag_ref()
    t.model.created_at()
  },
})
