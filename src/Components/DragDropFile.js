import React, { useEffect, useState } from "react";
import UploadImg from '../Images/UploadImg.png'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { API, graphqlOperation } from 'aws-amplify';
import { createUser, createFile } from '../graphql/mutations';
import { getUserDdb } from './DynamoDBFunctions';
import { Checkbox } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import { Link } from 'react-router-dom';

/*
    Description: This component is used to display the drag and drop file upload.

    Arguments: onAction: callback function to update the state in Simulation.js

    Return Type: None
*/
function DragDropFile(props) {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  // input ref
  const inputRef = React.useRef(null);
  // It will store the file uploaded by the user
  const [file, setFile] = useState("");
  // It will store the file uploaded by the user
  const fileReader = new FileReader();
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [username, setUsername] = useState('');
  const [filesFromDdb, setFilesFromDdb] = useState([]);
  const [showFileSelect, setShowFileSelect] = useState(false);
  const [showConfirmationButtons, setShowConfirmationButtons] = useState(false);
  const [uploadtoDatabase, setUploadtoDatabase] = useState(false);

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
    try{
      setUsername(user.username)
      setUserLoginStatus(true);
    }catch(e){
      setUserLoginStatus(false);
    }
  };

  /*
    Description: triggers when file is selected with click.

    Arguments: None

    Return Type: None
  */
  const handleChange = async function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      alert(`Selected file - ${e.target.files[0].name}`);
      localStorage.setItem('fileName', e.target.files[0].name);
      await setFile(e.target.files[0], props.onAction(e.target.files[0].name));
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
    }else if(localStorage.getItem('KinetikDataSet') !== null){
      alertify.success("File already uploaded");
    }else{
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
        newOpsProbabilities[i] = parseFloat(newOpsProbabilities[i].toString().trim());
        if (stages[i] === "") {
          stages = stages.slice(1, i);
          newOpsProbabilities = newOpsProbabilities.slice(1, i);
          break;
        }
        if (i === stages.length - 1) {
          stages = stages.slice(1, stages.length);
          newOpsProbabilities = newOpsProbabilities.slice(1, newOpsProbabilities.length);
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
      ops = array[11 + sources.length + stages.length].split(",").slice(1, stages.length + 1);

      //convert the ops to float
      for (let i = 0; i < stages.length; i++) {
        ops[i] = parseFloat(ops[i]);
      }

      //add slider values to the json object
      for (let i = 0; i < 6; i++) {
        sliderValues[i] = 0; //default value
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
      };
      const jsonString = JSON.stringify(jsonData);
      localStorage.setItem('KinetikDataSet', jsonString);

      if(userLoginStatus && uploadtoDatabase){
        
        try{
          // create user
          const userParams = { id: username }

          const userResult = await API.graphql(graphqlOperation(createUser, { input: userParams }));
          const user = userResult.data.createUser;
        }catch(err){
        }

        // create file
        const fileParams = {
            userid: username,
            title: localStorage.getItem('fileName'),
            body: jsonString
        }

        const fileResult = await API.graphql(graphqlOperation(createFile, { input: fileParams }));
        const file = fileResult.data.createFile;

      }

      alertify.success('Successfully Upload a file');
      props.handleUploadCount();
    } catch (err) {
      alertify.error("Input File is not in correct format");
    }
  }

  //monitor the time period change
  useEffect(() => {
    if (localStorage.getItem('KinetikDataSet') !== null) {
      const jsonObject = JSON.parse(localStorage.getItem('KinetikDataSet'));
      jsonObject.weeks = Number(props.timePeriod);
      const jsonString = JSON.stringify(jsonObject);
      localStorage.setItem('KinetikDataSet', jsonString);
    }
  }, [Number(props.timePeriod)]);

  useEffect(() => {
    if (userLoginStatus && username) {
      const fetchData = async () => {
        try {
          const fileResult = await getUserDdb(username);
          setFilesFromDdb(fileResult.data.getUser.files.items);

        } catch (e) {
        }
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
    const selectedValue = selectElement.options[selectElement.selectedIndex].value;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;
    var fileName = selectedText.split(": ")[1];
    fileName = fileName.split(",")[0].trim();
    localStorage.setItem("KinetikDataSet", selectedValue);
    localStorage.setItem("fileName", fileName);
    props.handleUploadCount();
    setShowFileSelect(false);
    setShowConfirmationButtons(false);
  };

  // function to handle checkbox state changes
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setUploadtoDatabase(isChecked);
  };


  return (
    <div>
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
            className={dragActive ? "drag-active" : ""}
          >
            <div>
              <img src={UploadImg} width="55vw" height="55vh" alt="" />
              <p>Click here to</p>
              <button className="upload-click-text" onClick={onButtonClick}>
                Upload a file
              </button>
            </div>
          </label>
          { userLoginStatus &&
            <Checkbox shape="round" color="primary-o" className="upload-to-cloud" value="true" onChange={handleCheckboxChange}> Save file to database for future use </Checkbox>
          }
          { !userLoginStatus &&
            <p id="remind-signin-text">
              Please{' '}
              <Link to="/signin" >
                sign in
              </Link>
              {' '}to save file to database
            </p>
          }
          <button
            className="upload-button"
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            Import CSV
          </button>
          {userLoginStatus && (
            <button className="upload-button" onClick={handleSelectButtonClick}>
              Database
            </button>
          )}
        </form>
      )}
  
      {showFileSelect && (
        <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}>
          <select className='upload-module-ddb-dropdown' name="filesDdb" defaultValue="disabled">
            <option value="disabled" disabled>Choose From Uploaded File</option>
            {filesFromDdb.map((file) => (
              <option key={file.id} value={file.body}>
                {"File Name: " + file.title + ", Time: " + new Date(file.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')}
              </option>
            ))}
          </select>
          {showConfirmationButtons && (
            <div>
              <button className="upload-button" onClick={handleGoBackClick}>
                Back
              </button>
              <button className="upload-button" onClick={(e) => {
                handleConfirmSelectionClick(e);
              }}>
                Confirm
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default DragDropFile;
