import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { FaUserCircle, FaDivide } from 'react-icons/fa'
import reputech_logo from '../Images/reputech_logo.png'
import './index.css'

export default function NavBar() {
  return(
    <Router>
      <nav className='navbar navbar-expand-sm navbar-dark fixed-top'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
              <img id='logo' src={reputech_logo} alt='logo' />
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/reviews'>Reviews</Link>
          </li>
        </ul>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item nav-link'>
            <span className='login'><FaUserCircle id='login_icon'/> Login</span>
          </li>
        </ul>
      </nav>
    </Router>
  )
}