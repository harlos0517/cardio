import mongoose, { Model, Document } from 'mongoose'

import { Post } from '@api/post'
import { schemaRequireAll } from '@/util/schema'

export interface PostDoc extends Post, Document {}

const PostSchema = new mongoose.Schema({
  userId: String,
  createdAt: Date,
  content: String,
})
schemaRequireAll(PostSchema)
export const PostModel: Model<PostDoc> = mongoose.model('Post', PostSchema)
