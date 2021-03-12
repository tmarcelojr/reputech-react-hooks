import React, { useContext } from 'react'
import StarRatings from 'react-star-ratings'
import CompanyUserReviewsContext from '../Contexts/CompanyUserReviewsContext'
import UserContext from '../Contexts/UserContext'
import { BsPencil } from 'react-icons/bs'
import { FcFullTrash } from 'react-icons/fc'

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
              companyReviews.reverse().map((review, j)=> {
                let dateString = review.created_on
                dateString = new Date(dateString).toUTCString();
                dateString = dateString.split(' ').slice(1, 4).reverse().join('-');
                return(
                  <div key={j}>
                  {
                    review.company.id === props.companyId
                    ?
                    <div className='reviews-container text-left'>
                      <div
                      className='card border-dark mb-3'
                      id='review-card'
                      >
                        <div className='card-header'>
                          <div className='user-review-buttons'>
                            <div className='mr-auto'>
                              <StarRatings 
                                rating={review.stars}
                                starRatedColor='crimson'
                                numberOfStars={5}
                                starDimension='2vw'
                                name='rating'
                              />
                            </div>

                          {/* Buttons for Edit and Delete */}
                          <div className='ml-auto'>
                            {
                              review.creator.username === userContext.user
                              ?
                              <div>
                                <button 
                                  onClick={() => props.editReview({
                                    title: review.title,
                                    content: review.content,
                                    stars: review.stars,
                                    id: review.id
                                  }
                                  )}
                                  className='review-button'
                                >
                                  <BsPencil />
                                </button>
                                <button 
                                  onClick={() => deleteReview(review.id)}
                                  className='review-button'
                                >
                                  <FcFullTrash />
                                </button>
                              </div>
                              : null
                            }
                          </div>

                          </div>
                          <span>
                            <h5 className='card-title'>{review.title}</h5>
                            <i>{dateString}</i>
                            <p><i>by: {review.creator.username}</i></p>      
                          </span>
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