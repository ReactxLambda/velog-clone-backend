import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    take?: boolean
    skip?: boolean
    cursor?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime' | 'Json'

// Prisma model type definitions
interface PrismaModels {
  comment: Prisma.comment
  interest: Prisma.interest
  post: Prisma.post
  post_tag_ref: Prisma.post_tag_ref
  post_temp: Prisma.post_temp
  read: Prisma.read
  tag: Prisma.tag
  user: Prisma.user
  post_group: Prisma.post_group
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'user_id' | 'post_id' | 'reply_to' | 'text' | 'created_at' | 'post' | 'comment' | 'user' | 'other_comment'
      ordering: 'id' | 'user_id' | 'post_id' | 'reply_to' | 'text' | 'created_at'
    }
    interests: {
      filtering: 'AND' | 'OR' | 'NOT' | 'user_id' | 'post_id' | 'created_at' | 'post' | 'user'
      ordering: 'user_id' | 'post_id' | 'created_at'
    }
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'content' | 'created_at' | 'pre_content' | 'thumbnail' | 'url' | 'hidden' | 'user_id' | 'like_count' | 'read_count' | 'comment_count' | 'score' | 'user' | 'comment' | 'interest' | 'post_tag_ref' | 'post_temp' | 'read'
      ordering: 'id' | 'title' | 'content' | 'created_at' | 'pre_content' | 'thumbnail' | 'url' | 'hidden' | 'user_id' | 'like_count' | 'read_count' | 'comment_count' | 'score'
    }
    postTagRefs: {
      filtering: 'AND' | 'OR' | 'NOT' | 'tag_name' | 'post_id' | 'created_at' | 'post' | 'tag'
      ordering: 'tag_name' | 'post_id' | 'created_at'
    }
    postTemps: {
      filtering: 'AND' | 'OR' | 'NOT' | 'post_id' | 'content' | 'title' | 'post'
      ordering: 'post_id' | 'content' | 'title'
    }
    reads: {
      filtering: 'AND' | 'OR' | 'NOT' | 'user_id' | 'post_id' | 'created_at' | 'post' | 'user'
      ordering: 'user_id' | 'post_id' | 'created_at'
    }
    tags: {
      filtering: 'AND' | 'OR' | 'NOT' | 'name' | 'created_at' | 'post_tag_ref'
      ordering: 'name' | 'created_at'
    }
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'password' | 'email' | 'introduction' | 'image' | 'velog_name' | 'social' | 'comment' | 'interest' | 'post' | 'post_group' | 'read'
      ordering: 'id' | 'password' | 'email' | 'introduction' | 'image' | 'velog_name' | 'social'
    }
    postGroups: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'user_id' | 'priority' | 'created_at' | 'user'
      ordering: 'id' | 'name' | 'user_id' | 'priority' | 'created_at'
    }
  },
  comment: {
    other_comment: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'user_id' | 'post_id' | 'reply_to' | 'text' | 'created_at' | 'post' | 'comment' | 'user' | 'other_comment'
      ordering: 'id' | 'user_id' | 'post_id' | 'reply_to' | 'text' | 'created_at'
    }
  }
  interest: {

  }
  post: {
    comment: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'user_id' | 'post_id' | 'reply_to' | 'text' | 'created_at' | 'post' | 'comment' | 'user' | 'other_comment'
      ordering: 'id' | 'user_id' | 'post_id' | 'reply_to' | 'text' | 'created_at'
    }
    interest: {
      filtering: 'AND' | 'OR' | 'NOT' | 'user_id' | 'post_id' | 'created_at' | 'post' | 'user'
      ordering: 'user_id' | 'post_id' | 'created_at'
    }
    post_tag_ref: {
      filtering: 'AND' | 'OR' | 'NOT' | 'tag_name' | 'post_id' | 'created_at' | 'post' | 'tag'
      ordering: 'tag_name' | 'post_id' | 'created_at'
    }
    read: {
      filtering: 'AND' | 'OR' | 'NOT' | 'user_id' | 'post_id' | 'created_at' | 'post' | 'user'
      ordering: 'user_id' | 'post_id' | 'created_at'
    }
  }
  post_tag_ref: {

  }
  post_temp: {

  }
  read: {

  }
  tag: {
    post_tag_ref: {
      filtering: 'AND' | 'OR' | 'NOT' | 'tag_name' | 'post_id' | 'created_at' | 'post' | 'tag'
      ordering: 'tag_name' | 'post_id' | 'created_at'
    }
  }
  user: {
    comment: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'user_id' | 'post_id' | 'reply_to' | 'text' | 'created_at' | 'post' | 'comment' | 'user' | 'other_comment'
      ordering: 'id' | 'user_id' | 'post_id' | 'reply_to' | 'text' | 'created_at'
    }
    interest: {
      filtering: 'AND' | 'OR' | 'NOT' | 'user_id' | 'post_id' | 'created_at' | 'post' | 'user'
      ordering: 'user_id' | 'post_id' | 'created_at'
    }
    post: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'content' | 'created_at' | 'pre_content' | 'thumbnail' | 'url' | 'hidden' | 'user_id' | 'like_count' | 'read_count' | 'comment_count' | 'score' | 'user' | 'comment' | 'interest' | 'post_tag_ref' | 'post_temp' | 'read'
      ordering: 'id' | 'title' | 'content' | 'created_at' | 'pre_content' | 'thumbnail' | 'url' | 'hidden' | 'user_id' | 'like_count' | 'read_count' | 'comment_count' | 'score'
    }
    post_group: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'user_id' | 'priority' | 'created_at' | 'user'
      ordering: 'id' | 'name' | 'user_id' | 'priority' | 'created_at'
    }
    read: {
      filtering: 'AND' | 'OR' | 'NOT' | 'user_id' | 'post_id' | 'created_at' | 'post' | 'user'
      ordering: 'user_id' | 'post_id' | 'created_at'
    }
  }
  post_group: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    comment: 'comment'
    comments: 'comment'
    interest: 'interest'
    interests: 'interest'
    post: 'post'
    posts: 'post'
    postTagRef: 'post_tag_ref'
    postTagRefs: 'post_tag_ref'
    postTemp: 'post_temp'
    postTemps: 'post_temp'
    read: 'read'
    reads: 'read'
    tag: 'tag'
    tags: 'tag'
    user: 'user'
    users: 'user'
    postGroup: 'post_group'
    postGroups: 'post_group'
  },
  Mutation: {
    createOnecomment: 'comment'
    updateOnecomment: 'comment'
    updateManycomment: 'AffectedRowsOutput'
    deleteOnecomment: 'comment'
    deleteManycomment: 'AffectedRowsOutput'
    upsertOnecomment: 'comment'
    createOneinterest: 'interest'
    updateOneinterest: 'interest'
    updateManyinterest: 'AffectedRowsOutput'
    deleteOneinterest: 'interest'
    deleteManyinterest: 'AffectedRowsOutput'
    upsertOneinterest: 'interest'
    createOnepost: 'post'
    updateOnepost: 'post'
    updateManypost: 'AffectedRowsOutput'
    deleteOnepost: 'post'
    deleteManypost: 'AffectedRowsOutput'
    upsertOnepost: 'post'
    createOnepost_tag_ref: 'post_tag_ref'
    updateOnepost_tag_ref: 'post_tag_ref'
    updateManypost_tag_ref: 'AffectedRowsOutput'
    deleteOnepost_tag_ref: 'post_tag_ref'
    deleteManypost_tag_ref: 'AffectedRowsOutput'
    upsertOnepost_tag_ref: 'post_tag_ref'
    createOnepost_temp: 'post_temp'
    updateOnepost_temp: 'post_temp'
    updateManypost_temp: 'AffectedRowsOutput'
    deleteOnepost_temp: 'post_temp'
    deleteManypost_temp: 'AffectedRowsOutput'
    upsertOnepost_temp: 'post_temp'
    createOneread: 'read'
    updateOneread: 'read'
    updateManyread: 'AffectedRowsOutput'
    deleteOneread: 'read'
    deleteManyread: 'AffectedRowsOutput'
    upsertOneread: 'read'
    createOnetag: 'tag'
    updateOnetag: 'tag'
    updateManytag: 'AffectedRowsOutput'
    deleteOnetag: 'tag'
    deleteManytag: 'AffectedRowsOutput'
    upsertOnetag: 'tag'
    createOneuser: 'user'
    updateOneuser: 'user'
    updateManyuser: 'AffectedRowsOutput'
    deleteOneuser: 'user'
    deleteManyuser: 'AffectedRowsOutput'
    upsertOneuser: 'user'
    createOnepost_group: 'post_group'
    updateOnepost_group: 'post_group'
    updateManypost_group: 'AffectedRowsOutput'
    deleteOnepost_group: 'post_group'
    deleteManypost_group: 'AffectedRowsOutput'
    upsertOnepost_group: 'post_group'
  },
  comment: {
    id: 'String'
    user_id: 'String'
    post_id: 'String'
    reply_to: 'String'
    text: 'String'
    created_at: 'DateTime'
    post: 'post'
    comment: 'comment'
    user: 'user'
    other_comment: 'comment'
  }
  interest: {
    user_id: 'String'
    post_id: 'String'
    created_at: 'DateTime'
    post: 'post'
    user: 'user'
  }
  post: {
    id: 'String'
    title: 'String'
    content: 'String'
    created_at: 'DateTime'
    pre_content: 'String'
    thumbnail: 'String'
    url: 'String'
    hidden: 'Boolean'
    user_id: 'String'
    like_count: 'Int'
    read_count: 'Int'
    comment_count: 'Int'
    score: 'Int'
    user: 'user'
    comment: 'comment'
    interest: 'interest'
    post_tag_ref: 'post_tag_ref'
    post_temp: 'post_temp'
    read: 'read'
  }
  post_tag_ref: {
    tag_name: 'String'
    post_id: 'String'
    created_at: 'DateTime'
    post: 'post'
    tag: 'tag'
  }
  post_temp: {
    post_id: 'String'
    content: 'String'
    title: 'String'
    post: 'post'
  }
  read: {
    user_id: 'String'
    post_id: 'String'
    created_at: 'DateTime'
    post: 'post'
    user: 'user'
  }
  tag: {
    name: 'String'
    created_at: 'DateTime'
    post_tag_ref: 'post_tag_ref'
  }
  user: {
    id: 'String'
    password: 'String'
    email: 'String'
    introduction: 'String'
    image: 'String'
    velog_name: 'String'
    social: 'Json'
    comment: 'comment'
    interest: 'interest'
    post: 'post'
    post_group: 'post_group'
    read: 'read'
  }
  post_group: {
    id: 'String'
    name: 'String'
    user_id: 'String'
    priority: 'Json'
    created_at: 'DateTime'
    user: 'user'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  comment: Typegen.NexusPrismaFields<'comment'>
  interest: Typegen.NexusPrismaFields<'interest'>
  post: Typegen.NexusPrismaFields<'post'>
  post_tag_ref: Typegen.NexusPrismaFields<'post_tag_ref'>
  post_temp: Typegen.NexusPrismaFields<'post_temp'>
  read: Typegen.NexusPrismaFields<'read'>
  tag: Typegen.NexusPrismaFields<'tag'>
  user: Typegen.NexusPrismaFields<'user'>
  post_group: Typegen.NexusPrismaFields<'post_group'>
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
  