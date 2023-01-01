import express from 'express'

import { auth } from '@/middleware'
import * as Post from '@/controller/post'

const router = express.Router()

router.get('/post/:id', Post.getPost)
router.get('/posts/latest', Post.getLatestPosts)
router.get('/posts/me', auth, Post.getMyPosts)
router.post('/post', auth, Post.createPost)

export default router
