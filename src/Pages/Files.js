import React, { useState } from 'react'
import SearchAppBar from '../Components/SearchAppBar'
import NavigationBar from '../Components/NavigationBar'
import Button from '@mui/material/Button';
import UploadLogo from '../Images/UploadLogo.png'
import FilesList from '../Components/FilesPageComponents/FilesList';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

const Files = () => {
    return (
        <div>
            <SearchAppBar />
            <NavigationBar />
            <div id='files-page-layout'>
                <div id='files-page-top'>
                    <h3 className='title'>Files</h3>
                    <Button variant="contained">
                        <img style={{marginRight: '1vw'}} src={UploadLogo} alt="Upload Logo" />
                        Upload Files
                    </Button>
                </div>
                <div id='files-page-body'>
                    <Authenticator>
                        <FilesList />
                    </Authenticator>
                </div>
            </div>

        </div>
  )
}

export default Files
