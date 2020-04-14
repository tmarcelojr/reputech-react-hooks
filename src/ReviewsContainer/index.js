import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../Contexts/UserContext'
import StarRatings from 'react-star-ratings'

export default function ReviewsContainer() {
  // User
  const user = useContext(UserContext)
  // API
  const [averageRatings, setAverageRatings] = useState([])
  const [companyData, setCompanyData] = useState([])
  const [userReviews, setUserReviews] = useState([])
  const [organizedReviews, setOrganizedReviews] = useState([])
  const [companyUserRatings, setCompanyUserRatings] = useState([])

  // Adding empty [] as second argument to run once component mounts
  useEffect(() => {
    async function getRatings() {
      try{
        const ratingRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/collected_reviews/')
        const ratingJson = await ratingRes.json()
        setAverageRatings(ratingJson.data)
      } catch(err) {
        console.log(err);
      }
    }

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

    getRatings()
    getCompanyData()
    getCompanyReviews()

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
            // console.log('inside organizeReviews', companyReviews)
            companyReviews.push(reviewsForThisCo)
          }
          setOrganizedReviews(companyReviews)
      }
      organizeReviews()
    } // if(companyData)
  }, [userReviews])

  useEffect(() => {
    async function findUserAverageRatings() {
      let companyRatings = []
      let averages = []
      for(let i = 0; i < organizedReviews.length; i++) {
        let ratingsForCo = []
        for(let j = 0; j < organizedReviews[i].length; j++) {
          ratingsForCo.push(organizedReviews[i][j].stars)
        }
      companyRatings.push(ratingsForCo)
      }
      for(let k = 0; k < companyRatings.length; k++) {
        // Grabbing each array of ratings and using reduce() to sum the totals from left to right. If there are no user ratings we set it to 0 with 'or' condition
        const sum = companyRatings[k].reduce((a, b) => a + b, 0);
        const avg = (sum / companyRatings[k].length) || 0;
        console.log('this is our averages in findUserAverageRatings', avg)
        averages.push(avg)
      }
      setCompanyUserRatings(averages)
    }
    findUserAverageRatings()
  }, [organizedReviews])

  return(
    <div>
      {companyData.map((company, i) => {
        return(
        <div key={i} className='card mb-5'>
          <div className='row no-gutters'>
            <div id='img-container' className='col-md-2'>
              <img src={company.website_logo} style={{ height: '100px', width: '100px'}} className='card-img' alt='company logo' />
            </div> { /* col-md-2 */ }
            <div className='col-md-8'>
              <div className='card-body'>
                <button className='card-title'>
				        	<strong>{company.name}</strong>
				        </button> {/* card-title */}
                <div id='star_container'>
				        	<div className='star-line'>
				        		<div>
							        <h6 className='company_rating'>{Math.round((averageRatings[i][1]) * 2)/2}</h6>
						        </div>
						        <div>
							        {/* <StarRatings 
							        	rating={Math.round((averageRatings[i][1]) * 2)/2} 
							        	starRatedColor='orange'
							        	numberOfStars={5}
							        	starDimension='20px'
							        	name='rating'
							        /> */}
						        </div>
					        </div> {/* star-line */}
					        <small><i>Reputech rating:</i></small>
					        <div className='star-line'>
					        	<div>
							        <h6 className='company_rating'>{Math.round(companyUserRatings[i] * 2)/2}</h6>
						        </div>
						        <div>
							        {/* <StarRatings 
							        	rating={Math.round(companyUserRatings[i] * 2)/2}
							        	starRatedColor='crimson'
							        	numberOfStars={5}
							        	starDimension='20px'
							        	name='rating'
							        /> */}
						        </div>
					        </div> {/* star-line */}
				        </div> {/* star-container */}
              </div> {/* card-body */}
            </div> {/* col-md-8 */}
          </div> {/* row no-gutters */}
        </div> // card mb-5
        )
      })}
    </div>
    // <div className='py-5'>
      
    //   <p>helo</p>
    //   <p>helo</p>
    //   <p>helo</p>
    //   <p>helo</p>
    //   <p>helo</p>
    //   <p>helo</p>
    //   <p>helo</p>
    //   <p>helo</p>
    //   {averageRatings}
    //   <p>hello</p>
    //   <p>hello</p>
    //   <p>hello</p>
    //   <p>hello</p>
    //   <p>hello</p>
    //   <p>below is the array of ratings for the companies in order</p>
    //   {companyUserRatings}
    //   <p>hello</p>
    //   <p>hello</p>
    //   <p>hello</p>
    //   {companyData.map((company, i) => {
    //     return(
    //       <strong>{company.name}</strong>
    //     )
    //   })}
    // </div>
  )
}