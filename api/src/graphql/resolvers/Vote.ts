import { VoteResolvers } from "../generated/types";

const VoteFieldResolvers: VoteResolvers = {
  link: async (parent, _, context) => {
    const link = await context.prisma.vote
      .findUnique({
        where: { id: parseInt(parent.id) },
      })
      .link();

    return { ...link, id: link.id.toString(), votes: [] };
  },
  user: async (parent, _, context) => {
    const user = await context.prisma.vote
      .findUnique({
        where: { id: parseInt(parent.id) },
      })
      .user();

    return { ...user, id: user.id.toString(), votes: [], links: [] };
  },
};

export default VoteFieldResolvers;
