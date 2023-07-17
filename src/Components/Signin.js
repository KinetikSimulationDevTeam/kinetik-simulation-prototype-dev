import React, { useEffect, useState } from 'react';
import Navigationbar from './NavigationBar';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Link } from 'react-router-dom';
import Smile from '../Images/Smile.png';
import { getUserDdb } from './DynamoDBFunctions';

const Signin = () => {
  const [filesFromDdb, setFilesFromDdb] = useState([]);

  const fetchData = async (username) => {
    try {
      const fileResult = await getUserDdb(username);
      setFilesFromDdb(fileResult.data.getUser.files.items);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  return (
    <div>
      <Navigationbar />
      <div id='authentication-text'>
        <Authenticator>
          {({ signOut, user }) => (
            <div>
              <img src={Smile} alt='' width={100} height={100} />
              <h1>Success!..</h1>
              <h3>Hello, {user.username}</h3>
              <h3>
                You are authenticated! Click{' '}
                <Link to='/'>HERE</Link> to go back to the simulation.
              </h3>
              <button onClick={signOut} className='button'>
                Sign Out
              </button>
              <h3>Manage My Files</h3>
              <table className='upload-module-ddb-table'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Created At</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {filesFromDdb.map((file) => (
                    <tr key={file.id}>
                      <td>{file.title}</td>
                      <td>{file.createdAt}</td>
                      <td>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Authenticator>
      </div>
    </div>
  );
};

export default Signin;
