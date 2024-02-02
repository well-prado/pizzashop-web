import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
}

export async function signIn({ email }: SignInBody) {
  await api.post('https://pizzashop.api-dev.deskree.com/api/v1/io/sign-in', {
    email,
  })
}
