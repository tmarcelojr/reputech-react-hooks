import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'

export default function ReviewsContainer() {
  const { user, setUser } = useContext(UserContext)
  return(
    <div className='py-5'>
      <h2>Reviews</h2>
      <div>{JSON.stringify(user, null, 2)}</div>
    </div>
  )
}