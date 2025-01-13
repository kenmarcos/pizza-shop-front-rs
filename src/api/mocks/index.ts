import { setupWorker } from 'msw/browser'

import { env } from '@/env'

export const worker = setupWorker()

export const enableMSW = async () => {
  if (env.MODE !== 'test') {
    return // criar a aplicação React normalmente
  }

  // se for "test", antes de criar a aplicação React, ligar o MSW (mocks)
  await worker.start()
}
