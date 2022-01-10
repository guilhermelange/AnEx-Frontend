import '@/styles/global.css'
import type { AppProps } from 'next/app'
import SEO from '@/components/SEO'
import { AuthProvider } from '@/contexts/AuthContext'
import { AnimeProvider } from '@/contexts/AnimeContext'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (<>
    <SEO title='AnEx' shouldExcludeTitleSuffix></SEO>
    <AuthProvider>
      <AnimeProvider>
        <Component {...pageProps} />
      </AnimeProvider>
    </AuthProvider>
  </>)
}

export default MyApp
