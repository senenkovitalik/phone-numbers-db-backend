import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const typeDefs = loadSchemaSync("./**/*.gql", {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  loaders: [new GraphQLFileLoader()],
});
