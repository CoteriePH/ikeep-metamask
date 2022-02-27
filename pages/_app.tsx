import { UserProvider } from '@hooks/context_providers/useUser';
import type { AppProps } from 'next/app';
import GlobalStyle from 'styled/globalStyle';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <GlobalStyle />
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  </>;
}

export default MyApp;
