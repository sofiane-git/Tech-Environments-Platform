import gql from "graphql-tag";

const CREATE_NEW_ENV = gql`
  mutation CREATE_NEW_ENV($createNewEnvInput: CreateEnvInput!) {
    createNewEnv(input: $createNewEnvInput) {
      _id
      name
      createdAt
      createdBy {
        _id
        email
      }
    }
  }
`;
export default CREATE_NEW_ENV;
