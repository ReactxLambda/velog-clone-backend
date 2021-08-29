import { objectType } from 'nexus'

export const post_tag_ref = objectType({
  name: 'post_tag_ref',
  definition(t) {
    t.model.post()
    t.model.tag()
  },
})
