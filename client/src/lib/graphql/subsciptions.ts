import { gql } from "@apollo/client";

export const NEW_LINK_SUBSCRIPTION = gql`
  subscription NewLink {
    newLink {
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
`;

export const NEW_VOTE_SUBSCRIPTION = gql`
  subscription NewVote {
    newVote {
      id
      link {
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
      user {
        id
      }
    }
  }
`;
