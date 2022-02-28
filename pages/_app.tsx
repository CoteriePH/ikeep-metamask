import IndeterminateLoadingBar from '@components/IndeterminateLoadingBar';
import { LoadingProvider } from '@hooks/context_providers/useLoading';
import { UserProvider } from '@hooks/context_providers/useUser';
import type { AppProps } from 'next/app';
import GlobalStyle from 'styled/globalStyle';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <GlobalStyle />
    <LoadingProvider>
      <IndeterminateLoadingBar />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </LoadingProvider>
  </>;
}

export default MyApp;
