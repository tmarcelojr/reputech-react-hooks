import React, { useContext } from 'react'
import LoadingContext from '../Contexts/LoadingContext'
import CompanyContext from '../Contexts/CompanyContext'
import CompanyRatings from '../Contexts/CompanyRatings'
import UpdateReviews from '../Contexts/UpdateReviews'
import CompanyCard from './CompanyCard'
import './custom.css'


export default function ReviewsContainer() {
  // Loading
  const loading = useContext(LoadingContext)
  // Company data
  const company = useContext(CompanyContext)
  // Company ratings
  const ratings = useContext(CompanyRatings)
  
  const updateReviews = useContext(UpdateReviews)


  return(
    <div className='my-5 company-card-container'>
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
              averageCompanyRatings={ratings.companyAverageRatings.averageRatings[i]}
              averageCompanyUserRatings={ratings.companyAverageUserRatings.companyUserRatings[i]}
            />
          )
        })
        : null
      }
    </div>
  )
}