import React, { useEffect, useState, useContext } from 'react'
import CompanyCard from '../ReviewsContainer/CompanyCard'
import CompanyRatings from '../Contexts/CompanyRatings'

const FavoritesContainer = () => {
  // Get Favorites
  useEffect(() => {
    async function getFavorites() {
      try{
        const favoritesRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/favorites/')
        const favoritesJson = await favoritesRes.json()
        setFavorites(favoritesJson.data)
      } catch(err) {
        console.log(err);
      }
    }
    getFavorites()
  }, [])

  const [favorites, setFavorites] = useState([])
  // Company ratings
  const ratings = useContext(CompanyRatings)

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
            />
          )
        })
        : null
      }
    </div>
  )
}

export default FavoritesContainer