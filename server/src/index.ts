import { PORT, BASE_URL } from "./config"
import 'reflect-metadata';
import express, { Express } from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
// import jwt, { JwtPayload } from 'jsonwebtoken';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { resolvers } from "./graphql";
import { connectToMongo } from "./utils/mongo";
// import authChecker from "./graphql/middlewares/authChecker";
// import Context from "./graphql/types/context";

export const jwtKey = 'my_secret_key_that_must_be_very_long';

const bootstrap = async () =>
{
  const schema = await buildSchema({
    resolvers,
    
  })
  const app: Express = express();

  const httpServer = http.createServer(app);
  
  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // GraphQL graphic interface, for queries, on mode DEV
      // IN_PROD
      //   ? ApolloServerPluginLandingPageGraphQLPlayground()
      //   : ApolloServerPluginInlineTraceDisabled(),
    ]
  })

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
  {
    console.log(`App is listening on ${BASE_URL+PORT}`)
  })

  connectToMongo();
}

bootstrap();
