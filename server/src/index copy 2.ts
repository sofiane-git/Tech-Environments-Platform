// Replace console.log
import consola from "consola";

import "reflect-metadata";

// Server tools
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import express from "express";
import http from "http";
import mongoose from "mongoose";

// Environement configuration
import { PORT, URI, URL, IN_PROD } from "./config";

import { resolvers, entities } from "./graphql";

import * as AppModels from "./models";

// import AuthMiddleware from "./middlewares/AuthMiddleware";
import { DocumentNode } from "graphql";
import EnvDeletedNotificationEntity from "./graphql/entities/EnvDeletedNotificationEntity";
import EnvTestEntity from "./graphql/entities/EnvTestEntity";

// We need async function for launch server
const startApolloServer = async (entities: any, resolvers: any) => {
  const app = express();
  // app.use(AuthMiddleware);
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    entities,
    resolvers,
    context: ({ req }) => {
      const { isAuth, user }: any = req;
      console.log(isAuth, req, user);
      
      return {
        req,
        isAuth,
        user,
        ...AppModels,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // GraphQL graphic interface, for queries, on mode DEV
      IN_PROD
        ? ApolloServerPluginLandingPageGraphQLPlayground()
        : ApolloServerPluginInlineTraceDisabled(),
    ],
  });

  // More required logic for integrating with Express
  await server.start();
  await mongoose
    .connect(URI, {
      autoIndex: true,
    })
    .then(() =>
      consola.success({
        badge: true,
        message: `Successfully connect to the URI`,
      })
    )
    .catch((err) =>
      consola.error({
        badge: true,
        message: err,
      })
    );

  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });

  // Modified server startup
  // await new Promise(
  //   (resolve) =>
  //     httpServer.listen(
  //       { port: PORT },
  //       consola.success({
  //         badge: true,
  //         message: `🚀 Server ready at PORT: ${URL}, at PATH: ${server.graphqlPath}`,
  //       })
  //     ),
  //   (reject: any) =>
  //     consola.error({
  //       badge: true,
  //       message: reject,
  //     })
  // );
  await new Promise((resolve, reject) =>
  {
    httpServer.listen({ port: PORT });
    reject();
  }).then((): any => {
    consola.success({
      badge: true,
      message: `🚀 Server ready at PORT: ${URL}, at PATH: ${server.graphqlPath}`
    })
  }).catch((error): any => {
    consola.error({
      badge: true,
      message: error
    })
  })
};

startApolloServer(entities, resolvers);
