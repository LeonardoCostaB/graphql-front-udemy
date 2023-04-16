import { ApolloLink } from '@apollo/client';

export const forwardLink = new ApolloLink((operation, forward) => {
  return forward(operation);
});
