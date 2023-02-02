import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { persistor } from "../app/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import ErrorBoundary from "../components/ErrorBoundary";
import Layout from "../components/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
