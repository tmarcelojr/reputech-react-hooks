import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../Contexts/UserContext'
import CompanyCard from './CompanyCard'


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
        averages.push(avg)
      }
      setCompanyUserRatings(averages)
    }
    findUserAverageRatings()
  }, [organizedReviews])

  const getUserRatings = (i) => {
    if(companyUserRatings[i] === undefined) {
      return companyUserRatings[i] = 0
    }
    else{
      return Math.round(companyUserRatings[i] * 2)/2
    }
  }

  const getCompanyUserRatings = (i) => {
    if(averageRatings[i] === undefined) {
      return averageRatings[i] = 0
    }
    else{
      return Math.round(averageRatings[i][1]* 2)/2
    }
  } 

  return(
    <div className='my-5 py-5'>
      {companyData.map((company, i) => {
        return(
          <CompanyCard
            companyId={company.id}
            companyName={company.name}
            websiteLogo={company.website_logo}
            companyWebsite={company.website}
            averageCompanyRatings={getCompanyUserRatings(i)}
            averageCompanyUserRatings={getUserRatings(i)}
            key={i}
          />
        )
      })}
    </div>
  )
}