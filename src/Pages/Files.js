import React from "react";
import SearchAppBar from "../Components/SearchAppBar";
import NavigationBar from "../Components/NavigationBar";
import FilesList from "../Components/FilesPageComponents/FilesList";
import { Authenticator } from "@aws-amplify/ui-react";

const Files = () => {
  return (
    <div>
      <SearchAppBar />
      <NavigationBar />
      <div id="files-page-layout">
        <Authenticator>
          <FilesList />
        </Authenticator>
      </div>
    </div>
  );
};

export default Files;
