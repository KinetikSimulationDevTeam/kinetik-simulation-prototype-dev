import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchFilesDdb } from "../DynamoDBFunctions";
import DatabaseFileSelectionDialog from "./DatabaseFileSelectionDialog";

const DatabaseFileSelection = ({
  handleUploadCount,
  startSimulationButtonFlash,
  handleFileNameUpdate,
}) => {
  const [filesFromDdb, setFilesFromDdb] = useState([]);
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  /*
    Description: Store username if user is logged in.

    Arguments: None

    Return Type: None
  */
  const handleUserLogin = async function () {
    if (user) {
      setUsername(user.username);
      setUserLoginStatus(true);
    }
  };

  useEffect(() => {
    if (userLoginStatus && username) {
      const fetchData = async () => {
        try {
          const fileResult = await fetchFilesDdb();
          setFilesFromDdb(fileResult, console.log(fileResult));
        } catch (e) {}
      };

      fetchData();
    }
  }, [userLoginStatus, username]);

  useEffect(() => {
    // Call handleUserLogin() when user variable changes
    handleUserLogin();
  }, [user]);

  const handleButtonClick = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="error"
        size="medium"
        sx={{ fontSize: "10px", width: "100%", whiteSpace: "nowrap" }}
        onClick={handleButtonClick}
      >
        Select Database File
      </Button>
      <DatabaseFileSelectionDialog
        files={filesFromDdb}
        open={open}
        close={handleClose}
        handleUploadCount={handleUploadCount}
        startSimulationButtonFlash={startSimulationButtonFlash}
        handleFileNameUpdate={handleFileNameUpdate}
      />
    </Box>
  );
};

export default DatabaseFileSelection;
