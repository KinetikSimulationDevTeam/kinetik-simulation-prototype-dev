import React, { useState } from "react";
import UploadImg from '../Images/UploadImg.png'
import { API } from 'aws-amplify';


// drag drop file component
function DragDropFile({onAction}) {
    // drag state
    const [dragActive, setDragActive] = useState(false);
    // ref
    const inputRef = React.useRef(null);

    // This state will store the parsed data
    const [jsonInput, setJsonInput] = useState([]);

    // It will store the file uploaded by the user
    const [file, setFile] = useState("");

    const fileReader = new FileReader();
    
    // handle drag events
    const handleDrag = function(e) {
      e.preventDefault();
      e.stopPropagation();
      alert(`Selected file - ${e.dataTransfer.files[0].name}`);
      onAction(e.dataTransfer.files[0].name);
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
      onAction(e.dataTransfer.files[0].name);
      setFile(e.target.files[0]);
    };
    
    // triggers when file is dropped
    const handleDrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        alert(`Selected file - ${e.dataTransfer.files[0].name}`);
        onAction(e.dataTransfer.files[0].name);
        setFile(e.target.files[0]);
      }
    };
    
    // triggers when file is selected with click
    const handleChange = function(e) {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        alert(`Selected file - ${e.target.files[0].name}`);
        setFile(e.target.files[0]);
        onAction(e.target.files[0].name);
      }
    };
    
    // triggers the input when the button is clicked
    const onButtonClick = () => {
      inputRef.current.click();
    };

    const handleOnSubmit = (e) => {
      e.preventDefault();
  
      if (file) {
        fileReader.onload = function (event) {
          const text = event.target.result;
          csvFileToArray(text);
        };
  
        fileReader.readAsText(file);
      }
    };

    // reading the file and converting into Json
    const csvFileToArray = string => {
      let array = string.toString().split("\n");
      let sources = array[0].split(",");
      let stages = array[1].split(",");
      let newOpsProbabilities = array[4].split(",");
      let mean = [];
      let std = [];
      let opsProbabilities = [];
      let ops = [];

      for(let i = 0; i < sources.length; i++){
        sources[i] = sources[i].toString().trim();
        if(sources[i] === ""){
          sources = sources.slice(1, i);
          break;
        } 
        if(i === sources.length - 1){
          sources = sources.slice(1,sources.length);
        }
      }

      for(let i = 0; i < stages.length; i++){
        stages[i] = stages[i].toString().trim();
        newOpsProbabilities[i] = parseFloat(newOpsProbabilities[i].toString().trim());
        if(stages[i] === "" ){
          stages = stages.slice(1, i);
          newOpsProbabilities = newOpsProbabilities.slice(1, i);
          break;
        } 
        if(i === stages.length - 1){
          stages = stages.slice(1,stages.length);
          newOpsProbabilities = newOpsProbabilities.slice(1,newOpsProbabilities.length);
        }
      }

      for(let i = 0; i < sources.length; i++){
        mean[i] = parseFloat(array[7 + i].split(",")[1]);
        std[i] = parseFloat(array[7 + i].split(",")[2]);
      }

      for(let i = 0; i < stages.length; i++){
        console.log(array[9 + sources.length + i])
        opsProbabilities[i] = array[9 + sources.length + i].split(",");

        for(let j = 0; j < stages.length + 1; j++) {
          opsProbabilities[i][j] = parseFloat(opsProbabilities[i][j].trim());
        }
        opsProbabilities[i] = opsProbabilities[i].slice(1, stages.length + 1);
      }

      ops = array[11 + sources.length + stages.length].split(",").slice(1, stages.length + 1);

      for(let i = 0; i < stages.length; i++){
        ops[i] = parseFloat(ops[i]);
      }

      const jsonData = {
        weeks: 52,
        stages: stages,
        sources: sources,
        ops: ops,
        means: mean,
        stds: std,
        newOpsProbabilities: newOpsProbabilities,
        opsProbabilities: opsProbabilities,
      };
      const jsonString = JSON.stringify(jsonData);
      setJsonInput(jsonString);
      callLambdaFunction();

      console.log(jsonString);
      console.log(sources);
      console.log(stages);
      console.log(newOpsProbabilities);
      console.log(mean);
      console.log(std);
      console.log(opsProbabilities);
      console.log(ops);
    }

    const callLambdaFunction = async () => {
      try {
        const response = await API.post('getSimulationOutput', '/simulation', {
          body: jsonInput
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    
    return (
      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input ref={inputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} accept=".csv"/>
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
          <div>
            <img src={UploadImg} width="50" height="50" alt="" />
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
          </div> 
        </label>
        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}>
             IMPORT CSV
        </button>
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </form>
    );
  };

  export default DragDropFile;
