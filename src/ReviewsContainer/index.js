import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import LoadingContext from '../Contexts/LoadingContext'
import CompanyContext from '../Contexts/CompanyContext'
import CompanyCard from './CompanyCard'
import './custom.css'


export default function ReviewsContainer() {
  // User
  const user = useContext(UserContext)
  // Loading
  const loading = useContext(LoadingContext)
  // Company data
  const company = useContext(CompanyContext)

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
            />
          )
        })
        : null
      }
    </div>
  )
}