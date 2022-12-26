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
    const limit = Number(req.query.limit as string) || 8
    const beforeId = req.query.beforeId as string || null
    let beforePost = null
    try {
      beforePost = await PostModel.findById(beforeId)
    } catch (err) {
      console.error('Error finding Post with _id ' + beforeId)
    }
    const beforeTime = beforePost?.createdAt || null
    const query = beforeTime ? { 'createdAt': { '$lt': new Date(beforeTime) } } : {}
    const option = {
      sort: { createdAt: 'desc' },
      select: '_id',
      limit,
    }
    const posts = await PostModel.paginate(query, option)
    const postIds = posts.docs.map(({ _id }) => _id)
    res.status(200).send({ data: postIds })
  }),
)

router.get('/posts/me', auth,
  typedRequestHandler<PostApi.GetLatestPosts.Response>(async(req, res, _next) => {
    const userId = req.session.userId
    const posts = await PostModel.find({ userId }).select('_id')
    const postIds = posts.map(({ _id }) => _id)
    res.status(200).send({ data: postIds })
  }),
)

router.post('/post', auth,
  typedRequestHandler<PostApi.CreatePost.Response, PostApi.CreatePost.Request>(async(req, res, _next) => {
    const { content } = req.body
    const userId = req.session.userId
    try {
      const newPost = await PostModel.create({
        userId,
        createdAt: Date.now(),
        content,
      })
      const data: PostApi.CreatePost.Response = newPost
      res.status(200).send({ data })
    } catch (err) {
      const error = err as Error
      res.status(400).send({ error: error.message })
    }
  }),
)

export default router
