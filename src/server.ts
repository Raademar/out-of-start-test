import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
import { connectToDb } from "./db";

const port = 4000;

async function initServer() {
  try {
    await connectToDb();

    const server = new ApolloServer({
      schema,
    });
    const app = express();

    await server.start();
    server.applyMiddleware({ app });

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
