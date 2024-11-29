import { DataSource, DataSourceOptions } from 'typeorm'

import { Post } from '@/post/post.entity'
import { User } from '@/user/user.entity'

import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from '@/env.config'

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: [User, Post],
  synchronize: false,
  migrations: ['./src/database/migrations/*.ts'],
}

export default new DataSource(databaseConfig)
