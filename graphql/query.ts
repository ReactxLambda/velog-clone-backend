import { queryType } from 'nexus'

export default queryType({
  definition: (t) => {
    t.crud.user()
    t.crud.post()
  },
})
