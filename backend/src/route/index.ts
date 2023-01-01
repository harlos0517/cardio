import express from 'express'

import userRouter from '@/route/user'
import postRouter from '@/route/post'

const router = express.Router()

router.use(userRouter)
router.use(postRouter)

export default router
