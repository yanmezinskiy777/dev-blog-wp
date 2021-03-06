import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextApp from "next/app";
import NextNProgress from "nextjs-progressbar";
import { AppContext, useAppContext } from "../components/hooks/useApp";
import { getSiteMetadata } from "../components/api/metadata/metadata";
import { ISettingsMetadata } from "../components/api/metadata/types";
import { ApolloProvider } from "@apollo/client";
import useApolloClient from "../components/hooks/useApolloClient";

type TMyApp = AppProps & SiteProps;
export type SiteProps = { metadata: ISettingsMetadata };

function MyApp({ Component, pageProps, metadata }: TMyApp) {
  const apolloClient = useApolloClient(pageProps.initialApolloState);
  const data = useAppContext({
    metadata,
  });
  return (
    <ApolloProvider client={apolloClient}>
      <AppContext.Provider value={data}>
        <NextNProgress />
        <Component {...pageProps} />
      </AppContext.Provider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function (appContext: any) {
  const appProps = await NextApp.getInitialProps(appContext);

  return {
    ...appProps,
    metadata: await getSiteMetadata(),
  };
};

export default MyApp;
