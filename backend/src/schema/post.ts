import mongoose, { Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import { Post } from '@api/post'
import { schemaRequireAll } from '@/util/schema'

export interface PostDoc extends Post, Document {}

const PostSchema = new mongoose.Schema({
  userId: String,
  createdAt: Date,
  content: String,
})
schemaRequireAll(PostSchema)
PostSchema.plugin(mongoosePaginate)

export const PostModel = mongoose.model<PostDoc, mongoose.PaginateModel<PostDoc>>('Post', PostSchema)
