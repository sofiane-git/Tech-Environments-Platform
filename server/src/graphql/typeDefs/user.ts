import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAllUser: [User!]!
    authenticateUser(email: String!, password: String!): AuthResp!
  }

  extend type Mutation {
    registerUser(newUser: userInput!): AuthResp!
    editUserById(updateUser: userInput, id: ID!): User!
    deleteUserById(id: ID!): UserDeletedNotification!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
  }
  type UserDeletedNotification {
    id: ID!
    message: String!
    success: Boolean!
  }
  type AuthResp {
    user: User!
    token: String
  }
  input userInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
`;
