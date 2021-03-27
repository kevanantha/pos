import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'

import Router from './routes'
import { __prod__ } from './constants'
import { initDb } from './config/database'
import session from './config/session'

const app = express()
export let orm: any

initDb()
  .then(() => {
    console.log('db')
  })
  .catch((err) => {
    console.log(`Database connection error: ${err}`)
  })

app.use(session)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/', Router)

export default app
