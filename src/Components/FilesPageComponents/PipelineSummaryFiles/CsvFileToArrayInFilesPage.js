import { API, graphqlOperation } from "aws-amplify";
import { createUser, createFile } from "../../../graphql/mutations";
import alertify from "alertifyjs";

const csvFileToArray = async ({
  string,
  username,
  handleSetUpdate,
  fileName,
}) => {
  try {
    let array = string.toString().split("\n");
    let sources = array[0].split(",");
    let stages = array[1].split(",");
    let newOpsProbabilities = array[4].split(",");
    let mean = [];
    let std = [];
    let opsProbabilities = [];
    let ops = [];
    let sliderValues = [];
    let dealSize = [];

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

    //get the number of stages
    for (let i = 0; i < stages.length; i++) {
      stages[i] = stages[i].toString().trim();
      newOpsProbabilities[i] = parseFloat(
        newOpsProbabilities[i].toString().trim()
      );
      if (stages[i] === "") {
        stages = stages.slice(1, i);
        newOpsProbabilities = newOpsProbabilities.slice(1, i);
        break;
      }
      if (i === stages.length - 1) {
        stages = stages.slice(1, stages.length);
        newOpsProbabilities = newOpsProbabilities.slice(
          1,
          newOpsProbabilities.length
        );
      }
    }

    //get the mean and std
    for (let i = 0; i < sources.length; i++) {
      mean[i] = parseFloat(array[7 + i].split(",")[1]);
      std[i] = parseFloat(array[7 + i].split(",")[2]);
    }

    //get the ops probabilities
    for (let i = 0; i < stages.length; i++) {
      opsProbabilities[i] = array[9 + sources.length + i].split(",");

      for (let j = 0; j < stages.length + 1; j++) {
        opsProbabilities[i][j] = parseFloat(opsProbabilities[i][j].trim());
      }
      opsProbabilities[i] = opsProbabilities[i].slice(1, stages.length + 1);
    }

    //get the ops
    ops = array[11 + sources.length + stages.length]
      .split(",")
      .slice(1, stages.length + 1);

    //convert the ops to float
    for (let i = 0; i < stages.length; i++) {
      ops[i] = parseFloat(ops[i]);
    }

    //add slider values to the json object
    for (let i = 0; i < 6; i++) {
      //default value for slider is 0
      sliderValues[i] = 0;
    }

    // get the deal size mean and std from the csv file
    dealSize = array[14 + sources.length + stages.length]
      .split(",")
      .slice(1, 3);

    //convert the deal size to float
    for (let i = 0; i < 2; i++) {
      dealSize[i] = dealSize[i].toString().replace("$", "");
      dealSize[i] = parseFloat(dealSize[i]);
    }

    //convert data into json object
    const jsonData = {
      weeks: 52,
      stages: stages,
      sources: sources,
      ops: ops,
      means: mean,
      stds: std,
      newOpsProbabilities: newOpsProbabilities,
      opsProbabilities: opsProbabilities,
      sliderValues: sliderValues,
      dealSizeMean: dealSize[0],
      dealSizeStd: dealSize[1],
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
      filetype: "Pipeline Summary",
    };

    const fileResult = await API.graphql(
      graphqlOperation(createFile, { input: fileParams })
    );
    const file = fileResult.data.createFile;
    handleSetUpdate();
    alertify.success("File Uploaded Successfully");
  } catch (err) {
    alertify.error("Input File is not in correct format");
  }
};

export default csvFileToArray;
