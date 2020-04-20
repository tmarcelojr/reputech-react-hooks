import React, { useEffect, useState } from 'react'

const CompanyUserReviews = ({companyData}) => {

  const [userReviews, setUserReviews] = useState([])
  const [organizedReviews, setOrganizedReviews] = useState([])
  const [companyUserRatings, setCompanyUserRatings] = useState([])

  useEffect(() => {
    async function getCompanyReviews() {
      try{
        const reviewsRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/')
        const reviewsJson = await reviewsRes.json()
        setUserReviews(reviewsJson.data)
      } catch(err) {
        console.log(err);
      }
    }
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
  }, [userReviews, companyData])

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
      getUserRatings()
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

  return(
    <div>TESTING</div>
  )
}

export default CompanyUserReviews