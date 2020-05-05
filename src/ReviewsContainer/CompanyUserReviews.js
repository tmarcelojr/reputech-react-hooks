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
                    <div className='reviews-container text-left'>
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
                          <span>
                            <h5 className='card-title'>{review.title}</h5>
                            <i>by: {review.creator.username}</i>
                          </span>
                
                          {
                            review.creator.username === userContext.user
                            ?
                            <div>
                              <button 
                                onClick={() => deleteReview(review.id)}
                              >
                                Delete
                              </button>
                              <button 
                                onClick={() => props.editReview({
                                  title: review.title,
                                  content: review.content,
                                  stars: review.stars,
                                  id: review.id
                                }
                                )}
                              >
                                Edit
                              </button>
                            </div>
                            : null
                          }
                        </div> {/* card-header */}
                        <div className='reviews-list'>
                          "{review.content}"
                        </div> {/* card-body */}
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