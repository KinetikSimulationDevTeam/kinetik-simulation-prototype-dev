import React, { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { getUserDdb } from "../DynamoDBFunctions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import CsvLogo from "../../Images/CsvLogo.png";
import Button from "@mui/material/Button";
import UploadLogo from "../../Images/UploadLogo.png";
import { API, graphqlOperation } from "aws-amplify";
import { createUser, createFile, deleteFile } from "../../graphql/mutations";
import alertify from "alertifyjs";
import DeleteIcon from "@mui/icons-material/Delete";

const FilesList = () => {
  const [filesFromDdb, setFilesFromDdb] = useState([]);
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("updatedAt");
  const [order, setOrder] = useState("desc");
  const [username, setUsername] = useState("");
  const [update, setUpdate] = useState(false);
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);

  // It will store the file uploaded by the user
  const fileReader = new FileReader();
  // input ref
  const inputRef = React.useRef(null);
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      setUsername(user.username);
      const fetchData = async () => {
        try {
          const fileResult = await getUserDdb(user.username);
          setFilesFromDdb(fileResult.data.getUser.files.items);
        } catch (e) {
          console.log(e);
        }
      };

      fetchData();
    }
  }, [user, authStatus, update]);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    // For date sorting
    if (property === "updatedAt") {
      const sortedFiles = filesFromDdb.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return isAsc ? dateA - dateB : dateB - dateA;
      });
      setFilesFromDdb(sortedFiles);
    } else if (property === "title") {
      // For title sorting
      const sortedFiles = filesFromDdb.sort((a, b) => {
        return isAsc
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
      setFilesFromDdb(sortedFiles);
    } else {
      // For other columns sorting
      const sortedFiles = filesFromDdb.sort((a, b) => {
        return isAsc
          ? a[property].localeCompare(b[property])
          : b[property].localeCompare(a[property]);
      });
      setFilesFromDdb(sortedFiles);
    }
  };

  const handleSelectAllClick = (event) => {
    if (filesFromDdb.length > 0) {
      if (event.target.checked) {
        const newSelectedIds = filesFromDdb.map((row) => row.id);
        setSelected(newSelectedIds);
      } else {
        setSelected([]);
      }
      setDisplayDeleteButton(event.target.checked);
    }
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = newSelectedIds.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelectedIds = newSelectedIds.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelectedIds = newSelectedIds.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedIds = newSelectedIds.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelectedIds);
    setDisplayDeleteButton(newSelectedIds.length > 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handleFileChange = async function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  // Function to trigger the file input click
  const handleUploadButtonClick = () => {
    // When the "Upload Files" button is clicked, trigger the click event on the hidden file input
    inputRef.current.click();
  };

  const handleDeleteButtonClick = async () => {
    try {
      const deleteFilePromises = selected.map((id) => {
        return API.graphql(graphqlOperation(deleteFile, { input: { id: id } }));
      });
      await Promise.all(deleteFilePromises);
      setUpdate(!update);
      alertify.success("File(s) deleted successfully");
      setDisplayDeleteButton(false);
    } catch (e) {
      console.log(e);
      alertify.error("Error deleting file(s)");
    }
  };

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
        title: localStorage.getItem("fileName"),
        body: jsonString,
      };

      const fileResult = await API.graphql(
        graphqlOperation(createFile, { input: fileParams })
      );
      const file = fileResult.data.createFile;
      setUpdate(!update);
      alertify.success("File Uploaded Successfully");
    } catch (err) {
      alertify.error("Input File is not in correct format");
    }
  };

  return (
    <div>
      <div id="files-page-top">
        <div id="files-title-delete-button">
          <h3 className="title">Files</h3>
          {displayDeleteButton && (
            <Button
              color="error"
              variant="contained"
              onClick={() => handleDeleteButtonClick()}
            >
              <DeleteIcon style={{ marginRight: "0.5vw" }} />
              Delete Files
            </Button>
          )}
        </div>
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept=".csv"
          id="file-upload"
        />
        <Button variant="contained" onClick={handleUploadButtonClick}>
          <img
            style={{ marginRight: "1vw" }}
            src={UploadLogo}
            alt="Upload Logo"
          />
          Upload Files
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="sortable and selectable table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < filesFromDdb.length
                  }
                  checked={
                    filesFromDdb.length > 0 &&
                    selected.length === filesFromDdb.length
                  }
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "file"}
                  direction={orderBy === "file" ? order : "asc"}
                  onClick={() => handleSortRequest("file")}
                >
                  File
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "title"}
                  direction={orderBy === "title" ? order : "asc"}
                  onClick={() => handleSortRequest("title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "owner"}
                  direction={orderBy === "owner" ? order : "asc"}
                  onClick={() => handleSortRequest("owner")}
                >
                  Owner
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "updatedAt"}
                  direction={orderBy === "updatedAt" ? order : "asc"}
                  onClick={() => handleSortRequest("updatedAt")}
                >
                  Last Modified Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filesFromDdb.map((row) => {
              const isItemSelected = selected.indexOf(row.id) !== -1;
              return (
                <TableRow
                  key={row.id}
                  hover
                  onClick={(event) => handleRowClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div className="file-type-layout">
                      <img
                        className="files-type-logo"
                        src={CsvLogo}
                        alt="csv logo"
                      />
                      <b>Pipeline Detail</b>
                    </div>
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>Me</TableCell>
                  <TableCell>{formatDate(row.updatedAt)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FilesList;
