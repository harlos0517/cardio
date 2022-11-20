import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

import FS from 'fs'

import express from 'express'
import expressSession from 'express-session'
import bodyParser from 'body-parser'
import passport from 'passport'
import mongoose from 'mongoose'
import cors from 'cors'
import passportGoogleOauth from 'passport-google-oauth20'
import https from 'https'

import { UserDoc, UserModel } from '@/schema/user'

import userRouter from '@/route/user'
import postRouter from '@/route/post'

import { googleOauthCallback } from '@/middleware'

const App = express()
App.use(bodyParser.json())
App.use(bodyParser.urlencoded({ extended: true }))
App.use(
  cors({
    origin: [ process.env.FRONTEND_URL || '' ],
    credentials: true,
  }),
)
App.use(
  expressSession({
    secret: 'cardio',
    resave: false,
    saveUninitialized: false,
  }),
)
App.use(passport.initialize())
App.use(passport.session())

passport.use(UserModel.createStrategy())
passport.use(new passportGoogleOauth.Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: '/login/google/callback',
    passReqToCallback: true,
  },
  googleOauthCallback,
))
passport.serializeUser((user, done) => {
  done(null, user._id)
})
passport.deserializeUser(async(id, done) => {
  UserModel.findById(id, (err: mongoose.Error, user: UserDoc) => {
    done(err, user)
  })
})

mongoose.Schema.Types.String.checkRequired(v => v !== null)
App.use(userRouter)
App.use(postRouter)

if (process.env.MODE === 'development') {
  App.listen(process.env.BACKEND_PORT)
  console.log(`Express App listening on port ${process.env.BACKEND_PORT}`)
} else if (process.env.MODE === 'production') {
  const privateKey = FS.readFileSync(process.env.PRIVATE_KEY_PATH || '')
  const certificate = FS.readFileSync(process.env.CERTIFICATE_PATH || '')
  https.createServer({
    key: privateKey,
    cert: certificate,
  }, App).listen(process.env.BACKEND_PORT)
  console.log(`Express App listening on port ${process.env.BACKEND_PORT}`)
}

mongoose.connect(process.env.MONGO_DB_URL || '', {
  user: process.env.MONGO_DB_USER,
  pass: process.env.MONGO_DB_PWD,
  authSource: 'admin',
})
console.log(`Connected to MongoDB ${process.env.MONGO_DB_URL}`)
