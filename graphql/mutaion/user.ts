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
        velog_name: () => "",
      },
      async resolve(root, args, ctx, info, originalResolve) {
        const ci = await verifyGoogle("")
        const user = {
            ...args,
            velog_name: args.id
        }
        return await originalResolve(root, user, ctx, info)
      },
    })
    t.field("oAuthGoogle", {
        description: "인가 토큰을 받아 google oauth에 인증 받습니다.",
        args :{
            token: nonNull(stringArg())
        },
        type: "Json",
        async resolve(_, args, ctx: Context) {
            const ci = await verifyGoogle(args.token)
            return ci
        },
    })
  },
})
