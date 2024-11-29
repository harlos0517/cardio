import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

export const DEV = process.env.NODE_ENV === 'development'
export const PROD = process.env.NODE_ENV === 'production'
export const TEST = process.env.NODE_ENV === 'test'

export const PROTOCOL = DEV ? 'http' : 'https'

export const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost'
export const DATABASE_PORT = Number.parseInt(process.env.DATABASE_PORT || '5432')
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'postgres'
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'postgres'
export const DATABASE_NAME = process.env.DATABASE_NAME || 'cardio_dev'
export const DATABASE_TEST_NAME = process.env.DATABASE_TEST_NAME || 'cardio_test'

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
export const REDIS_PORT = Number.parseInt(process.env.REDIS_PORT || '6379')
export const SESSION_SECRET = process.env.SESSION_SECRET || 'cardio'

export const BACKEND_HOST = process.env.BACKEND_HOST || 'localhost'
export const BACKEND_PORT = Number.parseInt(process.env.BACKEND_PORT || '6789')

if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET)
  throw Error('Discord client ID or secret not set')
export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET

// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
//   throw Error('Google client ID or secret not set')
// export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
// export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export const FRONTEND_HOST = process.env.FRONTEND_HOST || 'localhost'
export const FRONTEND_PORT = Number.parseInt(process.env.FRONTEND_PORT || '3000')

export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID
