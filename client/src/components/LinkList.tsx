import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "../lib/graphql/queries";
import {
  FeedQuery,
  NewLinkSubscription,
  NewVoteDocument,
  NewVoteSubscription,
} from "../lib/graphql/generated/graphql";
import Link from "./Link";
import { NEW_LINK_SUBSCRIPTION } from "../lib/graphql/subsciptions";
import { useLocation, useNavigate } from "react-router-dom";
import { LINKS_PER_PAGE } from "../lib/utils/constants";

const LinkList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNewPage = location.pathname.includes("new");
  const pageIndexParams = location.pathname.split("/");
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);
  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

  const { loading, error, data, subscribeToMore } = useQuery<FeedQuery>(
    FEED_QUERY,
    {
      variables: getQueryVariables(isNewPage, page),
    }
  );

  subscribeToMore<NewLinkSubscription>({
    document: NEW_LINK_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({ id }) => id === newLink?.id);
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          id: prev.feed.id,
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
        },
      });
    },
  });

  subscribeToMore<NewVoteSubscription>({
    document: NewVoteDocument,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newVote = subscriptionData.data.newVote;
      return Object.assign({}, prev, {
        feed: {
          id: prev.feed.id,
          links: prev.feed.links.map((link) => {
            if (link.id === newVote?.id) {
              return { ...link, votes: [...link.votes, newVote] };
            }
            return link;
          }),
          count: prev.feed.links.length,
        },
      });
    },
  });

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          {getLinksToRender(isNewPage, data).map((link, index) => (
            <Link key={link.id} link={link} index={index + pageIndex} />
          ))}
          {isNewPage && (
            <div className="flex ml4 mv3 gray">
              <div
                className="pointer mr2"
                onClick={() => {
                  if (page > 1) {
                    navigate(`/new/${page - 1}`);
                  }
                }}
              >
                Previous
              </div>
              <div
                className="pointer"
                onClick={() => {
                  if (page <= data.feed?.count / LINKS_PER_PAGE) {
                    navigate(`/new/${page + 1}`);
                  }
                }}
              >
                Next
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

function getQueryVariables(isNewPage: boolean, page: number) {
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
  const take = isNewPage ? LINKS_PER_PAGE : 100;
  const orderBy = { createdAt: "desc" };

  return { take, skip, orderBy };
}

function getLinksToRender(
  isNewPage: boolean,
  data: FeedQuery,
) {
  if (isNewPage) {
    return data.feed.links.slice(0, LINKS_PER_PAGE);
  }

  const rankedLinks = data.feed.links.slice();
  rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
  return rankedLinks;
}

export default LinkList;
