import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Kinetik_img from '../Images/Kinetik_logo.png';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav id='nav-bar'>
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
    </nav>
  );
}

export default Navbar;
