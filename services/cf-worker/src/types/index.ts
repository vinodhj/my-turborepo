import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON
  scalar DateTime

  type Service {
    id: ID!
    name: String!
    description: String
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Enquiry {
    id: ID! #nano_id
    email: String!
    message: String
    selected_services: [Service!]!
    json_text: JSON!
    created_at: DateTime!
    updated_at: DateTime!
  }

  input SubmitEnquiryInput {
    email: String!
    message: String
    selected_services: JSON! # services IDS
    json_text: JSON!
  }

  input CreateServiceInput {
    name: String!
    description: String
  }

  type Query {
    enquiries(ids: [ID]): [Enquiry]
    services(ids: [ID]): [Service]
  }

  type Mutation {
    submitEnquiry(input: SubmitEnquiryInput): Enquiry!
    createService(input: CreateServiceInput): Service!
  }
`;
