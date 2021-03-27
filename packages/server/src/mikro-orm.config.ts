import dotenv from 'dotenv'
dotenv.config()
import { Options } from '@mikro-orm/core'
import { __prod__ } from './constants'
import path from 'path'
import { User } from './entities/User'

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/
  },
  entities: [User],
  entitiesTs: [path.join(__dirname, './entities/**/*.ts')],
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: `${process.env.DB_NAME}_${process.env.NODE_ENV}`,
  type: process.env.DB_TYPE,
  debug: !__prod__
} as Options
