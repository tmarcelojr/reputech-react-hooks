import React, { useContext } from 'react'
import CompanyCard from '../ReviewsContainer/CompanyCard'
import CompanyRatings from '../Contexts/CompanyRatings'
import CompanyUserReviewsContext from '../Contexts/CompanyUserReviewsContext'
import LoadingContext from '../Contexts/LoadingContext'
import UserContext from '../Contexts/UserContext'

const FavoritesContainer = ({companyToRemove}) => {
  // Company ratings
  const ratings = useContext(CompanyRatings)
  // User Favorites
  const favorites = useContext(CompanyUserReviewsContext)
  // Loading
  const loading = useContext(LoadingContext)
  const user = useContext(UserContext)

  return(
    <div className='my-5 py-5'>
      {
        loading.isLoading === false 
        ?
        favorites.userFavorites.favorites.map((companyInfo, i) => {
          return(
            <div key={i}>
            {
              companyInfo.user.username === user.user
              ?
              <CompanyCard
                websiteLogo={companyInfo.company.website_logo}
                companyId={companyInfo.company.id}
                companyWebsite={companyInfo.company.website}
                companyName={companyInfo.company.name}
                averageCompanyRatings={ratings.companyAverageRatings.averageRatings[i]}
                averageCompanyUserRatings={ratings.companyAverageUserRatings.companyUserRatings[i]}
                removeFromFavorites={() => companyToRemove(companyInfo.id)}
              />
              : null
            }
            </div>
          )
        })
        : null
      }
    </div>
  )
}

export default FavoritesContainer