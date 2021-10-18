import { arg, extendType } from "nexus"
import { v4 as uuidv4 } from "uuid"
import { Context } from "@graphql/common/context"

export const Tag = extendType({
  type: "Mutation",
  definition: (t) => {
    t.crud.createOnetag({
      description: "유저의 게시글을 만듭니다.",
      computedInputs: {
        created_at: () => "",
        post_tag_ref: () => ""
      },
      async resolve(_, args, ctx: Context, __, ___) {
        const alreadyExistTag = await ctx.db.tag.findUnique({
          where : {
            name: args.data.name
          }
        })

        if(alreadyExistTag){
          throw new Error("이미 존제하는 테그입니다.")
        }
        const tag = await ctx.db.tag.create({
          data:{
            name : args.data.name,
          }
        })
        return tag
      },
    })
  },
})
