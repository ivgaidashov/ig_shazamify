import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "quicksand";

import Layout from "../components/Layout";
import { GlobalProvider } from "../context/GlobalState";

const theme = extendTheme({
  fonts: {
    body: `'Quicksand', sans-serif`,
  },
  styles: {
    global: {
      body: {
        backgroundColor: '#E9D8FD',
      },
      html: {
       height: '100%'
     }
    }
  }
});

function MyApp({ Component, pageProps }) {
  NProgress.configure({showSpinner: false})

  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  })

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  })

  return (
    <GlobalProvider>
      <Head>
        <title>Shazamify</title>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' />
      </Head>

      <ChakraProvider theme={theme}>
        <Layout >
          <Component {...pageProps}/>
        </Layout>
      </ChakraProvider>
    </GlobalProvider>
  );
}

export default MyApp;
