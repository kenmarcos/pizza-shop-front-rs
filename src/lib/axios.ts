import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true, // cookies should be sent from front-end to back-end
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    // antes de todas as requisições do axios, essa função será chamada
    // config são os dados da requisição (body, headers, etc)

    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    ) // delay de 2 segundos

    return config
  })
}
