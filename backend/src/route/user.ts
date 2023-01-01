import express from 'express'

import { auth } from '@/middleware'
import * as User from '@/controller/user'

const router = express.Router()

router.get('/user/me', auth, User.getMe)
router.get('/user/:id', User.getUser)
router.get('/user/me/photo', auth, User.getMyProfilePhoto)
router.get('/user/:id/photo', User.getUserProfilePhoto)

router.put('/user/me/name', auth, User.updateMyName)
router.put('/user/me/username', auth, User.updateMyUsername)
router.post('/user/profilePhoto', auth, User.uploadFile, User.updateMyProfilePhoto)

// router.post('/login', User.login)
router.post('/login/google', User.loginGoogle)
router.get('/login/google/callback', User.loginGoogleCallback)
router.post('/logout', auth, User.logout)

export default router
