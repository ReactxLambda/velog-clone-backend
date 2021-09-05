import { mutationType } from 'nexus'
import { v4 as uuidv4 } from 'uuid';

export default mutationType({
  definition: (t) => {
    t.crud.createOnepost({
      description: "유저의 게시글을 만듭니다.",
      computedInputs :{
        id : () => uuidv4()
      },
      async resolve(root, args, ctx, info, originalResolve) {
        //추가 작업
        return await originalResolve(root, args, ctx, info)
       }
    })
  },
})
