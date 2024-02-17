import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_LINK_MUTATION } from "../lib/graphql/mutations";
import {
  FeedQuery,
  FeedQueryVariables,
  LinkMutation,
  LinkMutationVariables,
  Sort,
} from "../lib/graphql/generated/graphql";
import { useNavigate } from "react-router-dom";
import { FEED_QUERY } from "../lib/graphql/queries";
import { LINKS_PER_PAGE } from "../lib/utils/constants";

const CreateLink: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const [createLink] = useMutation<LinkMutation, LinkMutationVariables>(
    CREATE_LINK_MUTATION,
    {
      variables: {
        description: formState.description,
        url: formState.url,
      },
      onCompleted: () => navigate("/"),
      update: (cache, { data }) => {
        const cacheData = cache.readQuery<FeedQuery, FeedQueryVariables>({
          query: FEED_QUERY,
          variables: {
            take: LINKS_PER_PAGE,
            skip: 0,
            orderBy: { createdAt: Sort.Desc },
          },
        });
        cache.writeQuery({
          query: FEED_QUERY,
          data: {
            feed: {
              links: [data?.link, ...(cacheData?.feed.links ?? [])],
            },
          },
        });
      },
    }
  );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value,
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value,
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
