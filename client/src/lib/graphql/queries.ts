import gql from "graphql-tag";

export const FEED_QUERY = gql`
  query Feed($skip: Int, $take: Int, $orderBy: LinkOrderBy) {
    feed(skip: $skip, take: $take, orderBy: $orderBy) {
      id
      count
      links {
        id
        url
        description
        createdAt
        author {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export const FEED_SEARCH_QUERY = gql`
  query FeedSearch($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        author {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;
