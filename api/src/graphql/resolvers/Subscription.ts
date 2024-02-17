import { SubscriptionResolvers } from "../generated/types";
import { NEW_LINK_EVENT, NEW_VOTE_EVENT } from "../../lib/events";

const SubscriptionFieldResolvers: SubscriptionResolvers = {
  newLink: {
    subscribe: (_, __, context) => {
      return {
        [Symbol.asyncIterator]: () =>
          context.pubSub.asyncIterator(NEW_LINK_EVENT),
      };
    },
  },
  newVote: {
    subscribe: (_, __, context) => {
      return {
        [Symbol.asyncIterator]: () =>
          context.pubSub.asyncIterator(NEW_VOTE_EVENT),
      };
    },
  },
};

export default SubscriptionFieldResolvers;
