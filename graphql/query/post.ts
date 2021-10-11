import { arg, extendType, intArg, stringArg } from "nexus"
import { Context } from "@graphql/common/context"
import {post} from "../schema/post"
import { getInterval } from "../common/date/interval"

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
    
    t.list.field('posts_trend',{
      type : post,
      description:"정해진 기간 동안 집계된 인기순의 개시글의 가져옵니다.",
      args:{
        interval: arg({
          type: 'String',
          default: 'week',
          description: '트랜드 집계 기간 : "day" | "week" | "month" | "year"',
        }),
        skip: intArg(),
        take: intArg(),
        cursor: stringArg()
      },
      async resolve(_, args, ctx: Context) {
        return await ctx.db.post.findMany({
          skip: args.skip,
          take: args.take,
          cursor: args.cursor,
          where: {
            hidden: false,
            created_at: {
              gt:getInterval(args.interval)
            },
          },
          orderBy: {
            score :"desc"
          }
        })
      },
    })
  },
})
