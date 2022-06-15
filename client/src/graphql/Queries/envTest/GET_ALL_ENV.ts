import gql from "graphql-tag";

const GET_ALL_ENV = gql`
  query GET_ALL_ENV {
    getAllEnv {
      _id
      name
      avatar
      isFree
      createdAt
      updatedAt
      updatedBy {
        _id
        email
      }
      createdBy {
        _id
        email
      }
    }
  }
`;
export default GET_ALL_ENV;
