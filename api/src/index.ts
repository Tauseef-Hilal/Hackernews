import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import path from "path";

import QueryFieldResolvers from "./resolvers/Query";
import MutationFieldResolvers from "./resolvers/Mutation";
import LinkFieldResolvers from "./resolvers/Link";
import UserFieldResolvers from "./resolvers/User";
import { getUserId } from "./lib/utils";

const server = new ApolloServer({
  typeDefs: readFileSync(
    path.join(__dirname, "schema/schema.graphql"),
    "utf-8"
  ),
  resolvers: {
    Query: QueryFieldResolvers,
    Mutation: MutationFieldResolvers,
    Link: LinkFieldResolvers,
    User: UserFieldResolvers,
  },
});

const prisma = new PrismaClient();

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => ({
    ...req,
    prisma,
    userId: req && req.headers.authorization ? getUserId(req) : null,
  }),
}).then(({ url }) => console.log(`Server ready at: ${url}`));
