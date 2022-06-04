import 'reflect-metadata';

import { PORT } from "./config";

import createConnection from './createConnection';
import createServer from './createServer';

async function start() {
  try {
    console.log('awaiting for database connection');
    await createConnection('mongodb://localhost:27017/env-test-management');
    console.log('connected to database');
    const server = await createServer();
    console.log('create server ok');

    // Start the server
    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (err: unknown) {
    console.log(err);
  }
}

start();
