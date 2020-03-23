import React, { useState, useMemo } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import reputech_logo from './Images/reputech_logo.png'
import logo from './Images/logo.png'
import './App.css'
import { UserContext } from './Contexts/UserContext'
import Home from './Home'
import ReviewsContainer from './ReviewsContainer'

export default function App() {
  const [user, setUser] = useState(null)
  // useMemo 1st arg - create user, 2nd arg - only when user changes
  const value = useMemo(() => ({ user, setUser }), [ user, setUser ])
  const handleSubmit = e => {
    e.preventDefault()
    console.log(username, password)
  }
  const [username, setUsername ] = useState('')
  const [password, setPassword ] = useState('')
  const [email, setEmail ] = useState('')
  const [about, setAbout ] = useState('')
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
              data-toggle='modal' 
              data-target='#loginModal'
            >
              <span className='login'><FaUserCircle id='login_icon'/> Login</span>
            </li>
          </ul>
        </nav>

        {/* LOGIN MODAL */}
        <div 
          className='modal fade needs-validation' 
          id='loginModal' 
          tabIndex='-1' 
          role='dialog' 
          aria-labelledby='exampleModalLabel' 
          aria-hidden='true'
          maxLength='15' 
          minLength='4' 
          pattern='^[a-zA-Z0-9_.-]*$'
        >
          <div 
            id='login_container' 
            className='modal-dialog d-flex justify-content-center' 
            role='document'
            data-backdrop='true'
          >
            <div className='modal-content user_card'>
              <div className='d-flex justify-content-center'>
                <div className='brand_logo_container'>
                  {/* <img 
                    src={logo} 
                    className='brand_logo' 
                    alt='Logo' 
                  /> */}
                </div>
                <div className='d-flex justify-content-center form_container modal-body'>
                  <form onSubmit={handleSubmit}>
                    <label>username:</label>
                    <input
                      type='text'
                      name='username'
                      placeholder='username'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                    >
                    </input>
                    <label>password:</label>
                    <input
                      type='password'
                      name='password'
                      placeholder='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    >
                    </input>
                    <button
                      type='Submit'
                      name='button'
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      <Switch>
        {/* Wrap UserContext.Provider to all the routes that will use the global context */}
        <UserContext.Provider value={value}>
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
