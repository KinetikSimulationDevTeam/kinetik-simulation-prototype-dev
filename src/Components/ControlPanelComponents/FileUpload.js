import React, { useEffect, useState } from "react";
import UploadImg from "../../Images/UploadImg.png";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { createUser, createFile } from "../../graphql/mutations";
import { getUserDdb } from "../DynamoDBFunctions";
import { Checkbox } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";
import { Link } from "react-router-dom";
import FileSelection from "./FileSelection";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

/*
    Description: This component is used to display the drag and drop file upload.

    Arguments: onAction: callback function to update the state in Simulation.js

    Return Type: None
*/
function DragDropFile(props) {
  // drag state
  // input ref
  const inputRef = React.useRef(null);
  // It will store the file uploaded by the user
  const [file, setFile] = useState("");
  const fileReader = new FileReader();
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [filesFromDdb, setFilesFromDdb] = useState([]);
  const [showFileSelect, setShowFileSelect] = useState(false);
  const [showConfirmationButtons, setShowConfirmationButtons] = useState(false);
  const [uploadtoDatabase, setUploadtoDatabase] = useState(false);
  const [previousFileName, setPreviousFileName] = useState("");
  const [previousFileBody, setPreviousFileBody] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [importCsvButtonFlashing, setImportCsvButtonFlashing] = useState(false);

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    // Call handleUserLogin() when user variable changes
    handleUserLogin();
  }, [user]);

  /*
    Description: Store username if user is logged in.

    Arguments: None

    Return Type: None
  */
  const handleUserLogin = async function () {
    try {
      setUsername(user.username);
      setUserLoginStatus(true);
    } catch (e) {
      setUserLoginStatus(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*
    Description: triggers when file is selected with click.

    Arguments: None

    Return Type: None
  */
  const handleChange = async function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setOpen(true);
      setSelectedFileName(e.target.files[0].name);
      if (localStorage.getItem("fileName") !== null) {
        setPreviousFileName(localStorage.getItem("fileName"));
      }

      if (localStorage.getItem("KinetikDataSet") !== null) {
        setPreviousFileBody(localStorage.getItem("KinetikDataSet"));
      }

      localStorage.setItem("fileName", e.target.files[0].name);
      await setFile(e.target.files[0], props.onAction(e.target.files[0].name));
      setImportCsvButtonFlashing(true);
    }
  };

  /*
    Description: triggers when file is selected with click.

    Arguments: None

    Return Type: None
  */
  const onButtonClick = () => {
    inputRef.current.click();
  };

  /*
    Description: triggers when file is selected with click.

    Arguments: None

    Return Type: None
  */
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
      setImportCsvButtonFlashing(false);
    } else if (localStorage.getItem("KinetikDataSet") !== null) {
      alertify.error("No new file uploaded.");
    } else {
      alertify.error("Please select a file");
    }
  };

  /*
    Description: parsing the file and converting into Json.

    Arguments: None

    Return Type: None
  */
  const csvFileToArray = async (string) => {
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
        weeks: Number(props.timePeriod),
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
      if (localStorage.getItem("KinetikDataSet") !== null) {
        setPreviousFileBody(localStorage.getItem("KinetikDataSet"));
      }
      localStorage.setItem("KinetikDataSet", jsonString);

      if (userLoginStatus && uploadtoDatabase) {
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
          title: localStorage.getItem("fileName"),
          body: jsonString,
          filetype: "Pipeline Summary",
        };

        const fileResult = await API.graphql(
          graphqlOperation(createFile, { input: fileParams })
        );
        const file = fileResult.data.createFile;
      }

      alertify.success("Successfully Upload a file.");
      alertify.success(
        'Please click "Start Simulation" to run the simulation.'
      );
      props.handleUploadCount();
      props.startSimulationButtonFlash();
    } catch (err) {
      alertify.error("Input File is not in correct format");
      if (previousFileBody !== "") {
        alertify.error("Reverting to previous file.");
      }
      localStorage.setItem("KinetikDataSet", previousFileBody);
      localStorage.setItem("fileName", previousFileName);
      setFile(null);
      setPreviousFileBody(null);
      setPreviousFileName(null);
    }
  };

  //monitor the time period change
  useEffect(() => {
    if (localStorage.getItem("KinetikDataSet") !== null) {
      const jsonObject = JSON.parse(localStorage.getItem("KinetikDataSet"));
      jsonObject.weeks = Number(props.timePeriod);
      const jsonString = JSON.stringify(jsonObject);
      if (localStorage.getItem("KinetikDataSet") !== null) {
        setPreviousFileBody(localStorage.getItem("KinetikDataSet"));
      }
      localStorage.setItem("KinetikDataSet", jsonString);
    }
  }, [props.timePeriod]);

  useEffect(() => {
    if (userLoginStatus && username) {
      const fetchData = async () => {
        try {
          const fileResult = await getUserDdb(username);
          setFilesFromDdb(fileResult.data.getUser.files.items);
        } catch (e) {}
      };

      fetchData();
    }
  }, [userLoginStatus, username]);

  const handleSelectButtonClick = (e) => {
    e.preventDefault();
    setShowFileSelect(!showFileSelect);
    setShowConfirmationButtons(true);
  };

  const handleGoBackClick = () => {
    setShowFileSelect(false);
    setShowConfirmationButtons(false);
  };

  const handleConfirmSelectionClick = (e) => {
    e.preventDefault();
    const selectElement = document.getElementsByName("filesDdb")[0];
    const selectedValue =
      selectElement.options[selectElement.selectedIndex].value;
    const selectedText =
      selectElement.options[selectElement.selectedIndex].text;
    var fileName = selectedText.split(": ")[1];
    fileName = fileName.split(",")[0].trim();
    if (
      localStorage.getItem("KinetikDataSet") !== null &&
      localStorage.getItem("fileName") !== null
    ) {
      setPreviousFileBody(localStorage.getItem("KinetikDataSet"));
      setPreviousFileName(localStorage.getItem("fileName"));
    }
    localStorage.setItem("KinetikDataSet", selectedValue);
    localStorage.setItem("fileName", fileName);
    props.handleUploadCount();
    setShowFileSelect(false);
    setShowConfirmationButtons(false);
    alertify.success("Successfully select a file from the database.");
    alertify.success('Please click "Start Simulation" to run the simulation.');
  };

  // function to handle checkbox state changes
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setUploadtoDatabase(isChecked);
  };

  return (
    <div id="upload-module-right-section">
      <a
        id="upload-module-template-link"
        href="https://docs.google.com/spreadsheets/d/1BFe5Zd3hNXDDj_UhxXslOETMXakupOt3WtGcI0YQkro/template/preview"
        target="_blank"
      >
        <h5> Input File Template </h5>
      </a>
      {!showFileSelect && !showConfirmationButtons && (
        <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            multiple={false}
            onChange={handleChange}
            accept=".csv"
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={
              selectedFileName === "" &&
              localStorage.getItem("KinetikDataSet") === null
                ? "control-panel-upload-flashing-border"
                : ""
            }
          >
            <div>
              <img id="upload-logo" src={UploadImg} alt="" />
              <p>Click here to</p>
              <button className="upload-click-text" onClick={onButtonClick}>
                Upload a file
              </button>
            </div>
          </label>
          {userLoginStatus && (
            <Checkbox
              shape="round"
              color="primary-o"
              className="upload-to-cloud"
              value="true"
              onChange={handleCheckboxChange}
            >
              {" "}
              Save file to database for future use{" "}
            </Checkbox>
          )}
          {!userLoginStatus && (
            <p id="remind-signin-text">
              <Link to="/signin">Sign in</Link> to save file to database
            </p>
          )}
          {!userLoginStatus && (
            <button
              className="upload-button-not-logged-in"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              Import CSV
            </button>
          )}
          {userLoginStatus && (
            <button
              className={`${
                userLoginStatus && !showFileSelect && !showConfirmationButtons
                  ? importCsvButtonFlashing
                    ? "flashing-background upload-button"
                    : "upload-button"
                  : "upload-button-not-logged-in"
              }`}
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              Import CSV
            </button>
          )}
          {userLoginStatus && (
            <button className="upload-button" onClick={handleSelectButtonClick}>
              Database
            </button>
          )}
        </form>
      )}
      {showFileSelect && (
        <FileSelection
          filesFromDdb={filesFromDdb}
          showConfirmationButtons={showConfirmationButtons}
          handleGoBackClick={handleGoBackClick}
          handleConfirmSelectionClick={handleConfirmSelectionClick}
        />
      )}

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>File Selected</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You selected {selectedFileName} from your computer!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DragDropFile;
