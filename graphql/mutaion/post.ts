import { extendType } from "nexus"
import { v4 as uuidv4 } from "uuid"
import { Context } from "@graphql/common/context"

export const Post = extendType({
  type: "Mutation",
  definition: (t) => {
    t.crud.createOnepost({
      description: "유저의 게시글을 만듭니다.",
      computedInputs: {
        id: () => "",
        user: () => ""
      },
      async resolve(_, args, ctx: Context, __, ___) {
        const payload = await ctx.jwt.validate()
        const post = await ctx.db.post.create({
          data : {
            id : uuidv4(),
            content : args.data.content,
            pre_content : args.data.pre_content,
            title : args.data.title,
            url : args.data.url,
            created_at : new Date(),
            hidden : args.data.hidden,
            comment_count : 0,
            like_count : 0,
            score: 0,
            user_id : payload.id
          }
        })

        return post
      },
    })
  },
})
