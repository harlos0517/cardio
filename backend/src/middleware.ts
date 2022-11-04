import { Request, RequestHandler } from 'express'
import { Profile, VerifyCallback } from 'passport-google-oauth20'

import { UserModel } from '@/schema/user'

// auth middleware
export const auth: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) next()
  else res.status(401).send({ error: 'Not Authenticated' })
}

export const googleOauthCallback = (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback,
) => {
  const googleId = profile._json.sub
  const name = profile._json.name
  if (!googleId)
    return done('No Google ID provided')
  UserModel.findOne({ googleId }).then(user => {
    if (!user) {
      UserModel.create({ googleId, name }).then(user => {
        req.session.user = user
        done(null, user)
      })
    } else {
      req.session.user = user
      done(null, user)
    }
  })
}
