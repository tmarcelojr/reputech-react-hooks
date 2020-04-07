import { useState } from 'react'

const useForm = submitCallback => {
  // will return state using useState, initial value will be a blank object so it will dynamically grow
  const [state, setState] = useState({})

  const handleSubmit = e => {
    e.preventDefault()
    submitCallback(state)
  }

  const handleChange = e => {
    // When referencing an event asynchronously we typically bind context with it, e.persist will persist synthetic events
    e.persist()
    // setting state and adding new pairs using spread operator
    setState(state => ({ ...state, [e.target.name]: e.target.value }))
  }
  
  return [state, handleChange, handleSubmit]
}

export default useForm