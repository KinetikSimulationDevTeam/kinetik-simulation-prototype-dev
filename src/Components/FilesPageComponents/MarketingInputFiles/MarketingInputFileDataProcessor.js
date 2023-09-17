import { API, graphqlOperation } from "aws-amplify";
import { createUser, createFile } from "../../../graphql/mutations";
import alertify from "alertifyjs";

const MarketingInputFileDataProcessor = async ({
  filebody,
  username,
  fileName,
  handleSetUpdate,
}) => {
  const startRow = 0;
  const startCol = 0;

  let stages = [];
  let sources = [];
  let subCategoriesNames = [];
  let data = [];

  try {
    let rows = filebody.toString().split("\n");

    //get the number of stages
    const firstRow = rows[startRow].split(",");

    if (firstRow[startCol] === "") {
      return;
    }

    // first element in the first row is source 1
    sources.push(firstRow[startCol]);

    // loop through the first row and get the stages
    let colCounter = startCol + 1;
    while (colCounter < firstRow.length) {
      if (firstRow[colCounter] === "") {
        break;
      }

      stages.push(firstRow[colCounter]);
      colCounter = colCounter + 3;
    }

    let rowCounter = startRow + 1;
    if (rows[rowCounter].split(",")[startCol] !== "") {
      throw new Error("Invalid file format");
    }
    rowCounter++;

    let subCategoryCounter = 0;
    let currentSubCategoryNames = [];
    // loop through the rows and get the number of sources
    for (let i = rowCounter; ; i++) {
      if (rows[i].split(",")[startCol] === "") {
        subCategoriesNames.push(currentSubCategoryNames);
        subCategoryCounter = -1;
        currentSubCategoryNames = [];

        // if the current row is empty, then the next row will be the start of the next subcategory
        // if the current row is empty, and the next row is also empty, then we have reached the end of the file
        if (rows[i + 1].split(",")[startCol] === "") {
          break;
        }

        continue;
      }

      // store the source name
      if (subCategoryCounter === -1) {
        sources.push(rows[i].split(",")[startCol]);
        subCategoryCounter++;
        continue;
      }

      if (i === rows.length - 1) {
        currentSubCategoryNames.push(rows[i].split(",")[startCol]);
        subCategoriesNames.push(currentSubCategoryNames);
        break;
      }

      // store the current subcategory name
      currentSubCategoryNames.push(rows[i].split(",")[startCol]);
      subCategoryCounter++;
    }

    // loop through the rows and get the data
    rowCounter = startRow + 2;
    for (let i = 0; i < sources.length; i++) {
      // Initialize currentSource as an empty array
      let currentSource = [];
      for (let j = 0; j < subCategoriesNames[i].length; j++) {
        let currentRow = rows[rowCounter].split(",");
        // Initialize currentSubSource as an empty array
        let currentSubSource = [];
        let currentCol = startCol + 1;
        for (let k = 0; k < stages.length; k++) {
          if (
            parseFloat(currentRow[currentCol]) === NaN ||
            parseFloat(currentRow[currentCol + 1]) === NaN
          ) {
            throw new Error("Invalid number in file");
          }
          let mean = currentRow[currentCol];
          let std = currentRow[currentCol + 1];
          std = std.replace("\r", "");

          // Push mean and std as an array
          currentSubSource.push([mean, std]);
          currentCol = currentCol + 3;
        }

        // Push currentSubSource into currentSource
        currentSource.push(currentSubSource);
        rowCounter++;
      }
      // Push currentSource into the data array
      data.push(currentSource);
      rowCounter = rowCounter + 2;
    }

    // Create the json body
    const jsonBody = {
      sources: sources,
      subCategoriesNames: subCategoriesNames,
      stages: stages,
      data: data,
    };

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
      body: JSON.stringify(jsonBody),
      filetype: "Marketing Input",
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

export default MarketingInputFileDataProcessor;
