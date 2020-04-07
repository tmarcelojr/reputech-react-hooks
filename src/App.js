import React, { useState, useMemo } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import useForm from './Utilities/useForm'
import { FaUserCircle } from 'react-icons/fa'
import reputech_logo from './Images/reputech_logo.png'
import logo from './Images/logo.png'
import './App.css'
import { UserContext } from './Contexts/UserContext'
import Home from './Home'
import ReviewsContainer from './ReviewsContainer'

export default function App() {

  // =============== AUTH ===============
  // Move above useForm(), to avoid errors
  const login = async (values) => {
    console.log('this is our values', values)
    console.log('this is our values type', typeof(values))
    try{
      const loginRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/login', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const loginJson = await loginRes.json()
      } catch(err) {
        console.log(err)
      }
  }

  const [values, handleChange, handleSubmit] = useForm(login)

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
                      // useForm is set as a blank object making this value will be undefined, set the default value as an empty string
                      value={values.username || ''}
                      // imported from useForm
                      onChange={handleChange}
                      required
                    >
                    </input>
                    <label>password:</label>
                    <input
                      type='password'
                      name='password'
                      placeholder='password'
                      value={values.password || ''}
                      onChange={handleChange}
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
        {/* { Encapsulate everything you want access to UserContext inside Provider } */}
        <UserContext.Provider value={values}>
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
