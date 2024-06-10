import { gql } from 'graphql-tag';

export const ShipLocation = gql`
    type ShipLocation {
        latitude: Float
        longitude: Float
    }

`;
