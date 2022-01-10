import { createContext, useState } from "react";
import { setCookie, destroyCookie } from 'nookies';
import Router from 'next/router';

import { signInRequest } from "@/services/auth";
import { api } from "@/services/api";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface SignInData {
  email: string;
  password: string;
  google?: boolean;
  avatar?: string;
  name?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user;

  async function signIn({ email, password, google, avatar, name: userName }: SignInData) {
    const { token, user: {id, name, avatar: avatar_url} } = await signInRequest({
      email,
      password,
      google,
      avatar,
      name: userName
    })

    const loggedUser = {id, name, email, avatar: avatar_url}
    setUser(loggedUser)

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    setCookie(undefined, 'nextauth.avatar', avatar_url, {
      maxAge: 60 * 60 * 5, // 5 hour
    })

    setCookie(undefined, 'nextauth.name', name, {
      maxAge: 60 * 60 * 5, // 5 hour
    })
    
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    Router.push('/');
  }

  async function logout() {
    destroyCookie(undefined, 'nextauth.token');
    destroyCookie(undefined, 'nextauth.avatar');
    destroyCookie(undefined, 'nextauth.name');
    Router.push('/signin');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}