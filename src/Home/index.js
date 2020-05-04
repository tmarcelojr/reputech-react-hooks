import React, { useContext } from 'react'
import UserContext from '../Contexts/UserContext'

export default function Home() {
  const user = useContext(UserContext)
  return(
    <div className='py-5'>
      <h2>Home</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}