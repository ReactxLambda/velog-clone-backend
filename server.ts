import { ApolloServer } from "apollo-server-lambda"
import { PrismaClient } from "@prisma/client"
import { asNexusMethod, makeSchema } from "nexus"
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema"
import * as path from "path"

import { Context } from "./graphql/common/context"

import { Schemas } from "./graphql/schema/schema"
import { Query } from "./graphql/query/index"
import { Mutaion } from "./graphql/mutaion/index"
import { GraphQLBigInt } from "./graphql/type"
import { AuthJWT } from "./graphql/common/oauth/jwt"
import { S3Image } from "./graphql/common/aws/s3"

const schema = makeSchema({
  types: [Query, Mutaion, Schemas, asNexusMethod(GraphQLBigInt, "BigInt")],
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      paginationStrategy: "prisma",
      prismaClient: (ctx: Context) => ctx.db,
      outputs: {
        typegen: path.join(
          `${process.env.NODE_ENV === "development" ? __dirname : ""}` +
            "/tmp/generated/typegen-nexus-plugin-prisma.d.ts",
        ),
      },
    }),
  ],
  outputs: {
    schema: path.join(
      `${process.env.NODE_ENV === "development" ? __dirname : ""}` +
        "/tmp/generated/schema.graphql",
    ),
    typegen: path.join(
      `${process.env.NODE_ENV === "development" ? __dirname : ""}` +
        "/tmp/generated/nexus.ts",
    ),
  },
})

const db = new PrismaClient()
const server = new ApolloServer({
  schema: schema,
  context: async ({ event }): Promise<Context> => {
    return ({
      db: db,
      jwt: AuthJWT.getInstance(db, event.headers.Authorization),
      s3: S3Image.getInstance()
    })
  }
  ,
  playground:
    process.env.NODE_ENV === "prod"
      ? false
      : {
          endpoint: `/${process.env.NODE_ENV === "development" ? "development" : process.env.NODE_ENV}/graphql`,
        },
})

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
})
