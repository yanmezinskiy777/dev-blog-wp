import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { removeLastTrailingSlash } from '../../utils/baseUtils';


let client: ApolloClient<NormalizedCacheObject>;

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

export function _createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT as any),
    }),
    cache: new InMemoryCache(),
  });
}