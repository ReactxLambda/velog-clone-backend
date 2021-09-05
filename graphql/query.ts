import { queryType } from 'nexus'
import { Context } from './context'


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
    t.crud.post({
      description:"개시글을 가져옵니다.",
      async resolve(root, args, ctx: Context, info, originalResolve) {
        return ctx.db.post.findFirst({
          where :{
            hidden: false
          }
        })
       }
    })
    t.crud.posts({
      description:"모든 개시글을 가져옵니다.",
      filtering: {
        user_id: true
      },
      ordering: {
        created_at: true,
      },
      async resolve(_, args, ctx : Context, __, ___) {
        return await ctx.db.post.findMany({
          where:{
            hidden: false
          },
          ...args
        })  
      }
    })
    t.crud.read()
    t.crud.reads()
    t.crud.tag()
    t.crud.tags()
    t.crud.user()
    t.crud.users()
  },
})
