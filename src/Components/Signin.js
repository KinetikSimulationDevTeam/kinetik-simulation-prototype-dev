import React from 'react';
import Navigationbar from './NavigationBar'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'
import { Link } from 'react-router-dom';
import Smile from '../Images/Smile.png';

const Signin = () => {
  return (
    <div>
      <Navigationbar />
      <Authenticator>
        {({signOut}) => (
          <div id='authentication-text'>
            <img src={Smile} alt='' width={100} height={100} />
            <h1>Success!..</h1>
            <h2>You are authenticated! Click <Link to='/'>HERE</Link> to go back to the simulation.</h2>
            <button onClick={signOut} className='button'>Sign Out</button>
          </div>
        )}
      </Authenticator>
    </div>
  )
}

export default Signin;
