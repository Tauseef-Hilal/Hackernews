import gql from "graphql-tag";

export const GET_LINKS_QUERY = gql`
  query Feed {
    feed {
      id
      url
      description
      author {
        name
      }
    }
  }
`;
