import express, { Router } from 'express'
import UserController from '../controllers/User'
const User: Router = express.Router()

User.post('/create', UserController.create)
User.post('/login', UserController.login)
User.get('/:username', UserController.getUser)

export default User
