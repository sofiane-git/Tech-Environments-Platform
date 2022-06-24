import { PORT, BASE_URL } from "./config"
import 'reflect-metadata';
import express, { Express } from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import http from 'http';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from "apollo-server-core";
import { resolvers } from "./graphql";
import { connectToMongo } from "./utils/mongo";
import bodyParser from "body-parser";
import { NODE_ENV } from "./config";
import cors from "cors";


const bootstrap = async () =>
{
  const schema = await buildSchema({
    resolvers,
    
  })
  const app: Express = express();
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json())
  
  const httpServer = http.createServer(app);
  
  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),

      NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
          footer: false,
        })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false })
    ]
  })

  await server.start();

  server.applyMiddleware({ app, path: '/api' });

  app.listen({ port: PORT }, () =>
  {
    console.log(`App is listening on ${BASE_URL+PORT}`)
  })

  connectToMongo();
}

bootstrap();
