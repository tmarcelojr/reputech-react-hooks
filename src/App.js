import React, { useState, useMemo, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
// CSS
import useForm from './Utilities/useForm'
import { FaUserCircle } from 'react-icons/fa'
import reputech_logo from './Images/reputech_logo.png'
import logo from './Images/logo.png'
import './App.css'
import $ from 'jquery'
// Components
import Home from './Home'
import ReviewsContainer from './ReviewsContainer'
// Contexts
import { UserContext } from './Contexts/UserContext'
import LoadingContext from './Contexts/LoadingContext'
import CompanyContext from './Contexts/CompanyContext'
import CompanyRatings from './Contexts/CompanyRatings'
import CompanyUserReviewsContext from './Contexts/CompanyUserReviewsContext'

export default function App() {
  // Logged in user
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({ user, setUser }), [user, setUser])
  // Login & register
  const [authMessage, setAuthMessage] = useState(null)
  const [switchForm, setSwitchForm] = useState('login')
  // Loading
  const [isLoading, setIsLoading] = useState(true)
  const loading = useMemo(() => ({ isLoading, setIsLoading }), [isLoading, setIsLoading])
  // Company Data
  const [companyData, setCompanyData] = useState([])
  const companyValues = useMemo(() => ({ companyData, setCompanyData }), [companyData, setCompanyData])
  // User Reviews
  const [userReviews, setUserReviews] = useState([])
  const [organizedReviews, setOrganizedReviews] = useState([])
  const companyUserReviews = useMemo(() => ({ organizedReviews, setOrganizedReviews }), [organizedReviews, setOrganizedReviews])
  // User Ratings
  const [companyUserRatings, setCompanyUserRatings] = useState([])
  const companyAverageUserRatings = useMemo(() => ({ companyUserRatings, setCompanyUserRatings }), [companyUserRatings, setCompanyUserRatings])
  // Company Ratings
  const [averageRatings, setAverageRatings] = useState([])
  const companyAverageRatings = useMemo(() => ({ averageRatings, setAverageRatings }), [averageRatings, setAverageRatings])

  // =============== FETCH CALLS ===============

  useEffect(() => {
    async function getCompanyData() {
      try{
        const companyDataRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/companies/')
        const companyDataJson = await companyDataRes.json()
        setCompanyData(companyDataJson.data)
      } catch(err) {
        console.log(err);
      }
    }

    async function getCompanyReviews() {
      try{
        const reviewsRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/')
        const reviewsJson = await reviewsRes.json()
        setUserReviews(reviewsJson.data)
      } catch(err) {
        console.log(err);
      }
    }
    
    async function getRatings() {
      try{
        const ratingRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/collected_reviews/')
        const ratingJson = await ratingRes.json()
        let companyRatings = []
        ratingJson.data.map(ratings => {
          return companyRatings.push(Math.round(ratings[1] * 2/2))
        })
        setAverageRatings(companyRatings)
        setIsLoading(false)
      } catch(err) {
        console.log(err);
      }
    }

    getCompanyData()
    getCompanyReviews()
    getRatings()
    checkLoginStatus()
  }, [])

  useEffect(() => {
    if(userReviews){
      async function organizeReviews() {
        let companyReviews = []
          for(let i = 0; i < companyData.length; i++) {
            let reviewsForThisCo = []
            // loop through userReviews array
            for(let j=0; j < userReviews.length; j++) {
              // if the user review id matches the company id
              if(userReviews[j].company.id === companyData[i].id) {
                reviewsForThisCo.push(userReviews[j])
              }
            }
            companyReviews.push(reviewsForThisCo)
          }
          setOrganizedReviews(companyReviews)
        }
        organizeReviews()
      } // if(companyData)
  }, [userReviews, companyData])

  useEffect(() => {
    async function findUserAverageRatings() {
      // Grab ratings from organizedReviews
      let userRatings = []
      let companyUserAverages = []
      // Find averages of organized ratings
      let averageUserRatings = []

      for(let i = 0; i < organizedReviews.length; i++) {
        let ratingsForCo = []
        for(let j = 0; j < organizedReviews[i].length; j++) {
          ratingsForCo.push(organizedReviews[i][j].stars)
        }
      userRatings.push(ratingsForCo)
      }

      for(let k = 0; k < userRatings.length; k++) {
        // Grabbing each array of ratings and using reduce() to sum the totals from left to right. If there are no user ratings we set it to 0 with 'or' condition
        const sum = userRatings[k].reduce((a, b) => a + b, 0);
        const avg = (sum / userRatings[k].length) || 0;
        companyUserAverages.push(avg)
      }
      companyUserAverages.map(userRatings => {
        averageUserRatings.push(Math.round(userRatings * 2/2))
      })
      setCompanyUserRatings(averageUserRatings)
    }
    findUserAverageRatings()
  }, [organizedReviews])

  // =============== AUTH ===============
  // Move above useForm(), to avoid errors
  const login = async (values) => {
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
      if(loginJson.status === 200) {
        setAuthMessage(null)
        // useRef is not used due to conflict with bootstrap 4 modal (unable to toggle)
        window.$('#loginModal').modal('hide')
        setUser(loginJson.username)
      }
      else{
        setAuthMessage(loginJson.message)
      }
      } catch(err) {
        console.log(err)
      }
  }

  const register = async (values) => {
    try {
      const registerRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/register', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const registerJson = await registerRes.json()
      window.$('#loginModal').modal('hide')
      setUser(registerJson.username)
    } catch(err) {
      console.log(err);
    }
  }

  const checkLoginStatus = async () => {
    try{
      const checkLoginRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/logged_in', {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
      })
      const checkLoginJson = await checkLoginRes.json()
      if(checkLoginRes.status === 200 ) {
       // Set user here to check logged in user with server
       setUser(checkLoginJson.data.username)
      }
    } catch(err) {
      console.log(err);
    }
  }

  const logout = async () => {
    try {
      const logoutRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/logout', {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
      })
      const logoutJson = await logoutRes.json()
      console.log(logoutJson);
      if(logoutRes.status === 200) {
        setUser(null)
      }
    } catch(err) {
      console.log(err);
    }
  }

  const [values, handleChange, handleSubmit] = useForm(switchForm === 'login' ? login : register)

  return (
    <div className="App">
      <Router>
        <nav className='navbar navbar-expand-sm navbar-dark fixed-top'>
          <ul className='navbar-nav mr-auto px-3'>
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
          <ul className='navbar-nav ml-auto px-3'>
            {
              user === null
              ?
              <li 
                className='nav-item nav-link'
                data-toggle='modal' 
                data-target='#loginModal'
              >
                <span className='login'><FaUserCircle className='mx-2' id='login_icon'/>
                  Login
                </span>
              </li>
              :
              <li id='user-menu' className='nav-item'>
                <div className='dropdown'>
                  <button
                  type='button'
                  className='dropdown-toggle fake-button'  
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                  id='dropdownMenuButton'
                  ></button>
                  <div 
                    className='dropdown-menu dropdown-menu-center'
                    aria-labelledby='dropdownMenuButton'
                  >
                  <button className='dropdown-item'>Edit Profile</button>
                  <button 
                    className='dropdown-item'
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                  </div>
                </div>
                <i className='username' >{user}</i>
              </li>
            }
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
                  <img 
                    src={logo} 
                    className='brand_logo' 
                    alt='Logo' 
                  />
                </div>
                <div className='d-flex justify-content-center form_container modal-body'>
                  <form onSubmit={handleSubmit}>
                    <div className='input-group mb-2'>
                      <div className='input-group-append'>
                        <span className='input-group-text'><i className='fas fa-user'></i></span>
                      </div>
                      <input
                        type='text'
                        name='username'
                        className='form-control input_pass'
                        placeholder='username'
                        // useForm is set as a blank object making this value will be undefined, set the default value as an empty string
                        value={values.username || ''}
                        // imported from useForm
                        onChange={handleChange}
                        required
                      >
                      </input>
                    </div>
                    {authMessage}
                    <div className='input-group mb-2'>
                      <div className='input-group-append'>
                        <span className='input-group-text'><i className='fas fa-key'></i></span>
                      </div>
                      <input
                        type='password'
                        name='password'
                        className='form-control input_pass'
                        placeholder='password'
                        value={values.password || ''}
                        onChange={handleChange}
                        required
                      >
                      </input>
                    </div>

                    {/* Displays register input fields in modal */}
                    {
                      switchForm === 'register'
                      ?
                      <div className='input-group mb-2'>
                        <div className='input-group-append'>
                          <span className='input-group-text'><i className='fas fa-key'></i></span>
                        </div>
                        <input 
                          type='text' 
                          name='email' 
                          className='form-control input_pass'
                          onChange={handleChange}
                          value={values.email || ''} 
                          placeholder='email'
                          data-verify='email'
                          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                          required
                        />
                      </div>
                      : null
                    }

                    <div className='d-flex justify-content-center mt-1 login_container'>
                    <button 
                      type='Submit' 
                      name='button' 
                      className='btn login_btn'
                    >
                     {
                       switchForm === 'login' ? 'Login' : 'Register'
                     }
                    </button>
                  </div>
                  
                  {
                    switchForm === 'login'
                    ?
                    <div className='mt-2'>
                      <div className='d-flex justify-content-center links'>
                        <small>
                          Don't have an account? 
                          <span className='fake_link' onClick={() => setSwitchForm('register')}> Sign Up
                          </span>
                        </small>
                      </div>
                      <div id='login_form' className='d-flex justify-content-center links'>
                        <small>
                          <span className='fake_link'>Forgot your password?</span>
                        </small>
                      </div>
                    </div>
                    :
                    <div className='mt-1'>
                      <div id='login_form' className='d-flex justify-content-center links'>
                        <small>Already have an account? <span className='fake_link' onClick={() => setSwitchForm('login')}> Login</span></small>
                      </div>
                    </div>
                  } 

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      <Switch>
        {/* Encapsulate everything you want to have access to Providers' values */}
        <UserContext.Provider value={value}>
          <LoadingContext.Provider value={loading}>
            {/* { Components that need company information, ratings, and reviews } */}
            <CompanyContext.Provider value={companyValues}>
              <CompanyRatings.Provider value={{companyAverageRatings, companyAverageUserRatings}}>
                <CompanyUserReviewsContext.Provider value={companyUserReviews}>
                  <Route exact path='/reviews'>
                    <ReviewsContainer />
                  </Route>
                </CompanyUserReviewsContext.Provider>
                <Route exact path='/favorites'>
                  {/* {Currently do not have a favorites section} */}
                </Route>   
              </CompanyRatings.Provider>
            </CompanyContext.Provider>
            {/* { /Components needing company information, ratings, and reviews } */}
          </LoadingContext.Provider>
          <Route exact path='/'>
            <Home />
          </Route>
        </UserContext.Provider>
      </Switch>
    </Router>
    </div>
  )
}
