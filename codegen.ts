import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/graphql/typeDefs/**/*.gql",
  generates: {
    "src/graphql/__generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  },
  config: {
    useIndexSignature: true,
    contextType: "../../types#MyContext"
  }
};

export default config;
