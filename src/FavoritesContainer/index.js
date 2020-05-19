import React, { useContext } from 'react'
import CompanyCard from '../ReviewsContainer/CompanyCard'
import CompanyRatings from '../Contexts/CompanyRatings'
import UserFavorites from '../Contexts/UserFavorites'

const FavoritesContainer = ({companyToRemove}) => {
  // Company ratings
  const ratings = useContext(CompanyRatings)
  // User Favorites
  const favorites = useContext(UserFavorites)

  return(
    <div className='my-5 py-5'>
      {
        favorites.length !== null
        ?
        favorites.map((companyInfo, i) => {
          return(
            <CompanyCard
              key={i}
              websiteLogo={companyInfo.company.website_logo}
              companyId={companyInfo.company.id}
              companyWebsite={companyInfo.company.website}
              companyName={companyInfo.company.name}
              averageCompanyRatings={ratings.companyAverageRatings.averageRatings[i]}
              averageCompanyUserRatings={ratings.companyAverageUserRatings.companyUserRatings[i]}
              removeFromFavorites={() => companyToRemove(companyInfo.id)}
            />
          )
        })
        : null
      }
    </div>
  )
}

export default FavoritesContainer