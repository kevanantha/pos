import { EntityManager, MikroORM } from '@mikro-orm/core'
import { AsyncLocalStorage } from 'async_hooks'
import { NextFunction, Request, Response } from 'express'
import mikroOrmConfig from '../mikro-orm.config'
import app from '../server'

/**
 * refs:
 * https://mikro-orm.io/docs/identity-map#why-is-request-context-needed
 * https://www.freecodecamp.org/news/async-local-storage-nodejs/
 * https://mikro-orm.io/docs/async-local-storage/
 */
const storage = new AsyncLocalStorage<EntityManager>()

export interface IDI {
  orm: MikroORM
  em: EntityManager
}

/**
 * Dependency injection
 * refs: https://github.com/mikro-orm/express-ts-example-app/blob/e875544b9f6d1ba822c37be82ab0d90564f8e0e3/app/server.ts#L8-L22
 */
export const DI = {} as IDI

export const initDb = (): Promise<IDI> => {
  return new Promise(async (resolve, reject) => {
    try {
      const orm = await MikroORM.init({
        ...mikroOrmConfig,
        context: () => storage.getStore()
      })

      DI.orm = orm
      DI.em = orm.em

      app.use(async (_req: Request, _res: Response, next: NextFunction) => {
        storage.run(DI.em.fork(true, true), next)
      })

      resolve(DI)
    } catch (err) {
      reject(err)
    }
  })
}
