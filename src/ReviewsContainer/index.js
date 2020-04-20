import React, { useContext, useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import LoadingContext from '../Contexts/LoadingContext'
import CompanyContext from '../Contexts/CompanyContext'
import CompanyRatings from '../Contexts/CompanyRatings'
import CompanyCard from './CompanyCard'
import './custom.css'


export default function ReviewsContainer() {
  // User
  const user = useContext(UserContext)
  // Loading
  const loading = useContext(LoadingContext)
  // Company data
  const company = useContext(CompanyContext)
  // Company ratings
  const ratings = useContext(CompanyRatings)
  const [averageCompanyRatings, setAverageCompanyRatings] = useState([])
  const [getAverage, setGetAverage] = useState(false)
  // Company user ratings
  
  
  // Conditional to only run once 
  if(loading.isLoading === false && getAverage === false) {
    const averages = []
    ratings.averageRatings.map((ratings, i) => {
      averages.push(Math.round(ratings[1]*2/2))
    })
    setAverageCompanyRatings(averages)
    setGetAverage(true)
  }

  return(
    <div className='my-5 py-5'>
      {
        loading.isLoading === false
        ?
        company.companyData.map((companyInfo, i) => {
          return(
            <CompanyCard
              key={i}
              websiteLogo={companyInfo.website_logo}
              companyId={companyInfo.id}
              companyWebsite={companyInfo.website}
              companyName={companyInfo.name}
              averageCompanyRatings={averageCompanyRatings[i]}
            />
          )
        })
        : null
      }
    </div>
  )
}