import React, { useContext } from 'react'
import LoadingContext from '../Contexts/LoadingContext'
import CompanyContext from '../Contexts/CompanyContext'
import CompanyRatings from '../Contexts/CompanyRatings'
import CompanyCard from './CompanyCard'
import './custom.css'


export default function ReviewsContainer(props) {
  // Loading
  const loading = useContext(LoadingContext)
  // Company data
  const company = useContext(CompanyContext)
  // Company ratings
  const ratings = useContext(CompanyRatings)
  return(
    <div className='company-card-wrapper'>
      <div>hello</div>
    <div className='company-card-container'>
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
              addToFavorites={() => props.companyToAdd(companyInfo.id)}
              removeFromFavorites={() => props.companyToRemove(companyInfo.id)}
            />
          )
        })
        : null
      }
    </div>
    </div>
  )
}