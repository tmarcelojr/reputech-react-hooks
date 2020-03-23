import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { login } from '../login'

export default function Home() {
  const { user, setUser } = useContext(UserContext)
  return(
    <div className='py-5'>
      <h2>Home</h2>
      <div>{JSON.stringify(user, null, 2)}</div>
      {
        user
        ? 
        <button
          onClick={() => {
            setUser(null)
          }}
        >
          logout
        </button>
        :
        <button 
          onClick={async () => {
          const user = await login()
          setUser(user)
        }}
      >
        login
      </button>
      }
    </div>
  )
}