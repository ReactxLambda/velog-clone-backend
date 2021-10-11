import * as jsonwebtoken from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import {user} from "../../schema/user"

type JWTUser = {
  id : string
  email : string
  velog_name : string
  introduction : string
  image : string
  social : string
}

type JWTPayload = {
  id : string
  type : "access" | "refersh"
  // exp : number
}

export class AuthJWT {
  private static instance: AuthJWT
  private static jwt: typeof jsonwebtoken
  private db : PrismaClient
  private bearer : string

  private constructor(db : PrismaClient, bearer : string){
    AuthJWT.instance = this
    AuthJWT.jwt = jsonwebtoken
    this.db = db
    this.bearer = bearer
  }

  static getInstance(db : PrismaClient, bearer : string) {
    if (!AuthJWT.instance) 
      AuthJWT.instance = new AuthJWT(db, bearer)
    return this.instance
  }

  getToken = (payload: JWTPayload) => {
    console.log( AuthJWT)
    return AuthJWT.jwt.sign({ ...payload }, this.getSecretKey)
  }

  getJWT = () => AuthJWT.jwt

  getSecretKey = process.env.JWT_SECRET

  validate = async () => {
    try{
      const bearerLength = "Bearer ".length
      if (this.bearer && this.bearer.length > bearerLength) {
        const token = this.bearer.slice(bearerLength)
        const payload = <JWTPayload>AuthJWT.jwt.verify(token, this.getSecretKey)
        return await this.db.user.findUnique({
          where : {
            id : payload.id
          }
        })
      }
    } catch(e) {
      console.error(e)
      throw new Error("jwt 인증 오류")
    }
  }
}