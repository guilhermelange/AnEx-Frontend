import '@/styles/global.css'
import type { AppProps } from 'next/app'
import SEO from '@/components/SEO'
import { AuthProvider } from '@/contexts/AuthContext'

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (<>
      <AuthProvider>
        <SEO title='AnEx'></SEO>
        <Component {...pageProps} />
      </AuthProvider>
  </>)
}

export default MyApp
