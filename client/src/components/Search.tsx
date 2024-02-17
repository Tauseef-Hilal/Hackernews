import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { FEED_SEARCH_QUERY } from "../lib/graphql/queries";
import { FeedSearchQuery } from "../lib/graphql/generated/graphql";
import Link from "./Link";

const Search: React.FC = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [executeSearch, { data }] =
    useLazyQuery<FeedSearchQuery>(FEED_SEARCH_QUERY);

  return (
    <>
      <div>
        Search
        <input type="text" onChange={(e) => setSearchFilter(e.target.value)} />
        <button
          onClick={() =>
            executeSearch({
              variables: { filter: searchFilter },
            })
          }
        >
          OK
        </button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default Search;
