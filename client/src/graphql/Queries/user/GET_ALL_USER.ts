import gql from "graphql-tag";

const GET_ALL_USER = gql`
  query GET_ALL_USER {
    getAllUsers {
      _id
      email
      createdAt
    }
  }
`;
export default GET_ALL_USER;
