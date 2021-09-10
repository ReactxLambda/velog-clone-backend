import { extendType } from "nexus"
import { Context } from "@graphql/common/context"

export const Post = extendType({
  type: "Query",
  definition: (t) => {
    t.crud.post({
      description: "개시글을 가져옵니다.",
      async resolve(root, args, ctx: Context, info, originalResolve) {
        return ctx.db.post.findFirst({
          where: {
            hidden: false,
          },
        })
      },
    })
    t.crud.posts({
      description: "모든 개시글을 가져옵니다.",
      filtering: {
        user_id: true,
      },
      ordering: {
        created_at: true,
      },
      async resolve(_, args, ctx: Context, __, ___) {
        return await ctx.db.post.findMany({
          where: {
            hidden: false,
          },
          ...args,
        })
      },
    })
  },
})
