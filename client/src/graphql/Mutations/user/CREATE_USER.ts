import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation CREATE_USER($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      email
      createdAt
    }
  }
`;
export default CREATE_USER;
