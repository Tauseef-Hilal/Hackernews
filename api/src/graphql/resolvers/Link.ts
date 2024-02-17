import { LinkResolvers } from "../generated/types";
import { getMockLink, getMockUser } from "../../lib/utils";

const LinkFieldResolvers: LinkResolvers = {
  author: async (parent, _, context) => {
    const user = await context.prisma.link
      .findUnique({
        where: { id: parseInt(parent.id) },
      })
      .author();

    return {
      ...user,
      id: user.id.toString(),
      links: [],
    };
  },
  votes: async (parent, _, context) => {
    const votes = await context.prisma.vote.findMany({
      where: { linkId: parseInt(parent.id) },
    });

    return votes.map((vote) => ({
      ...vote,
      id: vote.id.toString(),
      link: getMockLink(),
      user: getMockUser(),
    }));
  },
};

export default LinkFieldResolvers;
