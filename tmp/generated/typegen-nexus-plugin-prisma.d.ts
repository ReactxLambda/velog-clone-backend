import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    take?: boolean
    skip?: boolean
    cursor?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'Bytes' | 'Json'

// Prisma model type definitions
interface PrismaModels {
  user: Prisma.user
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'password' | 'email' | 'introduction' | 'image' | 'velog_name' | 'Social'
      ordering: 'id' | 'password' | 'email' | 'introduction' | 'image' | 'velog_name' | 'Social'
    }
  },
  user: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'user'
    users: 'user'
  },
  Mutation: {
    createOneuser: 'user'
    updateOneuser: 'user'
    updateManyuser: 'AffectedRowsOutput'
    deleteOneuser: 'user'
    deleteManyuser: 'AffectedRowsOutput'
    upsertOneuser: 'user'
  },
  user: {
    id: 'String'
    password: 'String'
    email: 'String'
    introduction: 'Bytes'
    image: 'String'
    velog_name: 'String'
    Social: 'Json'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  user: Typegen.NexusPrismaFields<'user'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  