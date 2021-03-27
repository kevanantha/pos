import { Request, Response } from 'express'
import argon2 from 'argon2'
import { User } from '../entities/User'
import { DI } from '../config/database'

class UserController {
  static async create(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body
    const hashedPassword = await argon2.hash(password)

    const user = DI.em.create(User, {
      username,
      email,
      password: hashedPassword
    })

    try {
      await DI.em.persistAndFlush(user)

      req.session.userId = user.id.toString()

      res.status(201).json({
        user: {
          username,
          email
        },
        message: 'User created'
      })
    } catch (err) {
      res.status(404).json({ error: err })
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body

    try {
      if (!req.session.userId) {
        const user = await DI.em.findOneOrFail(User, { username })

        if (user) {
          const isValidPassword = await argon2.verify(user.password, password)

          if (isValidPassword) {
            req.session.userId = user.id.toString()

            res.status(200).json({ message: 'success login' })
          } else {
            res.status(404).json({ error: 'invalid username or password' })
          }
        } else {
          res.status(404).json({ message: 'user not found' })
        }
      } else {
        res.status(200).json({ message: 'you are already login' })
      }
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async getUser(req: Request, res: Response) {
    const { username } = req.params
    console.log('masuk di', DI)

    try {
      const user = await DI.em.findOneOrFail(User, { username })

      if (user) {
        res.status(200).json({
          user: {
            username: user.username,
            email: user.email
          }
        })
      }
    } catch (err) {
      res.status(404).json({ error: err })
    }
  }
}

export default UserController
