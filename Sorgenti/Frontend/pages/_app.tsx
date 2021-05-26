import { AppProps } from 'next/app';
import AuthContextProvider from 'lib/authContext';
import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import theme from 'styles/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Amplify } from 'aws-amplify';
import SnackbarContextProvider from 'lib/SnackbarContext';
import NextNprogress from 'nextjs-progressbar';

import 'styles/global.scss';

Amplify.configure({
  Auth: {
    region: process.env.USER_POOL_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    mandatorySignIn: true,
  },

  // Configuration for cookie storage
  // see https://aws-amplify.github.io/docs/js/authentication
  // cookieStorage: {
  //   // REQUIRED - Cookie domain
  //   // This should be the subdomain in production as
  //   // the cookie should only be present for the current site
  //   domain: process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN,
  //   // OPTIONAL - Cookie path
  //   path: '/',
  //   // OPTIONAL - Cookie expiration in days
  //   expires: 7,
  //   // OPTIONAL - Cookie secure flag
  //   // Either true or false, indicating whether the cookie
  //   // transmission requires a secure protocol (https).
  //   // The cookie should be set to secure in production.
  //   secure: false,
  // },
  ssr: true,
});

function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <AuthContextProvider>
          <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          </Head>
          <CssBaseline />
          <Layout>
            <NextNprogress
              color="#fff"
              startPosition={0.3}
              stopDelayMs={200}
            />
            <Component {...pageProps} />
          </Layout>
        </AuthContextProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
