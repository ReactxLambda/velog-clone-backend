import { objectType } from 'nexus'

export const comment = objectType({
  name: 'comment',
  definition(t) {
    t.model.created_at()
    t.model.comment()
    t.model.id()
    t.model.other_comment()
    t.model.post()
    t.model.reply_to()
    t.model.text()
    t.model.user()
  },
})
