import { objectType } from 'nexus'

export const read = objectType({
  name: 'read',
  definition(t) {
    t.model.post()
    t.model.user()
    t.model.created_at()
  },
})
