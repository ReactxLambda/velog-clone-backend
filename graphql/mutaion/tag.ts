import { arg, extendType, inputObjectType, list, nonNull, stringArg } from "nexus"
import { v4 as uuidv4 } from "uuid"
import { Context } from "@graphql/common/context"
import { post_tag_ref } from "../schema/post_tag_ref"

export const Tag = extendType({
  type: "Mutation",
  definition: (t) => {
    t.crud.createOnetag({
      description: "하나의 새로운 태그를 만듭니다.",
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

    t.field("createManypost_tag_ref", {
      description: "개시글에 태그를 추가합니다.\n 없는 태그를 입력시 생성후 게시글에 추가 합니다.(access token)",
      args: {
        post_id: nonNull(stringArg()),
        tags : nonNull(list(stringArg()))
      },
      type: list(post_tag_ref),
      async resolve(_, args, ctx: Context) {
        const payload = await ctx.jwt.validate()
        const post_count = await ctx.db.post.count({
          where:{
            user_id : payload.id,
            id: args.post_id
          }
        })
        if(post_count > 0){
          throw new Error("자신의 게시글이 아닙니다.")
        }

        const post_tag_ref_args = args.tags.map((data) => {  // post_tag_ref의 arg
          return {
            tag_name : data,
            post_id : args.post_id
          }
        })

        const tag_args = args.tags.map((data) => {return {name : data}}) // tag의 arg

        await ctx.db.tag.createMany({ // 없는 tag 생성
          data: tag_args,
          skipDuplicates: true,
        })
        console.log(tag_args)
        await ctx.db.post_tag_ref.createMany({  // 게시글에 테그 추가
          data :post_tag_ref_args,
          skipDuplicates: true,
        })

        const post_tag_refs = await ctx.db.post_tag_ref.findMany({  //테그 ref 조회
          select:{
            post: true,
            tag: true,
            created_at : true,
            post_id : true,
            tag_name : true,
          },
          where:{
            post_id : args.post_id
          }
        })
        return post_tag_refs
      },
    })

    t.field("deleteManypost_tag_ref", {
      description: "개시글에 태그를 삭제합니다.\n 없는 태그를 입력시 생성후 게시글에 추가 합니다.(access token)",
      args: {
        post_id: nonNull(stringArg()),
        tags : nonNull(list(stringArg()))
      },
      type: "String",
      async resolve(_, args, ctx: Context) {
        const payload = await ctx.jwt.validate()
        const post_count = await ctx.db.post.count({
          where:{
            user_id : payload.id,
            id: args.post_id
          }
        })
        if(post_count > 0){
          throw new Error("자신의 게시글이 아닙니다.")
        }
        
        const post_tag_ref_args = args.tags.map((data) => {  // post_tag_ref의 arg
          return {
            tag_name : data,
            post_id : args.post_id
          }
        })

        await ctx.db.post_tag_ref.deleteMany({  // 게시글에 테그 추가
          where :{
            post_id : args.post_id,
            tag_name : {
              contains : post_tag_ref_args.tag_name,
            }
          }
            
        })
        return "게시글의 태그를 삭제 했습니다."
      },
    })
  },
})
