import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Kinetik_img from '../Images/Kinetik_logo.png';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'

/*
    Description: This component is used to display the navigation bar.

    Arguments: None

    Return Type: None
*/
const Navbar = () => {
  const location = useLocation();

  return (
    <nav id='nav-bar'>
      <div id='nav-bar-left'>
        <a href="https://www.kinetiksimulation.com" target='_blank'>
          <img src={Kinetik_img} alt='' width={30} height={30} />
        </a>
        <li>
          <Link className={`link ${location.pathname === '/' ? 'current' : ''}`} style={location.pathname === '/' ? {color: 'black'} : {}} to="/">Home{(location.pathname === '/') && <span>(current)</span>}</Link>
        </li>
        <li>
          <Link className={`link ${location.pathname === '/help' ? 'current' : ''}`} style={location.pathname === '/help' ? {color: 'black'} : {}} to="/help">Help{(location.pathname === '/help') && <span>(current)</span>}</Link>
        </li>
        <li>
          <a className={`link ${location.pathname === '/about' ? 'current' : ''}`} style={location.pathname === '/about' ? {color: 'black'} : {}} href="https://www.kinetiksimulation.com" target='_blank'>About{(location.pathname === '/about') && <span>(current)</span>}</a>
        </li>
      </div>
      <li>
        <Link className={`link ${location.pathname === '/signin' ? 'current' : ''}`} style={location.pathname === '/signin' ? {color: 'black'} : {}} to="/signin">My Account{(location.pathname === '/signin') && <span>(current)</span>}</Link>
      </li>
    </nav>
  );
};

export default Navbar;
