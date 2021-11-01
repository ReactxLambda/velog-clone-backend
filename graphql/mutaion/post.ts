import { extendType } from "nexus"
import { v4 as uuidv4 } from "uuid"
import { Context } from "@graphql/common/context"

export const Post = extendType({
  type: "Mutation",
  definition: (t) => {
    t.crud.createOnepost({
      description: "유저의 게시글을 만듭니다.(access token)",
      computedInputs: {
        id: () => "",
        user: () => "",
        comment_count : () => 0,
        like_count : () => 0,
        score: () => 0,
      },
      async resolve(_, args, ctx: Context, __, ___) {
        const payload = await ctx.jwt.validate()
        if(!args.data.url){
          args.data.url = args.data.title.trim().replace(/ /gi, "-")
        }
        const postUrl = await ctx.db.post.findFirst({
          where:{
            user_id : payload.id,
            url : args.data.url
          }
        })
        if(!postUrl){
          args.data.url = args.data.url + +(new Date())
        }
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

    t.field("uploadPostImage", {
      type: "Json",
      description : "image file의 정보를 받아 파일을 업로드 할수 있는 url을 반환 합니다.",
      args :{
        mime: "String",
        file_name: "String",
      },
      async resolve(_, args, ctx: Context, ____){
        const payload = await ctx.jwt.validate()
        const imageId = uuidv4()
        const preSignedUrl = await ctx.s3.createPreSignUrl(`${payload.id}/${imageId}/${args.file_name}`, args.mime)
        return {
          key : `https://velog-clone-images.s3.ap-northeast-2.amazonaws.com/${payload.id}/${imageId}/${args.file_name}`,
          url : preSignedUrl
        }
      }
    })
    
  },
})
