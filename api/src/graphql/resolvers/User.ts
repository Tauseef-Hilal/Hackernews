import { UserResolvers } from "../generated/types";

const UserFieldResolvers: UserResolvers = {
  links: async (parent, _, context) => {
    const links = context.prisma.link.findMany({
      where: { authorId: parseInt(parent.id) },
    });

    return (await links).map((link) => ({
      ...link,
      id: link.id.toString(),
      votes: [],
    }));
  },
};

export default UserFieldResolvers;
