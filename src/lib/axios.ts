import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://www.globaldesk.com.br',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Domain': 'https://pizzashop.api-dev.deskree.com',
  },
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}
