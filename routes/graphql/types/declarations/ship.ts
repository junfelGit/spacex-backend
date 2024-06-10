import { gql } from 'graphql-tag';

export const Ship = gql`
  type Ship {
    id: ID!
    name: String
    class: String
    image: String
    active: Boolean!
    missions: [Mission!]
    abs: Int
    attempted_landings: Int
    course_deg: Int
    home_port: String
    imo: Int
    mmsi: Int
    model: String
    position: ShipLocation
    roles: [String]
    speed_kn: Float
    status: String
    successful_landings: Int
    type: String
    url: String
    weight_kg: Int
    weight_lbs: Int
    year_built: Int
  }

  input ShipsInput {
    pagination: PaginationInput!
  }
`;
