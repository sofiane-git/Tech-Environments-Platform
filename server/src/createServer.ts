import 'reflect-metadata';
import { ApolloError, ApolloServer, AuthenticationError } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { resolvers } from './graphql'
import { ApolloServerPluginInlineTraceDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { IN_PROD } from './config';
export const jwtKey = 'my_secret_key_that_must_be_very_long';

async function createServer() {
  const schema = await buildSchema({
    resolvers,
    authChecker: ({ context }) =>
    {
      console.log('context | ', context);
      if (context.authenticatedUserEmail) {
        return true;
      }
      throw new ApolloError(
        'Vous devez être connecté(e) pour accéder à cette ressource'
      );
    },
    authMode: 'null',
  });
  const server = new ApolloServer({
    schema,
    context: ({ req }) =>
    {
      console.log('req | ', req);
      const token = req.headers.authorization;

      if (token) {
        let payload: JwtPayload;
        try {
          payload = jwt.verify(token, jwtKey) as JwtPayload;

          return { authenticatedUserEmail: payload.user };
        } catch (err) {
          throw new AuthenticationError('Veuillez vous reconnecter');
        }
      } else return false;
    },
    plugins: [

      // GraphQL graphic interface, for queries, on mode DEV
      IN_PROD
        ? ApolloServerPluginLandingPageGraphQLPlayground()
        : ApolloServerPluginInlineTraceDisabled(),
    ],

  });
  return server;
}

export default createServer;
