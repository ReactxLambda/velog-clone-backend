import { extendType } from "nexus"
import { v4 as uuidv4 } from "uuid"
import { Context } from "@graphql/common/context"

export const Post = extendType({
  type: "Mutation",
  definition: (t) => {
    t.crud.createOnepost({
      description: "유저의 게시글을 만듭니다.",
      computedInputs: {
        id: () => uuidv4(),
      },
      async resolve(root, args, ctx, info, originalResolve) {
        //추가 작업
        return await originalResolve(root, args, ctx, info)
      },
    })
  },
})
