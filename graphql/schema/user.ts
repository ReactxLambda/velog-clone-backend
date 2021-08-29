import { objectType } from 'nexus'

export const user = objectType({
  name: 'user',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.velog_name()
    t.model.introduction()
    t.model.image()
    t.model.social()
  },
})
