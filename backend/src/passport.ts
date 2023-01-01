
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import passportGoogleOauth from 'passport-google-oauth20'

import { UserDoc, UserModel } from '@/schema/user'
import { googleOauthCallback } from '@/middleware'

const router = express.Router()

router.use(passport.initialize())
router.use(passport.session())

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

export default router
