import React from 'react'
import { Link } from 'react-router-dom'
import Kinetik_img from '../Images/Kinetik_logo.png'

const Navbar = () => {
    return (
        <div>
            <nav>
                <a href='#'> <img src={Kinetik_img} alt='' /> </a>
                <div>
                    <ul>
                        <li>
                            <a href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
