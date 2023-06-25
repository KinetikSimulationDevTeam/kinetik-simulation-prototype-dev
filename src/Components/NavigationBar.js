import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Kinetik_img from '../Images/Kinetik_logo.png';

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
      <Link style={{ textDecoration: 'none' }} to="https://kinetiksolutions.auth.us-east-1.amazoncognito.com/login?client_id=57svgk24ilksqnbcd500lcvfto&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fkinetik.solutions">
        <button className='button'>Signin</button>
      </Link>
    </nav>
  );
}

export default Navbar;
