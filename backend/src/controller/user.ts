import express, { Request, Response } from 'express'
import passport from 'passport'
import multer from 'multer'
import sharp from 'sharp'

import { UserDoc, UserModel } from '@/schema/user'
import * as UserApi from '@api/user'

import { controller, fileController } from '@/util/controller'

const extractUserData = (user: UserDoc) => {
  const { email, googleId, name, username } = user
  return { email, googleId, name, username }
}

const findMe = async(req: Request, res: Response) => {
  const userId = req.session.userId
  if (!userId) { res.sendStatus(401); return null }
  const user = await UserModel.findById(userId)
  if (!user) { res.sendStatus(404); return null }
  return user
}


const router = express.Router()

export const getMe = controller<UserApi.GetMe.Response>(async(req, res, _next) => {
  const user = await findMe(req, res)
  if (!user) return
  res.status(200).send({ data: extractUserData(user) })
})

export const getUser = controller<UserApi.GetUser.Response>(async(req, res, _next) => {
  const { id } = req.params
  const user = await UserModel.findById(id)
  if (!user) return res.sendStatus(404)
  res.status(200).send({ data: extractUserData(user) })
})

export const getMyProfilePhoto = fileController(async(req, res, _next) => {
  const user = await findMe(req, res)
  if (!user) return
  res.contentType('image/jpg')
  res.send(user.profilePhoto)
})

export const getUserProfilePhoto = fileController(async(req, res, _next) => {
  const { id } = req.params
  const user = await UserModel.findById(id)
  if (!user) return res.sendStatus(404)
  res.contentType('image/jpg')
  res.send(user.profilePhoto)
})

export const updateMyName = controller<UserApi.EditName.Response, UserApi.EditName.Request>(async(req, res, _next) => {
  const user = await findMe(req, res)
  if (!user) return
  const { name } = req.body
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(user._id, { name }, { new: true })
    if (!updatedUser) return res.sendStatus(404)
    res.status(200).send({ data: updatedUser })
  } catch (err) {
    const error = err as Error
    res.status(400).send({ error: error.message })
  }
})

export const updateMyUsername = controller<UserApi.EditUsername.Response, UserApi.EditUsername.Request>(async(req, res, _next) => {
  const user = await findMe(req, res)
  if (!user) return
  const { username } = req.body
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(user._id, { username }, { new: true })
    if (!updatedUser) return res.sendStatus(404)
    res.status(200).send({ data: updatedUser })
  } catch (err) {
    const error = err as Error
    res.status(400).send({ error: error.message })
  }
})

export const uploadFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 16 * 1024 * 1024 },
}).single('file')

export const updateMyProfilePhoto = controller(async(req, res, _next) => {
  const { file } = req
  if (!file) return res.status(400).send({ error: 'Received nothing.' })
  const user = await findMe(req, res)
  if (!user) return
  try {
    const processedImage = await sharp(file.buffer).resize(256, 256).jpeg().toBuffer()
    await UserModel.findByIdAndUpdate(user._id, { profilePhoto: processedImage })
    res.sendStatus(200)
  } catch (err) {
    const error = err as Error
    res.status(400).send({ error: error.message })
  }
})

// export const login = controller<UserApi.Login.Response, UserApi.Login.Request>(async(req, res, _next) => {
//   const { username, password } = req.body
//   const { error, user } = await UserModel.authenticate()(username, password)
//   if (error) return res.status(400).send({ error: 'Login Error: \n' + error })
//   req.login(user, _err => {
//     req.session.userId = user._id
//     const data = extractUserData(user)
//     res.status(200).send({ data })
//   })
// })

export const loginGoogle = passport.authenticate(
  'google',
  { scope: ['profile', 'email'] },
)

export const loginGoogleCallback = passport.authenticate(
  'google',
  {
    successRedirect: `${process.env.FRONTEND_URL}/`,
    failureRedirect: `${process.env.FRONTEND_URL}/`,
  },
)

export const logout = controller((req, res) => {
  req.logout(err => res.status(500).send(err))
  res.sendStatus(200)
})

export default router
