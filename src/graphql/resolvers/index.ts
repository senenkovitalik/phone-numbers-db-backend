import type { Resolvers } from "../__generated/graphql";
import * as Queries from "./Queries";
import * as Mutations from "./Mutations";

export const resolvers: Resolvers = {
  Query: {
    ...Queries,
  },
  Mutation: {
    ...Mutations,
  },
};
