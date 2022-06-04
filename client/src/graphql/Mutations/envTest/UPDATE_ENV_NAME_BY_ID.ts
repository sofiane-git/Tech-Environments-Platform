import gql from "graphql-tag";

const UPDATE_ENV_NAME_BY_ID = gql`
  mutation UPDATE_ENV_NAME_BY_ID($input: UpdateEnvNameInput!, $id: String!) {
    updateEnvNameById(input: $input, id: $id) {
      _id
      name
      isFree
      createdAt
      updatedAt
      updatedBy {
        _id
        email
      }
    }
  }
`;
export default UPDATE_ENV_NAME_BY_ID;
