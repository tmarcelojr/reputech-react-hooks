import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../Contexts/UserContext'

export default function ReviewsContainer() {
  // User
  const user = useContext(UserContext)
  // API
  const [collectedReviews, setCollectedReviews] = useState(null)
  const [companies, setCompanies] = useState(null)
  const [averageRatings, setAverageRatings] = useState(null)

  // Adding empty [] as second argument to run once component mounts
  useEffect(() => {
    getRatings()
  }, [])

  const getRatings = async () => {
		try{
			const ratingRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/collected_reviews/')
			const ratingJson = await ratingRes.json()
      setAverageRatings(ratingJson.data)
      console.log('This is our average ratings')
      console.log(ratingJson.data)
		} catch(err) {
			console.log(err);
		}
	}

  return(
    <div className='py-5'>
      <h2>Reviews</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}