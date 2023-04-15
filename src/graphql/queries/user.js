import { gql } from '@apollo/client';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/user';

export const GQL_GET_USER = gql`
  query GET_USER($userId: ID!) {
    user(id: $userId) {
      ...user
    }
  }

  ${GQL_FRAGMENT_USER}
`;
