import { ApolloClient, from } from '@apollo/client';
import { httpLink } from './links/http-link';
import { cache } from './cache/in-memory-cache';
import { forwardLink } from './links/forward-link';
import { errorLink } from './links/error-link';

export const apolloClient = new ApolloClient({
  link: from([errorLink, forwardLink, httpLink]),
  cache,
});
