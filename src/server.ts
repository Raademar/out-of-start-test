import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { schema } from "./graphql";
import { connectToDb } from "./db";
import {
  fetchAndRunInitOfProductImageUrlMemory,
  getLengthOfProductImageUrlMap,
} from "./utils";

const port = 4000;

async function initServer() {
  try {
    await connectToDb();

    const server = new ApolloServer({
      schema,
      context: async ({ req, res }) => ({ req, res }),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    const app = express();

    await server.start();
    server.applyMiddleware({ app });

    await fetchAndRunInitOfProductImageUrlMemory();

    console.log(`in memory size: ${getLengthOfProductImageUrlMap()}`);

    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      );
    });
  } catch (err: any) {
    throw new Error(err);
  }
}

initServer();
