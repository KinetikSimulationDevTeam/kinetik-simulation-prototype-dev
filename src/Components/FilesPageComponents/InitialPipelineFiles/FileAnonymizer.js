import { API, graphqlOperation } from "aws-amplify";
import { createUser, createFile } from "../../../graphql/mutations";
import alertify from "alertifyjs";

const FileAnonymizer = async ({
  filebody,
  anonymizeColumns,
  username,
  handleSetUpdate,
  fileName,
}) => {
  try {
    let array = filebody.toString().split("\n");
    let sources = array[0].split(",");

    //get the number of sources
    for (let i = 0; i < sources.length; i++) {
      sources[i] = sources[i].toString().trim();
      if (sources[i] === "") {
        sources = sources.slice(1, i);
        break;
      }
      if (i === sources.length - 1) {
        sources = sources.slice(1, sources.length);
      }
    }

    array = array.slice(1, array.length);

    //parse each row and anonymize the selected columns
    for (let i = 0; i < array.length; i++) {
      let row = array[i].split(",");

      if (row.length > sources.length) {
        row = row.slice(0, sources.length);
      } else if (row.length < sources.length) {
        for (let j = row.length; j < sources.length; j++) {
          row.push("");
        }
      }

      for (let j = 0; j < row.length; j++) {
        if (anonymizeColumns.includes(j)) {
          row[j] = "*****";
        }
      }
      array[i] = row.join(",");
    }

    //create new array for each index in array, seperated by comma
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].split(",");
    }

    const jsonData = {
      sources: sources,
      data: array,
    };

    const jsonString = JSON.stringify(jsonData);

    try {
      // create user
      const userParams = { id: username };

      const userResult = await API.graphql(
        graphqlOperation(createUser, { input: userParams })
      );
      const user = userResult.data.createUser;
    } catch (err) {}

    // create file
    const fileParams = {
      userid: username,
      title: fileName,
      body: jsonString,
      filetype: "Initial Pipeline",
    };

    const fileResult = await API.graphql(
      graphqlOperation(createFile, { input: fileParams })
    );
    const file = fileResult.data.createFile;
    handleSetUpdate();
    alertify.success("File Uploaded Successfully");
  } catch (err) {
    console.log(err);
    alertify.error("Input File is not in correct format");
  }
};

export default FileAnonymizer;
