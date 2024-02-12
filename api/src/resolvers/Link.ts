import { LinkResolvers } from "../generated/graphql";

const LinkFieldResolvers: LinkResolvers = {
  author: async (parent, __, context) => {
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
};

export default LinkFieldResolvers;
