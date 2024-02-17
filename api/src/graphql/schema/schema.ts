import path from "path";
import { readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";

import QueryFieldResolvers from "../resolvers/Query";
import MutationFieldResolvers from "../resolvers/Mutation";
import SubscriptionFieldResolvers from "../resolvers/Subscription";
import LinkFieldResolvers from "../resolvers/Link";
import UserFieldResolvers from "../resolvers/User";
import VoteFieldResolvers from "../resolvers/Vote";
import DateScalar from "../resolvers/DateType";

const typeDefs = readFileSync(
  path.join(__dirname, "./schema.graphql"),
  "utf-8"
);

const resolvers = {
  Query: QueryFieldResolvers,
  Mutation: MutationFieldResolvers,
  Subscription: SubscriptionFieldResolvers,
  Link: LinkFieldResolvers,
  User: UserFieldResolvers,
  Vote: VoteFieldResolvers,
  Date: DateScalar,
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
