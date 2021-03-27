import dotenv from 'dotenv'
dotenv.config()
import session from 'express-session'
import { __prod__ } from '../constants'
import { RedisStore, redisClient } from './redis'

export default session({
  name: 'qid',
  store: new RedisStore({
    client: redisClient,
    disableTTL: false,
    disableTouch: false
  }),
  cookie: {
    httpOnly: true,
    secure: __prod__,
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years (in ms)
    sameSite: 'lax' // csrf
  },
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'bae suzy',
  resave: false
})
