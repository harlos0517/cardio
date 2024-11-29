import RedisStore from 'connect-redis'
import session from 'express-session'

import redisClient from '@/redis/redis.config'

import { DEV, SESSION_SECRET } from '@/env.config'

export default async() => {
  const redisStore = new RedisStore({
    client: await redisClient().connect(),
    prefix: 'session:',
  })

  return session({
    store: redisStore,
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: !DEV,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    },
  })
}
