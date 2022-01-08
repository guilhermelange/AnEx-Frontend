import '@/styles/global.css'
import type { AppProps } from 'next/app'
import SEO from '@/components/SEO'
import { AuthProvider } from '@/contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <AuthProvider>
      <SEO title='AnEx'>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
      </SEO>
      <Component {...pageProps} />
    </AuthProvider>
  </>)
}

export default MyApp
