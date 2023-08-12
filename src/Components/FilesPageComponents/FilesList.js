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
import DeleteIcon from "@mui/icons-material/Delete";
import FileTypeSelectionDialog from "./FileTypeSelectionDialog";
import csvFileToArray from "./CsvFileToArrayInFilesPage";
import { API, graphqlOperation } from "aws-amplify";
import { deleteFile } from "../../graphql/mutations";
import alertify from "alertifyjs";
import InitialPipelineFileColumnSelection from "./InitialPipelineFileColumnSelection";
import FileAnonymizer from "./FileAnonymizer";

const FilesList = () => {
  const [filesFromDdb, setFilesFromDdb] = useState([]);
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("updatedAt");
  const [order, setOrder] = useState("desc");
  const [username, setUsername] = useState("");
  const [update, setUpdate] = useState(false);
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [
    displayInitialPipelineFileColumnSelection,
    setDisplayInitialPipelineFileColumnSelection,
  ] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [InitialPipelineFile, setInitialPipelineFile] = useState("");
  const [anonymizeColumns, setAnonymizeColumns] = useState([]);
  const [uploadFileName, setUploadFileName] = useState("");

  // It will store the file uploaded by the user
  const fileReader = new FileReader();
  const fileReaderInitialPipelineFile = new FileReader();
  // input ref
  const inputRefPipelineSummaryFile = React.useRef(null);
  const inputRefInitialPipelineFile = React.useRef(null);
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const handleSetUpdate = () => {
    setUpdate(!update);
  };

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
    if (event.target.checked) {
      const newSelectedIds = filesFromDdb.map((row) => row.id);
      setSelected(newSelectedIds);
    } else {
      setSelected([]);
    }
    setDisplayDeleteButton(event.target.checked);
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

  const handlePipelineSummaryFileChange = async function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray({
          string: text,
          username: username,
          handleSetUpdate: handleSetUpdate,
          fileName: file.name,
        });
      };

      fileReader.readAsText(file);
    }
  };

  const handleInitialPipelineFileChange = async function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      fileReaderInitialPipelineFile.onload = function (event) {
        const text = event.target.result;
        setInitialPipelineFile(text);
        setDisplayInitialPipelineFileColumnSelection(true);
        setUploadFileName(file.name);
      };

      fileReaderInitialPipelineFile.readAsText(file);
    }
  };

  // Function to trigger the file input click
  const handleUploadButtonClick = () => {
    setOpen(true);
  };

  const handleOnSelectFileType = async (value) => {
    if (value === "pipelineSummary") {
      // When the "Upload Files" button is clicked, trigger the click event on the hidden file input
      inputRefPipelineSummaryFile.current.click();
    } else if (value === "initialPipeline") {
      inputRefInitialPipelineFile.current.click();
    }
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

  // handle close of file type selection dialog
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    handleOnSelectFileType(value);
  };

  const handleInitialPipelineFileColumnSelectionClose = (value) => {
    setDisplayInitialPipelineFileColumnSelection(false);
    setAnonymizeColumns(
      value,
      FileAnonymizer({
        username: username,
        filebody: InitialPipelineFile,
        anonymizeColumns: value,
        handleSetUpdate: handleSetUpdate,
        fileName: uploadFileName,
      })
    );
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
        <Button variant="contained" onClick={handleUploadButtonClick}>
          <img
            style={{ marginRight: "1vw" }}
            src={UploadLogo}
            alt="Upload Logo"
          />
          Upload Files
        </Button>
        <FileTypeSelectionDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
        <InitialPipelineFileColumnSelection
          file={InitialPipelineFile}
          open={displayInitialPipelineFileColumnSelection}
          onClose={handleInitialPipelineFileColumnSelectionClose}
          selectedValues={anonymizeColumns}
        />
        <input
          type="file"
          ref={inputRefPipelineSummaryFile}
          style={{ display: "none" }}
          onChange={handlePipelineSummaryFileChange}
          accept=".csv"
          id="file-upload"
        />
        <input
          type="file"
          ref={inputRefInitialPipelineFile}
          style={{ display: "none" }}
          onChange={handleInitialPipelineFileChange}
          accept=".csv"
          id="file-upload2"
        />
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
                      <b>{row.filetype}</b>
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
