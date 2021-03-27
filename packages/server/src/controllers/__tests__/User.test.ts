import app from '../../server'
import request from 'supertest'
import { redisClient } from '../../config/redis'

afterAll(() => {
  redisClient.quit()
})

describe('user controller', () => {
  it('user not found', (done) => {
    request(app)
      .get('/users/jev')
      .end((_, res) => {
        expect(res.status).toBe(404)
        expect(res.body).toEqual({
          error: {
            name: 'NotFoundError'
          }
        })
        done()
      })
  })
})
