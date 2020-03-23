import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'

export default function ReviewsContainer() {
  const { value, setValue } = useContext(UserContext)
  return(
    <div className='py-5'>
      <h2>Reviews</h2>
      <div>{value}</div>
    </div>
  )
}