import React, { useEffect, useState } from "react";
import UploadImg from '../Images/UploadImg.png'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

// drag drop file component
function DragDropFile(props) {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  // input ref
  const inputRef = React.useRef(null);
  // It will store the file uploaded by the user
  const [file, setFile] = useState("");
  // It will store the file uploaded by the user
  const fileReader = new FileReader();

  /*
    Description: triggers when file is drag.

    Arguments: None

    Return Type: None
  */
  const handleDrag = async function (e) {
    e.preventDefault();
    e.stopPropagation();
    alert(`Selected file - ${e.dataTransfer.files[0].name}`);
    localStorage.setItem('fileName', e.target.files[0].name);
    props.onAction(e.dataTransfer.files[0].name);
    if (e.type === "dragenter" || e.type === "dragover") {
      await setDragActive(true, props.onAction(e.dataTransfer.files[0].name));
    } else if (e.type === "dragleave") {
      await setDragActive(false, props.onAction(e.dataTransfer.files[0].name));
    }
    await setFile(e.target.files[0]);
  };

  /*
    Description: triggers when file is dropped.

    Arguments: None

    Return Type: None
  */
  const handleDrop = async function (e) {
    e.preventDefault();
    e.stopPropagation();
    await setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      alert(`Selected file - ${e.dataTransfer.files[0].name}`);
      localStorage.setItem('fileName', e.target.files[0].name);
      props.onAction(e.dataTransfer.files[0].name);
      await setFile(e.target.files[0]);
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
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }else{
      alertify.error("Please select a file");
    }
  };

  /*
    Description: parsing the file and converting into Json.

    Arguments: None

    Return Type: None
  */
  const csvFileToArray = (string) => {
    try {
      let array = string.toString().split("\n");
      let sources = array[0].split(",");
      let stages = array[1].split(",");
      let newOpsProbabilities = array[4].split(",");
      let mean = [];
      let std = [];
      let opsProbabilities = [];
      let ops = [];

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
      };
      const jsonString = JSON.stringify(jsonData);
      localStorage.setItem('KinetikDataSet', jsonString);
      alertify.success('Successfully Upload a file.');
      props.handleUploadCount();
    } catch (err) {
      alertify.error("Input File is not in correct format");
    }
  }

  useEffect(() => {
    if (localStorage.getItem('KinetikDataSet') !== null) {
      const jsonObject = JSON.parse(localStorage.getItem('KinetikDataSet'));
      jsonObject.weeks = Number(props.timePeriod);
      const jsonString = JSON.stringify(jsonObject);
      localStorage.setItem('KinetikDataSet', jsonString);
    }
  }, [Number(props.timePeriod)]);

  return (
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} accept=".csv" />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
        <div>
          <img src={UploadImg} width="50" height="50" alt="" />
          <p>Drag and drop your file here or</p>
          <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
        </div>
      </label>
      <button className="button"
        onClick={(e) => {
          handleOnSubmit(e);
        }}>
        Import CSV
      </button>
      {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
    </form>
  );
};

export default DragDropFile;
