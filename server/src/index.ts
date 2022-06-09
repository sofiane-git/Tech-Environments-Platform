import { PORT, BASE_URL } from "./config"
import 'reflect-metadata';
import express, { Express } from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { resolvers } from "./graphql";
import { connectToMongo } from "./utils/mongo";
import { authChecker } from "./graphql/middlewares/authChecker";
// import { Context } from "./graphql/interfaces/context";


const bootstrap = async () =>
{
  const schema = await buildSchema({
    resolvers,
    authChecker
  })
  const app: Express = express();

  const httpServer = http.createServer(app);
  
  const server = new ApolloServer({
    schema,
    context: ({req}: any) => ({req}),
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
