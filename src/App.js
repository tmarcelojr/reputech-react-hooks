import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import reputech_logo from './Images/reputech_logo.png'
import './App.css'
import { UserContext } from './Contexts/UserContext'
import Home from './Home'
import ReviewsContainer from './ReviewsContainer'

export default function App() {
  const [value, setValue] = useState('hello from context')
  return (
    <div className="App">
      <Router>
        <nav className='navbar navbar-expand-sm navbar-dark fixed-top'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <img id='logo' src={reputech_logo} alt='logo'/>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/reviews'>Reviews</Link>
            </li>
          </ul>
          <ul className='navbar-nav ml-auto'>
            <li 
              className='nav-item nav-link'
            >
              <span className='login'><FaUserCircle id='login_icon'/> Login</span>
            </li>
          </ul>
        </nav>

      <Switch>
        {/* Wrap UserContext.Provider to all the routes that will use the global context */}
        <UserContext.Provider value={{ value, setValue }}>
          <Route exact path='/reviews'>
            <ReviewsContainer />
          </Route>
          <Route exact path='/favorites'>

          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </UserContext.Provider>
      </Switch>
    </Router>
    </div>
  )
}
