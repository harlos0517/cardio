import { DataSource, DataSourceOptions } from 'typeorm'

import { Post } from '@/post/post.entity'
import { User } from '@/user/user.entity'

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'cardio',
  entities: [User, Post],
  synchronize: false,
  migrations: ['./src/database/migrations/*.ts'],
}

export default new DataSource(databaseConfig)
