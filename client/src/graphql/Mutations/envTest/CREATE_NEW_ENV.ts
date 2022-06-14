import gql from "graphql-tag";

const CREATE_NEW_ENV = gql`
  mutation CREATE_NEW_ENV($createNewEnvInput: CreateEnvInput!) {
    createNewEnv(input: $createNewEnvInput) {
      message
      success
    }
  }
`;
export default CREATE_NEW_ENV;
