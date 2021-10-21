import { extendType, nonNull, stringArg } from "nexus"
import { verifyGoogle } from "../common/oauth/google.oauth"
import { Context } from "@graphql/common/context"

export const User = extendType({
  type: "Mutation",
  definition: (t) => {
    
    t.crud.createOneuser({
      description: "신규 유저를 가입 시킵니다.",
      computedInputs: {
        velog_name: () => "",
      },
      async resolve(root, args, ctx: Context, info, originalResolve) {
        const user = await ctx.db.user.create({
          data:{
            id : args.data.id,
            email : args.data.email,
            velog_name : args.data.id,
            image: args.data.image,
            social: args.data.social,
            introduction: args.data.introduction,
          }
        })
        const token = ctx.jwt.getToken({type : "access", id : user.id})
        return {
          ...user,
          token,
        }
      },
    })

    t.field("validate_id",{
      type:"Json",
      description:"회원 가입시 id의 유효성을 검사합니다.",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, args, ctx: Context) {
        const user = await ctx.db.user.findUnique({
          where: {
            id: args.id
          }
        })
        if(user)
          return {
            message : "이미 사용중인 아이디입니다.",
            status : "success"
          }
        return {
          message : "사용 가능한 아이디입니다.",
          status : "success"
        }
      },
    })

    t.field("oAuthGoogle", {
      description: "인가 토큰을 받아 google oauth에 인증 받습니다.",
      args: {
        token: nonNull(stringArg()),
      },
      type: "Json",
      async resolve(_, args, ctx: Context) {
        const ci = await verifyGoogle(args.token)
        const user = await ctx.db.user.findUnique({
          where: {
            email : ci.email
          }
        })
        if(user){
          const token = ctx.jwt.getToken({type : "access", id : user.id})
          return {
            ...user,
            is_member: true,
            token,
          }
        }
        return {
          is_member: false,
          email : ci.email,
          profile_image: ci.picture 
        }
      },
    })

    t.field("deleteOneuser", {
      type: "user",
      description: "회원을 탈퇴 시킵니다.",
      async resolve(_, args, ctx: Context) {
        const payload = await ctx.jwt.validate()
        
        const user = await ctx.db.user.delete({
          where:{
            id:payload.id
          }
        })
        return user
      }
    })

  },
})
