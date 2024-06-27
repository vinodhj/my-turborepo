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

  enum SORT {
    ASC
    DESC
  }

  enum SORT_BY {
    CREATED_AT
    UPDATED_AT
  }

  type EnquiryConnection {
    edges: [EnquiryEdge!]!
    pageInfo: PageInfo!
  }

  type EnquiryEdge {
    cursor: String!
    node: Enquiry!
  }

  type ServiceConnection {
    edges: [ServiceEdge!]!
    pageInfo: PageInfo!
  }

  type ServiceEdge {
    cursor: String!
    node: Service!
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
  }

  type Query {
    enquiries(ids: [ID!], first: Int = 10, after: String, sort: SORT = DESC, sort_by: SORT_BY = CREATED_AT): EnquiryConnection
    services(ids: [ID!], first: Int = 10, after: String, sort: SORT = DESC, sort_by: SORT_BY = CREATED_AT): ServiceConnection
  }

  type Mutation {
    submitEnquiry(input: SubmitEnquiryInput): Enquiry!
    createService(input: CreateServiceInput): Service!
  }
`;
