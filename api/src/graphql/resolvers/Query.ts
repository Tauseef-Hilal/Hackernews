import { QueryResolvers } from "../generated/types";

const QueryFieldResolvers: QueryResolvers = {
  info: () => "This is the API of a Hackernews Clone",
  feed: async (_, args, context) => {
    const links = await context.prisma.link.findMany({
      where: {
        OR: [
          { description: { contains: args.filter ?? "" } },
          { url: { contains: args.filter ?? "" } },
        ],
      },
      skip: args.skip,
      take: args.take,
      orderBy: args.orderBy,
    });

    return {
      id: "main-feed",
      links: links.map((link) => ({
        ...link,
        id: link.id.toString(),
        votes: [],
      })),
      count: links.length,
    };
  },
};

export default QueryFieldResolvers;
