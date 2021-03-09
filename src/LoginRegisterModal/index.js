import React, { useState } from 'react'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
import useForm from '../Utilities/useForm'
import logo from '../Images/logo.png'


const LoginRegisterModal = (props) => {
  // Login & register
  const [authMessage, setAuthMessage] = useState(null)
  const [switchForm, setSwitchForm] = useState('login')

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
      console.log(loginJson)
      if(loginJson.status === 200) {
        props.updateUser(loginJson)
        props.closeModal()
        setAuthMessage(null)
        const cookie_key = 'username'
        bake_cookie(cookie_key, loginJson.data.username)
        console.log('we are reading cookie', read_cookie(cookie_key))
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
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const registerJson = await registerRes.json()
      if(registerJson.status === 201) {
        props.updateUser()
        props.closeModal()
        setAuthMessage(null)
      }
      else{
        setAuthMessage(registerJson.message)
      }
    } catch(err) {
      console.log(err);
    }
  }

  const [values, handleChange, handleSubmit] = useForm(switchForm === 'login' ? login : register)

  return(
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

  )
}

export default LoginRegisterModal