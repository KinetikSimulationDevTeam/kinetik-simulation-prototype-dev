/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      files {
        items {
          id
          userid
          title
          body
          filetype
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        files {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
      id
      userid
      title
      body
      filetype
      createdAt
      updatedAt
    }
  }
`;
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userid
        title
        body
        filetype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const filesByUseridAndTitleAndBody = /* GraphQL */ `
  query FilesByUseridAndTitleAndBody(
    $userid: ID!
    $titleBody: ModelFileByUserCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    filesByUseridAndTitleAndBody(
      userid: $userid
      titleBody: $titleBody
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userid
        title
        body
        filetype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
