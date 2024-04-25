import Head from "next/head";
import Script from "next/script";

import NextNprogress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import store from "../store";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  const persistor = persistStore(store);
  const Layout = Component.Layout || ((page) => page);
  return (
    <>
      <NextNprogress
        color="#FF0000"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
        showOnShallow={true}
        options={{ easing: "ease", speed: 600, showSpinner: false }}
      />

      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload" id="prysmradiogtag">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS}');
        `}
      </Script>
      <Head>
        <title>Prysmradio</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
      </Head>
      <Provider store={store}>
        {/* Redux Persist for local storage save */}
        <PersistGate loading={null} persistor={persistor}>
          {/* React Query */}
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              {Layout(<Component {...pageProps} />)}
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
