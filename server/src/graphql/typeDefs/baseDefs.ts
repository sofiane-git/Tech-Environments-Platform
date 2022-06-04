import {
    gql
} from "apollo-server-express";

// The GraphQL schema
export default gql`
    type Query {
        _: String!
    }
    type Mutation {
        _:String!
    }
    type Subscription {
        _: String!
    }
`;