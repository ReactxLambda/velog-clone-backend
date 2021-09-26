import { user } from "@graphql/schema/user"
import { extendType, nonNull, stringArg } from "nexus"
import { verifyGoogle } from "../common/oauth/google.oauth"
import { Context } from "@graphql/common/context"

export const User = extendType({
  type: "Mutation",
  definition: (t) => {
    
    t.crud.createOneuser({
      description: "신규 유저를 가입 시킵니다.",
      computedInputs: {
        velog_name: (res) => res.args.data.id,
      },
      async resolve(root, args, ctx, info, originalResolve) {
        console.log(args)
        return await originalResolve(root, args, ctx, info)
      },
    })

    t.field("validate_id",{
      type:"Json",
      description:"회원 가입시 id의 유효성을 검사합니다.",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, args, ctx: Context) {
        console.log(args)
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
        if(user)
          return {
            ...user,
            is_member: true
          }
        return {
          is_member: false,
          email : ci.email,
          profile_image: ci.picture 
        }
      },
    })
  },
})
