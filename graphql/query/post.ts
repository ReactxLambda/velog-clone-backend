import { arg, extendType, intArg, stringArg } from "nexus"
import { Context } from "@graphql/common/context"
import {post} from "../schema/post"
import { getInterval } from "../common/date/interval"

export const Post = extendType({
  type: "Query",
  definition: (t) => {
    t.field('onePost',{
      type : post,
      description:"user id와 post url로 하나의 게시글을 가져옵니다.",
      args:{
        user_id: arg({
          type: 'String',
          description: '유저의 id"',
        }),
        post_url: arg({
          type: 'String',
          description: '게시글의 url"',
        }),
      },
      async resolve(_, args, ctx: Context) {
        const post = await ctx.db.post.findFirst({
          select : {
            comment : true,
            user : true,
            read : true,
            comment_count : true,
            content : true,
            created_at : true,
            hidden : true,
            id : true,
            interest : true,
            like_count : true,
            post_tag_ref : true,
            post_temp : true,
            pre_content : true,
            read_count : true,
            score : true,
            thumbnail : true,
            title : true,
            url : true,
            user_id : true
          },
          where :{
            user_id : args.user_id,
            url : args.post_url
          }
        })
        console.log(post)
        return post
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
