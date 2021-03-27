import { User } from '../entities/User'
import { initDb, IDI } from '../config/database'
let DI: IDI

beforeAll(async () => {
  DI = await initDb()
})

describe('asdf', () => {
  it('asdf', () => {
    expect(true).toBe(true)
  })
})

describe('ent', () => {
  it('ent', async () => {
    const user = DI.em.create(User, {
      username: 'ke',
      email: 'kasd@mail.com',
      password: '123'
    })
    expect(user).toHaveProperty('username')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('password')
    expect(user.username).toEqual('ke')
  })
})
