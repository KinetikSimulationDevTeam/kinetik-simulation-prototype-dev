import React from 'react';
import Kinetik_img from '../Images/Kinetik_logo.png';
import alertify from 'alertifyjs';

const Navbar = () => {
    const helpFunction = () => {
        alertify.alert('User Manual', 'For User Manual, Please visit: https://tarheels.live/comp523s23teaml/d4-documentation/');
    }

    return (
        <nav id='nav-bar'>
            <a href="https://www.kinetiksimulation.com" target='_blank'><img src={Kinetik_img} alt='' width={30} height={30} /></a>
            <li>
                <a id='home-link' className='link' href=""> Home<span>(current)</span></a>
            </li>
            <li>
                <a className='link' href="#" onClick={helpFunction}> Help </a>
            </li>
            <li>
                <a className='link' href="https://www.kinetiksimulation.com" target='_blank'> About </a>
            </li>
        </nav>
    );
}

export default Navbar
