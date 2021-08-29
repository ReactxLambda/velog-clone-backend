import { objectType } from 'nexus'

export const post_group = objectType({
  name: 'post_group',
  definition(t) {
    t.model.created_at()
    t.model.id()
    t.model.name()
    t.model.priority()
    t.model.user()
  },
})
