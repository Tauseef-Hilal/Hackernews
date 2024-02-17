import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";

export interface Context {
  prisma: PrismaClient;
  pubSub: PubSub;
  userId: string | null;
}
