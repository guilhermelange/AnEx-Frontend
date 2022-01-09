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
  name?: string;
}

export async function signInRequest(data: SignInRequestData) {
  const {email, password, google, avatar, name } = data;
  if (!email || (!password && !google)) {
      throw new Error('Preencha e-mail e senha para continuar!')
  } else {
      try {
          if (google) {
            try {
              console.log(`${name} - ${email} - ${password} - ${avatar}`)
              const response = await api.post("/users", { name, email, password, avatar });
              console.log('response: ' + response.data)
            } catch(error) {
              console.log(error.message);
            }
          }

          const response = await api.post("/sessions", { email, password, google});
          const {token, user} = response.data;
          return {token, user};
      } catch (err) {
        throw new Error('Usuário ou senha incorretos.')
      }
  }
} 