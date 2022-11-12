import express from 'express'
import passport from 'passport'

import { UserModel } from '@/schema/user'
import * as UserApi from '@api/user'

import { auth } from '@/middleware'

import { typedRequestHandler } from '@/util/route'

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
    res.status(200).send({ data: user })
  }),
)

router.put('/user/me',
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
