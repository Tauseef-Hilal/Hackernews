import { useMutation } from "@apollo/client";
import {
  VoteMutation,
  VoteMutationVariables,
} from "../lib/graphql/generated/graphql";
import { AUTH_TOKEN_KEY } from "../lib/utils/constants";
import { timeDifferenceForDate } from "../lib/utils/utils";
import { VOTE_MUTATION } from "../lib/graphql/mutations";

interface LinkProps {
  index: number;
  link: {
    id: string;
    url: string;
    description: string;
    createdAt: Date;
    author?: { name: string } | null;
    votes: unknown[];
  };
}

const Link: React.FC<LinkProps> = ({ index, link }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const [vote] = useMutation<VoteMutation, VoteMutationVariables>(
    VOTE_MUTATION,
    {
      variables: {
        linkId: link.id,
      },
      onError: (error) => {
        alert(error.message);
      },
    }
  );

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={() => vote()}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{" "}
            {link.author ? link.author.name : "Unknown"}{" "}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        }
      </div>
    </div>
  );
};

export default Link;
