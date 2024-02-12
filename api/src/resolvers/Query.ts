import { QueryResolvers } from "../generated/graphql";

const QueryFieldResolvers: QueryResolvers = {
  info: () => "This is the API of a Hackernews Clone",
  feed: async (_, __, context) => {
    const links = await context.prisma.link.findMany();
    return links.map((link) => ({ ...link, id: link.id.toString() }));
  },
};

export default QueryFieldResolvers;
