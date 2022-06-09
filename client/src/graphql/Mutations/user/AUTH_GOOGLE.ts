import gql from "graphql-tag";

const AUTH_GOOGLE = gql`
  mutation GoogleAuth($tokenId: String!) {
    googleAuth(tokenId: $tokenId) {
      message
      success
    }
  }
`;
export default AUTH_GOOGLE;
