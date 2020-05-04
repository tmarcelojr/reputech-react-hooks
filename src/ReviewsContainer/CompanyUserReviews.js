import React, { useContext } from 'react'
import StarRatings from 'react-star-ratings'
import CompanyUserReviewsContext from '../Contexts/CompanyUserReviewsContext'
import UserContext from '../Contexts/UserContext'

const CompanyUserReviews = (props) => {
  const reviews = useContext(CompanyUserReviewsContext)
  const userContext = useContext(UserContext)

  const deleteReview = async (id) => {
    try {
      const deleteReviewRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/' + id, {
        credentials: 'include',
        method: 'DELETE'
      })
      const deleteReviewJson = await deleteReviewRes.json();
      if(deleteReviewJson.status === 200) {
        const newUserReviewsArray = reviews.unorganizedUserReviews.userReviews.filter(review => review.id !== id)
        reviews.unorganizedUserReviews.setUserReviews(newUserReviewsArray) 
      }

      else {
        throw new Error('Could not delete review.')
      }
    } catch(err) {
      console.error(err)
    }
  }

  return(
    <div>
      {
        reviews.companyUserReviews.organizedReviews.map((companyReviews, i) => {
          return(
            <div key={i}>
            {
              companyReviews.map((review, j)=> {
                return(
                  <div key={j}>
                  {
                    review.company.id === props.companyId
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
                          {review.creator.username}
                          {
                            review.creator.username === userContext.user
                            ? <button 
                                onClick={() => deleteReview(review.id)}
                              >
                                Delete
                              </button>
                            : null
                          }
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