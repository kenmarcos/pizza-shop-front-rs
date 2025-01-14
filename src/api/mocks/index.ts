import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { signInMock } from './sign-in-mock'

export const worker = setupWorker(signInMock)

export const enableMSW = async () => {
  if (env.MODE !== 'test') {
    return // criar a aplicação React normalmente
  }

  // se for "test", antes de criar a aplicação React, ligar o MSW (mocks)
  await worker.start()
}
