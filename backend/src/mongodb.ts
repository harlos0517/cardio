import mongoose from 'mongoose'

import { allowEmptyString } from '@/util/schema'

export default () => {
  allowEmptyString()

  mongoose.connect(process.env.MONGO_DB_URL || '', {
    user: process.env.MONGO_DB_USER,
    pass: process.env.MONGO_DB_PWD,
    authSource: 'admin',
  })
  console.log(`Connected to MongoDB ${process.env.MONGO_DB_URL}`)
}
