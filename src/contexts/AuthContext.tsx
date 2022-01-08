import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
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
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user;

  async function signIn({ email, password, google, avatar }: SignInData) {
    const { token, user: {id, name, avatar: avatar_url} } = await signInRequest({
      email,
      password,
      google,
      avatar,
    })

    const loggedUser = {id, name, email, avatar: avatar_url}
    setUser(loggedUser)

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    setCookie(undefined, 'nextauth.avatar', avatar, {
      maxAge: 60 * 60 * 1, // 1 hour
    })
    
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}