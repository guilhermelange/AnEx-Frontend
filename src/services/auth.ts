import { parseCookies } from 'nookies'
import { api } from '@/services/api'

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export const isAuthenticated = () => {
  const { 'nextauth.token': token } = parseCookies();
  return !!token;
}

export const getToken = () => {
  const { 'nextauth.token': token } = parseCookies();
  return token;
}

interface SignInRequestData {
  email: string;
  password: string;
  google?: boolean;
  avatar?: string;
}

export async function signInRequest(data: SignInRequestData) {
  const {email, password, google, avatar} = data;
  if (!email || (!password && !google)) {
      throw new Error('Preencha e-mail e senha para continuar!')
  } else {
      try {
          const response = await api.post("/sessions", { email, password, avatar, google});
          const {token, user} = response.data;
          return {token, user};
      } catch (err) {
        throw new Error('Usuário ou senha incorretos.')
      }
  }
} 