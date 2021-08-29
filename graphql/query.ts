import { queryType } from 'nexus'

export default queryType({
  definition: (t) => {
    t.crud.comment()
    t.crud.comments()
    t.crud.interest()
    t.crud.interests()
    t.crud.postGroup()
    t.crud.postGroups()
    t.crud.postTagRef()
    t.crud.postTagRefs()
    t.crud.postTemp()
    t.crud.postTemps()
    t.crud.post()
    t.crud.posts()
    t.crud.read()
    t.crud.reads()
    t.crud.tag()
    t.crud.tags()
    t.crud.user()
    t.crud.users()
  },
})
