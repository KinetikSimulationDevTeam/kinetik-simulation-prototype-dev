import { React, useState, useEffect } from "react";
import { Box } from "@mui/material";
import UploadFile from "./UploadFile";
import FileSample from "./FileSample";
import TemplateDownload from "./TemplateDownload";
import DatabaseFileSelection from "./DatabaseFileSelection";
import { useAuthenticator } from "@aws-amplify/ui-react";

const ControlPanelFileSelections = (props) => {
  const [userLoginStatus, setUserLoginStatus] = useState(false);

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  /*
    Description: Store username if user is logged in.

    Arguments: None

    Return Type: None
  */
  const handleUserLogin = async function () {
    if (user) {
      setUserLoginStatus(true);
    }
  };

  useEffect(() => {
    // Call handleUserLogin() when user variable changes
    handleUserLogin();
  }, [user]);

  const setUploadCount = () => {
    props.handleUploadCount();
  };

  const setSimulationButtonFlash = () => {
    props.startSimulationButtonFlash();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5%",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
      }}
    >
      <FileSample
        handleUploadCount={setUploadCount}
        startSimulationButtonFlash={setSimulationButtonFlash}
        handleFileNameUpdate={props.handleFileNameUpdate}
      />
      <TemplateDownload />
      {userLoginStatus && (
        <DatabaseFileSelection
          handleUploadCount={setUploadCount}
          startSimulationButtonFlash={setSimulationButtonFlash}
          handleFileNameUpdate={props.handleFileNameUpdate}
        />
      )}
      <UploadFile
        handleUploadCount={setUploadCount}
        startSimulationButtonFlash={setSimulationButtonFlash}
        handleFileNameUpdate={props.handleFileNameUpdate}
      />
    </Box>
  );
};

export default ControlPanelFileSelections;
