import React, { useContext } from 'react'
import StarRatings from 'react-star-ratings'
import AddUserReview from './AddUserReview'

const CompanyUserReviews = ({ reviews, companyId }) => {
  return(
    <div className='review-container'>
      {
        reviews.map((review, i) => {
          return(
            <div key={i} >
              <div
                className='card border-dark mb-3' 
                style={{maxWidth: '100%'}}
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
                </div> {/* card-header */}
              </div> {/* card border-dark mb-3 */}
            </div>
          )
        })
      }
      {
        reviews.length === 0
        ? 
        <AddUserReview 
          companyId={companyId}
        />
        : null
      }
    </div>
  )
}

export default CompanyUserReviews