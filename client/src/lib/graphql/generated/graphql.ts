/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
};

export type Link = {
  __typename?: "Link";
  author?: Maybe<User>;
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  url: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  link: Link;
  login?: Maybe<AuthPayload>;
  register: AuthPayload;
};

export type MutationLinkArgs = {
  description: Scalars["String"]["input"];
  url: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationRegisterArgs = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  feed: Array<Link>;
  info: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  links: Array<Link>;
  name: Scalars["String"]["output"];
};

export type FeedQueryVariables = Exact<{ [key: string]: never }>;

export type FeedQuery = {
  __typename?: "Query";
  feed: Array<{
    __typename?: "Link";
    id: string;
    url: string;
    description: string;
    author?: { __typename?: "User"; name: string } | null;
  }>;
};

export const FeedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Feed" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "feed" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "author" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FeedQuery, FeedQueryVariables>;
