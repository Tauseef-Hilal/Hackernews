/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Link($description: String!, $url: String!) {\n    link(description: $description, url: $url) {\n      id\n      createdAt\n      url\n      description\n    }\n  }\n": types.LinkDocument,
    "\n  mutation Register($email: String!, $password: String!, $name: String!) {\n    register(email: $email, password: $password, name: $name) {\n      token\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Vote($linkId: ID!) {\n    vote(linkId: $linkId) {\n      id\n      link {\n        id\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n      user {\n        id\n      }\n    }\n  }\n": types.VoteDocument,
    "\n  query Feed($skip: Int, $take: Int, $orderBy: LinkOrderBy) {\n    feed(skip: $skip, take: $take, orderBy: $orderBy) {\n      id\n      count\n      links {\n        id\n        url\n        description\n        createdAt\n        author {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.FeedDocument,
    "\n  query FeedSearch($filter: String!) {\n    feed(filter: $filter) {\n      id\n      links {\n        id\n        url\n        description\n        createdAt\n        author {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.FeedSearchDocument,
    "\n  subscription NewLink {\n    newLink {\n      id\n      url\n      description\n      createdAt\n      author {\n        id\n        name\n      }\n      votes {\n        id\n        user {\n          id\n        }\n      }\n    }\n  }\n": types.NewLinkDocument,
    "\n  subscription NewVote {\n    newVote {\n      id\n      link {\n        id\n        url\n        description\n        createdAt\n        author {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n      user {\n        id\n      }\n    }\n  }\n": types.NewVoteDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Link($description: String!, $url: String!) {\n    link(description: $description, url: $url) {\n      id\n      createdAt\n      url\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation Link($description: String!, $url: String!) {\n    link(description: $description, url: $url) {\n      id\n      createdAt\n      url\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($email: String!, $password: String!, $name: String!) {\n    register(email: $email, password: $password, name: $name) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Register($email: String!, $password: String!, $name: String!) {\n    register(email: $email, password: $password, name: $name) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Vote($linkId: ID!) {\n    vote(linkId: $linkId) {\n      id\n      link {\n        id\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n      user {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Vote($linkId: ID!) {\n    vote(linkId: $linkId) {\n      id\n      link {\n        id\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n      user {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Feed($skip: Int, $take: Int, $orderBy: LinkOrderBy) {\n    feed(skip: $skip, take: $take, orderBy: $orderBy) {\n      id\n      count\n      links {\n        id\n        url\n        description\n        createdAt\n        author {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Feed($skip: Int, $take: Int, $orderBy: LinkOrderBy) {\n    feed(skip: $skip, take: $take, orderBy: $orderBy) {\n      id\n      count\n      links {\n        id\n        url\n        description\n        createdAt\n        author {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FeedSearch($filter: String!) {\n    feed(filter: $filter) {\n      id\n      links {\n        id\n        url\n        description\n        createdAt\n        author {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FeedSearch($filter: String!) {\n    feed(filter: $filter) {\n      id\n      links {\n        id\n        url\n        description\n        createdAt\n        author {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription NewLink {\n    newLink {\n      id\n      url\n      description\n      createdAt\n      author {\n        id\n        name\n      }\n      votes {\n        id\n        user {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription NewLink {\n    newLink {\n      id\n      url\n      description\n      createdAt\n      author {\n        id\n        name\n      }\n      votes {\n        id\n        user {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription NewVote {\n    newVote {\n      id\n      link {\n        id\n        url\n        description\n        createdAt\n        author {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n      user {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription NewVote {\n    newVote {\n      id\n      link {\n        id\n        url\n        description\n        createdAt\n        author {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n      user {\n        id\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;