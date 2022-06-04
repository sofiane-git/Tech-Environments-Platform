import gql from "graphql-tag";

const DELETE_ENV_BY_ID = gql`
  mutation DELETE_ENV_BY_ID($id: String!) {
    deleteEnvById(id: $id)
  }
`;
export default DELETE_ENV_BY_ID;
