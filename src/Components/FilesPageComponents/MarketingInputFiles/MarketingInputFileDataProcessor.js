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
  let subStages = [];
  let sources = [];
  let subCategoriesNames = [];
  let data = [];
  let totalOpportunities;

  try {
    let rows = filebody.toString().split("\n");

    //get the number of stages
    const firstRow = rows[startRow].split(",");

    if (firstRow[startCol] === "") {
      throw new Error("Invalid start column");
    }

    // first element in the first row is source 1
    sources.push(firstRow[startCol]);

    // loop through the first row and get the stages
    let colCounter = startCol + 1;

    while (colCounter < firstRow.length) {
      if (
        firstRow[colCounter] !== "" &&
        firstRow[colCounter] !== ">" &&
        firstRow[colCounter] !== "\r"
      ) {
        stages.push(firstRow[colCounter]);
      }

      colCounter++;
    }

    // check if the first element in the second row is empty
    let rowCounter = startRow + 1;
    if (rows[rowCounter].split(",")[startCol] !== "") {
      throw new Error("Invalid file format in line " + rowCounter);
    }

    // add the substage names
    const subStageRow = rows[rowCounter].split(",");
    let currentSubstageArr = [];
    colCounter = startCol + 1;

    // loop through the second row and get the substage names
    while (
      colCounter < subStageRow.length &&
      subStages.length < stages.length
    ) {
      if (subStageRow[colCounter] === "") {
        if (currentSubstageArr.length !== 0) {
          subStages.push(currentSubstageArr);
          currentSubstageArr = [];
          colCounter++;
          continue;
        }
      }

      currentSubstageArr.push(subStageRow[colCounter].replace("\r", ""));
      colCounter++;
    }

    // add the last substage names
    if (currentSubstageArr.length !== 0) {
      subStages.push(currentSubstageArr);
    }

    // incrment row counter to the third row
    rowCounter++;

    // loop through the rows and get the number of subcategories
    let subCategoryCounter = 0;
    let currentSubCategoryNames = [];

    // loop through the rows and get the number of sources
    for (let i = rowCounter; i < rows.length; i++) {
      if (rows[i].split(",")[startCol] === "") {
        if (subCategoryCounter === 0) {
          throw new Error("Invalid file format in line" + i);
        }

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

        // Loop through the stages and get the substages values
        for (let k = 0; k < stages.length; k++) {
          let currentSubStagesValues = [];
          for (let l = 0; l < subStages[k].length; l++) {
            // Check if the value is a number
            // if (currentRow[currentCol] === null) {
            //   throw new Error("Invalid value in input file");
            // }

            // Push the substage name
            let val = currentRow[currentCol].replace("\r", "");
            currentSubStagesValues.push(val);
            currentCol++;
          }

          // Push the substage values into currentSubSource
          currentSubSource.push(currentSubStagesValues);
          currentCol++;
        }

        // Push currentSubSource into currentSource
        currentSource.push(currentSubSource);

        // Increment rowCounter and reset currentCol counter
        rowCounter++;
        currentCol = startCol + 1;
      }
      // Push currentSource into the data array
      data.push(currentSource);
      rowCounter = rowCounter + 2;
    }

    // get the total opportunities in the rowCounter row
    const totalOpportunitiesRow = rows[rowCounter].split(",");

    // loop through the row and get the total opportunities
    for (let i = 1; i < totalOpportunitiesRow.length; i++) {
      // check if the value is the total opportunities
      if (
        totalOpportunitiesRow[i] !== "" &&
        totalOpportunitiesRow[i] !== "\r"
      ) {
        totalOpportunities = totalOpportunitiesRow[i];
        break;
      }
    }

    // check if the total opportunities is undefined
    if (totalOpportunities === undefined || totalOpportunities === null) {
      throw new Error("Invalid file format in line " + rowCounter);
    }

    // Create the json body
    const jsonBody = {
      sources: sources,
      subCategoriesNames: subCategoriesNames,
      stages: stages,
      subStages: subStages,
      data: data,
      totalOpportunities: totalOpportunities,
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
