import { PrismaClient } from "@prisma/client"
import {AuthJWT} from "../oauth/jwt"


export type Context = {
  db: PrismaClient,
  jwt: AuthJWT
}

