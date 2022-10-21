import type { Resolvers } from "../__generated/graphql";
import * as Queries from "./Queries";

export const resolvers: Resolvers = {
  Query: {
    ...Queries
  },
};
