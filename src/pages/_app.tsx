import '@/styles/global.css'
import type { AppProps } from 'next/app'
import SEO from '@/components/SEO'
import { AuthProvider } from '@/contexts/AuthContext'
import { AnimeProvider } from '@/contexts/AnimeContext'
import Modal from 'react-modal'

ApplyModalConfigs();

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (<>
    <SEO title='AnEx' shouldExcludeTitleSuffix></SEO>
    <AuthProvider>
      <AnimeProvider>
        <Component {...pageProps} />
      </AnimeProvider>
    </AuthProvider>
  </>)
}

function ApplyModalConfigs() {
  Modal.setAppElement('#__next')
  Modal.defaultStyles.content.maxWidth = '92vw';
  Modal.defaultStyles.content.margin = '0 auto';
  Modal.defaultStyles.overlay.zIndex = '999';
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, .6)'
}