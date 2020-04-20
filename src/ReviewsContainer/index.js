import React, { useContext, useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import LoadingContext from '../Contexts/LoadingContext'
import CompanyContext from '../Contexts/CompanyContext'
import CompanyRatings from '../Contexts/CompanyRatings'
import CompanyUserRatings from '../Contexts/CompanyUserRatings'
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
  const [getAverages, setGetAverages] = useState(false)
  // Company user ratings
  const averageUserRatings = useContext(CompanyUserRatings)
  const [averageCompanyUserRatings, setAverageCompanyUserRatings] = useState([])
  
  // Conditional to only run once 
  if(loading.isLoading === false && getAverages === false) {
    const averages = []
    const userRatingsForCompany = []

    ratings.averageRatings.map((ratings, i) => {
      averages.push(Math.round(ratings[1]*2/2))
    })

    averageUserRatings.companyUserRatings.map((userRatings, i) => {
      userRatingsForCompany.push(Math.round(userRatings*2/2))
    })
    setAverageCompanyRatings(averages)
    setAverageCompanyUserRatings(userRatingsForCompany)
    setGetAverages(true)
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
              averageCompanyUserRatings={averageCompanyUserRatings[i]}
            />
          )
        })
        : null
      }
    </div>
  )
}