import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'

export default function Home() {
  const { value, setValue } = useContext(UserContext)
  return(
    <div className='py-5'>
      <h2>Home</h2>
      <div>{value}</div>
      <button onClick={() => setValue('hey')}>
        change value
      </button>
    </div>
  )
}