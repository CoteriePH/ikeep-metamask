import GlobalStyle from '@styled/globalStyle';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>;
}

export default MyApp;
