import gql from "graphql-tag";

const UPDATE_ENV_DISPONIBILITY_BY_ID = gql`
  mutation UPDATE_ENV_DISPONIBILITY_BY_ID(
    $input: UpdateEnvDisponibilityInput!
    $id: String!
  ) {
    updateEnvDisponibilityById(input: $input, id: $id) {
      _id
      name
      isFree
      updatedAt
      updatedBy {
        _id
        email
      }
    }
  }
`;
export default UPDATE_ENV_DISPONIBILITY_BY_ID;
