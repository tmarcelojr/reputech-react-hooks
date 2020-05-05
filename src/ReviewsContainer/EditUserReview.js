import React, { useContext } from 'react'
import useForm from '../Utilities/useForm'
import CompanyUserReviewsContext from '../Contexts/CompanyUserReviewsContext'

const EditUserReview = (props) => {
  const reviews = useContext(CompanyUserReviewsContext)

  // Update Review
  const updateReview = async (newInfo) => {
    let newValues = {title: newInfo.title, content: newInfo.content, stars: parseInt(newInfo.stars)}
    try {
      const updateReviewRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/' + props.companyValues.id, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(newValues),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const updateReviewJson = await updateReviewRes.json()
      if(updateReviewJson.status === 200) {
        console.log('Successfully updated review', updateReviewJson.data)
        async function getCompanyReviews() {
          try{
            const reviewsRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/')
            const reviewsJson = await reviewsRes.json()
            reviews.unorganizedUserReviews.setUserReviews(reviewsJson.data)
          } catch(err) {
            console.log(err);
          }
        }
        getCompanyReviews()
      }
      props.cancelReview()
    } catch(err) {
      console.log(err);
    }
  }

  const [values, handleChange, handleSubmit] = useForm(updateReview)
  
  return(
    <div>
    {
      <div className='well px-3'>
        <form className='review-form' data-toggle='validator' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Title:</label>
            <input 
              type='text' 
              className='form-control' 
              name='title'
              placeholder={props.companyValues.title}
              value={values.title || ''}
              onChange={handleChange}
              required
            /> {/* form-control */}
          </div> {/* form-group - title */}
          <div className='form-group'>
            <label htmlFor='content'>Review:</label>
            <input 
              className='form-control'
              type='text'
              name='content'
              placeholder={props.companyValues.content}
              rows='3'
              value={values.content || ''}
              onChange={handleChange}
              required
            />
          </div> {/* form-group - review*/}

          {/* Submit Area */}
          <div id='submit-area'>
            <div 
                className='btn btn-secondary cancel-button' 
                onClick={() => props.cancelReview()}
              >
                Cancel
            </div>
            <div className='submit-button'>
              <button className='btn btn-danger'>
                Update Review
              </button>
            </div> {/* submit-button */}

            <div className='form-group'>
              <span className="star-rating star-5">
                <input type="radio" name='stars' value={1} onChange={handleChange} required/><i></i>
                <input type="radio" name='stars' value={2} onChange={handleChange} required/><i></i>
                <input type="radio" name='stars' value={3} onChange={handleChange} required/><i></i>
                <input type="radio" name='stars' value={4} onChange={handleChange} required/><i></i>
                <input type="radio" name='stars' value={5} onChange={handleChange} required/><i></i>
              </span>
            </div> {/* form-group - rating */}
          </div> {/* submit-area */}
        </form> {/* review_form */}
      </div> // well
    }
    </div>
  )
}

export default EditUserReview