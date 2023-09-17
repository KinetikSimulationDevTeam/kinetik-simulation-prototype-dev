import React from "react";
import SearchAppBar from "../Components/SearchAppBar";
import NavigationBar from "../Components/NavigationBar";
import ManageFilesScene from "../Components/FilesPageComponents/ManageFilesScene";
import { Authenticator } from "@aws-amplify/ui-react";

const Files = () => {
  return (
    <div>
      <SearchAppBar />
      <NavigationBar />
      <div id="files-page-layout">
        <Authenticator>
          <ManageFilesScene />
        </Authenticator>
      </div>
    </div>
  );
};

export default Files;
