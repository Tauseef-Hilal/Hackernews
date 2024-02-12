import jwt from "jsonwebtoken";
import crypto from "crypto";
import { MutationResolvers } from "../generated/graphql";

const APP_SECRET = process.env.APP_SECRET;

const MutationFieldResolvers: MutationResolvers = {
  link: async (_: any, args, context) => {
    const { userId, prisma } = context;

    const link = await prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        author: { connect: { id: parseInt(userId) } },
      },
    });

    return { ...link, id: link.id.toString() };
  },
  register: async (_, args, context) => {
    const password = crypto
      .pbkdf2Sync(
        args.password,
        crypto.randomBytes(16).toString("hex"),
        1000,
        64,
        "sha512"
      )
      .toString("hex");

    const user = await context.prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: password,
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

    const password = crypto
      .pbkdf2Sync(
        args.password,
        crypto.randomBytes(16).toString("hex"),
        1000,
        64,
        "sha512"
      )
      .toString("hex");
    const isValidPassword = user.password === password;

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return { user: { ...user, id: user.id.toString(), links: [] }, token };
  },
};

export default MutationFieldResolvers;
