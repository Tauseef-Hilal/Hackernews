import jwt from "jsonwebtoken";
import { MutationResolvers } from "../generated/types";
import { NEW_LINK_EVENT, NEW_VOTE_EVENT } from "../../lib/events";
import { SHA256 } from "crypto-ts";
import { getMockLink, getMockUser } from "../../lib/utils";

const APP_SECRET = process.env.APP_SECRET;

const MutationFieldResolvers: MutationResolvers = {
  link: async (_: any, args, context) => {
    const { userId, prisma, pubSub } = context;
    if (userId == null) {
      throw new Error("You need to login before you can post");
    }

    const link = await prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        author: { connect: { id: parseInt(userId) } },
      },
    });

    // Publish event
    pubSub.publish(NEW_LINK_EVENT, { newLink: link });

    return { ...link, id: link.id.toString(), votes: [] };
  },
  vote: async (_, args, context) => {
    const { prisma, userId, pubSub } = context;
    if (userId == null) {
      throw new Error("You need to login before you can vote");
    }

    const vote = await prisma.vote.findUnique({
      where: {
        linkId_userId: {
          linkId: parseInt(args.linkId),
          userId: parseInt(userId),
        },
      },
    });

    if (Boolean(vote)) {
      throw new Error(`Already voted for link ${args.linkId}`);
    }

    const newVote = await prisma.vote.create({
      data: {
        user: { connect: { id: parseInt(userId) } },
        link: { connect: { id: parseInt(args.linkId) } },
      },
    });

    pubSub.publish(NEW_VOTE_EVENT, { newVote: vote });
    return {
      id: newVote.id.toString(),
      user: getMockUser(),
      link: getMockLink(),
    };
  },
  register: async (_, args, context) => {
    const existingUser = await context.prisma.user.findUnique({
      where: { email: args.email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await context.prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: SHA256(args.password).toString(),
      },
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return { user: { ...user, id: user.id.toString(), links: [] }, token };
  },
  login: async (_: any, args, context) => {
    const user = await context.prisma.user.findUnique({
      where: { email: args.email },
    });

    if (!user) {
      throw new Error("User does not exist");
    }

    const hashedPassword = SHA256(args.password).toString();
    const isValidPassword = user.password === hashedPassword;

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return { user: { ...user, id: user.id.toString(), links: [] }, token };
  },
};

export default MutationFieldResolvers;
