import React, { useContext } from 'react'
import StarRatings from 'react-star-ratings'
import CompanyUserReviewsContext from '../Contexts/CompanyUserReviewsContext'

const CompanyUserReviews = ({ companyId }) => {
  const reviews = useContext(CompanyUserReviewsContext)
  return(
    <div>
      {
        reviews.organizedReviews.map((companyReviews, i) => {
          return(
            <div key={i}>
            {
              companyReviews.map((review, j)=> {
                return(
                  <div key={j}>
                  {
                    review.company.id === companyId
                    ?
                    <div className='reviews-container'>
                      <div
                      className='card border-dark mb-3'
                      id='review-card'
                      style={{ maxWidth: '100% '}}
                      >
                        <div className='card-header'>
                          <StarRatings 
                            rating={review.stars}
                            starRatedColor='crimson'
                            numberOfStars={5}
                            starDimension='20px'
                            name='rating'
                          />
                          <h5 className='card-title'>{review.title}</h5>
                          <p>{review.content}</p>
                        </div> {/* card-header */}
                    </div> {/* card border-dark mb-3 */}
                  </div> // reviews-container
                  : null
                  }
                  </div> // key j
                )
              })
            }
            </div> // key i
          )
        })
      }
    </div>
  )
}

export default CompanyUserReviews