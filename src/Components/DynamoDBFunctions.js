import { API, graphqlOperation } from 'aws-amplify';
import { listFiles, getFile, listUsers, getUser } from '../graphql/queries';
import { createUser, createFile, updateFile, updateUser } from '../graphql/mutations';

export async function fetchUsersDdb() {
    try {
        const userData = await API.graphql(graphqlOperation(listUsers));
        const userList = userData.data.listUsers.items;
        console.log('UserList:', userList);
        return userList;
    } catch (error) {
        console.log('Error retrieving files:', error);
        return error;
    }
}

export async function fetchFilesDdb() {
    try {
        const fileData = await API.graphql(graphqlOperation(listFiles));
        const fileList = fileData.data.listFiles.items;
        console.log('FileList:', fileList);
        return fileList;
    } catch (error) {
        console.log('Error retrieving files:', error);
        return error;
    }
}

export async function getUserDdb(id) {
    try {
        const user = await API.graphql(graphqlOperation(getUser, { id }));
        return user;
    } catch (error) {
        console.log('No user match to the user id: ', error);
        return error;
    }
}

export async function getFileDdb(id) {
    try {
        const file = await API.graphql(graphqlOperation(getFile, { id: id }));
        console.log('File:', file);
        return file;
    } catch (error) {
        console.log('Error retrieving files:', error);
        return error;
    }
}

export async function createUserDdb(input) {
    try {
      const result = await API.graphql(
        graphqlOperation(createUser, {input})
      );
      console.log('User created:', result.data.createUser);
      return result.data.createUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
}
