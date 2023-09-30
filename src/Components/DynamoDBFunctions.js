import { API, graphqlOperation } from "aws-amplify";
import { listFiles, getFile, listUsers, getUser } from "../graphql/queries";
import { createUser } from "../graphql/mutations";

export async function fetchUsersDdb() {
  try {
    const userData = await API.graphql(graphqlOperation(listUsers));
    const userList = userData.data.listUsers.items;
    return userList;
  } catch (error) {
    return error;
  }
}

export async function fetchFilesDdb() {
  try {
    const fileData = await API.graphql(graphqlOperation(listFiles));
    const fileList = fileData.data.listFiles.items;
    return fileList;
  } catch (error) {
    return error;
  }
}

export async function getUserDdb(id) {
  try {
    const user = await API.graphql(graphqlOperation(getUser, { id }));
    return user;
  } catch (error) {
    return error;
  }
}

export async function getFileDdb(id) {
  try {
    const file = await API.graphql(graphqlOperation(getFile, { id: id }));
    return file;
  } catch (error) {
    return error;
  }
}

export async function createUserDdb(input) {
  try {
    const result = await API.graphql(graphqlOperation(createUser, { input }));
    return result.data.createUser;
  } catch (error) {
    throw error;
  }
}
