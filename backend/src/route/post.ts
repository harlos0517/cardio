import express from 'express'

import { PostModel } from '@/schema/post'
import * as PostApi from '@api/post'

import { auth } from '@/middleware'
import { typedRequestHandler } from '@/util/route'

const router = express.Router()

router.get('/post/:id',
  typedRequestHandler<PostApi.GetPost.Response>(async(req, res, _next) => {
    const { id } = req.params
    const post = await PostModel.findById(id)
    if (!post) return res.sendStatus(404)
    res.status(200).send({ data: post })
  }),
)

router.get('/posts/latest',
  typedRequestHandler<PostApi.GetLatestPosts.Response>(async(req, res, _next) => {
    const posts = await PostModel.find({}).sort({ createdAt: 'desc' }).select('_id')
    const postIds = posts.map(({ _id }) => _id)
    res.status(200).send({ data: postIds })
  }),
)

router.get('/posts/me', auth,
  typedRequestHandler<PostApi.GetLatestPosts.Response>(async(req, res, _next) => {
    const userId = req.session.user?._id
    const posts = await PostModel.find({ userId }).select('_id')
    const postIds = posts.map(({ _id }) => _id)
    res.status(200).send({ data: postIds })
  }),
)

router.post('/post', auth,
  typedRequestHandler<PostApi.CreatePost.Response, PostApi.CreatePost.Request>(async(req, res, _next) => {
    const { content } = req.body
    const userId = req.session.user?._id
    if (!content) return res.status(401).send({ error: 'Content cannot be blank.' })
    const newPost = await PostModel.create({
      userId,
      createdAt: Date.now(),
      content,
    })
    const data: PostApi.CreatePost.Response = newPost
    res.status(200).send({ data })
  }),
)

export default router
