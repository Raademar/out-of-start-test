import path from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

const typesLoader = loadFilesSync(
  path.join(__dirname, "typeDefs/**/*.graphql")
);

const resolversLoader = loadFilesSync(
  path.join(__dirname, "resolvers/**/*.resolver.ts")
);

const typeDefs = mergeTypeDefs(typesLoader);
const resolvers = mergeResolvers(resolversLoader);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
