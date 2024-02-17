import cors from "cors";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { createServer } from "http";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "@prisma/client";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { getUserId } from "./lib/utils";
import { Context } from "./lib/types/Context";
import schema from "./graphql/schema/schema";

const pubSub = new PubSub();
const prisma = new PrismaClient();

// Create an Express app and HTTP server. We will attach both the ws server
// and the apollo server to this HTTP server
const app = express();
const httpServer = createServer(app);

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// Save the returned server info so we can shutdown this server later
const serverCleanup = useServer(
  {
    schema,
    context: async (ctx, msg, args) => {
      return { pubSub, prisma };
    },
  },
  wsServer
);

// Set up ApolloServer
const server = new ApolloServer<Context>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

server.start().then(async () => {
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        ...req,
        prisma,
        pubSub,
        token: req.headers.token,
        userId: req && req.headers.authorization ? getUserId(req) : null,
      }),
    })
  );

  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
  );
});
