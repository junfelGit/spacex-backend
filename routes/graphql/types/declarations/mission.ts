import { gql } from 'graphql-tag';

export const Mission = gql`
    type Mission {
        id: ID!
        name: String
        flight: String
    }

`;
