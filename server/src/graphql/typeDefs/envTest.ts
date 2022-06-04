import { gql } from "apollo-server-express";

// The GraphQL schema
export default gql`
  extend type Query {
    # READ
    getAllEnvTest: [EnvTest!]!
    getEnvByID(id: ID!): EnvTest!
  }

  extend type Mutation {
    # CREATE
    createNewEnv(newEnv: EnvInput!): EnvTest!
    # UPDATE
    editEnvByID(updateEnv: EnvInput, id: ID!): EnvTest!
    # DELETE
    deleteEnvByID(id: ID!, deletedBy: String!): EnvDeletedNotification!
  }

  input EnvInput {
    name: String!
    isFree: Boolean
    updatedBy: String!

  }

  type EnvTest {
    id: ID!
    name: String!
    isFree: Boolean!
    createdAt: String
    updatedAt: String
    updatedBy: String!
  }

  input StatusInput {
    value: Boolean!
    updateValueDay: String
    updateValueHour: String

  }
  type EnvDeletedNotification {
    id: ID!
    deletedBy: String!
    message: String!
    success: Boolean!
  }
`;
