import { createClient } from 'redis'

import { REDIS_HOST, REDIS_PORT } from '@/env.config'

const redisClient = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` })
redisClient.on('error', console.error)

export default () => redisClient.duplicate()
