import { PrismaClient } from "@prisma/client"
import {AuthJWT} from "../oauth/jwt"
import {S3Image} from "../aws/s3"


export type Context = {
  db: PrismaClient,
  jwt: AuthJWT,
  s3: S3Image
}

