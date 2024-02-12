import { useQuery } from "@apollo/client";

import LinkComponent from "./Link";
import { GET_LINKS_QUERY } from "../lib/graphql/queries";
import { FeedQuery } from "../lib/graphql/generated/graphql";

const App: React.FC = () => {
  const { loading, error, data } = useQuery<FeedQuery>(GET_LINKS_QUERY);
  const links = data?.feed ?? [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oops! couldnt load links</p>;

  return (
    <main>
      <div>
        {links.map((link) => (
          <LinkComponent
            key={link.id}
            url={link.url}
            description={link.description}
            author={link.author?.name || ""}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
