import express from 'express'
import passport from 'passport'
import multer from 'multer'

import { UserModel } from '@/schema/user'
import * as UserApi from '@api/user'

import { auth } from '@/middleware'

import { typedRequestHandler } from '@/util/route'

//setting options for multer
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 16 * 1024 * 1024 },
})

const router = express.Router()

router.get('/user/me', auth,
  typedRequestHandler<UserApi.GetMe.Response>((req, res, _next) => {
    const user = req.session.user
    if (!user) return res.sendStatus(401)
    const { email, googleId, name } = user
    const data = { email, googleId, name }
    res.status(200).send({ data })
  }),
)

router.get('/user/:id',
  typedRequestHandler<UserApi.GetMe.Response>(async(req, res, _next) => {
    const { id } = req.params
    const user = await UserModel.findById(id)
    if (!user) return res.sendStatus(404)
    const { email, googleId, name } = user
    const data = { email, googleId, name }
    res.status(200).send({ data })
  }),
)

router.get('/user/me/photo', auth,
  async(req, res, _next) => {
    const user = req.session.user
    if (!user) return res.sendStatus(401)
    const userDoc = await UserModel.findById(user._id)
    if (!userDoc) return res.sendStatus(404)
    res.contentType('image/jpg')
    res.send(userDoc.profilePhoto)
  },
)

router.get('/user/:id/photo',
  async(req, res, _next) => {
    const { id } = req.params
    const user = await UserModel.findById(id)
    if (!user) return res.sendStatus(404)
    res.contentType('image/jpg')
    res.send(user.profilePhoto)
  },
)

router.put('/user/me', auth,
  typedRequestHandler<UserApi.EditMe.Response, UserApi.EditMe.Request>(async(req, res, _next) => {
    const user = req.session.user
    if (!user) return res.sendStatus(401)
    const { name: rawName } = req.body
    const name = rawName.trim()
    if (!name) return res.status(400).send({ error: 'Name cannot be empty.' })
    const updatedUser = await UserModel.findByIdAndUpdate(user._id, { name }, { new: true })
    if (!updatedUser) return res.sendStatus(404)
    req.session.user = updatedUser
    res.status(200).send({ data: updatedUser })
  }),
)

router.post('/user/profilePhoto', auth,
  upload.single('file'),
  typedRequestHandler(async(req, res, _next) => {
    const { file } = req
    if (!file) return res.status(400).send({ error: 'Received nothing.' })
    const user = req.session.user
    if (!user) return res.sendStatus(401)
    await UserModel.findByIdAndUpdate(user._id, { profilePhoto: file.buffer })
    res.sendStatus(200)
  }),
)

// router.post('/login', async(req, res, _next) => {
//   const { username, password } = req.body as UserApi.Login.Request
//   const { error, user } = await UserModel.authenticate()(username, password)
//   if (error) return res.status(400).send({ error: 'Login Error: \n' + error })
//   req.login(user, _err => {
//     req.session.user = user as UserDoc
//     const data: UserApi.Login.Response = { email: user.email, googleId: user.googleId }
//     res.status(200).send({ data })
//   })
// })

router.post('/login/google',
  passport.authenticate(
    'google',
    { scope: ['profile', 'email'] },
  ),
)

router.get('/login/google/callback',
  passport.authenticate(
    'google',
    {
      successRedirect: `${process.env.FRONTEND_URL}/`,
      failureRedirect: `${process.env.FRONTEND_URL}/`,
    },
  ),
)

router.post('/logout', auth,
  typedRequestHandler((req, res) => {
    req.logout(err => res.status(500).send(err))
    res.sendStatus(200)
  }),
)

export default router
