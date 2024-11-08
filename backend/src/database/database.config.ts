import { DataSource, DataSourceOptions } from 'typeorm'

import { Post } from '@/post/post.entity'
import { User } from '@/user/user.entity'

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'cardio_test',
  entities: [User, Post],
  synchronize: false,
  migrations: ['./src/database/migrations/*.ts'],
}

export default new DataSource(databaseConfig)
