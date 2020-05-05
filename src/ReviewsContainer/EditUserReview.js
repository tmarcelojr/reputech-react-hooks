import React, { useContext} from 'react'
import useForm from '../Utilities/useForm'
import CompanyUserReviewsContext from '../Contexts/CompanyUserReviewsContext'

const EditUserReview = (props) => {
  const reviews = useContext(CompanyUserReviewsContext)
  console.log(reviews)

  // Update Review
  const updateReview = async (newInfo) => {
    try {
      const updateReviewRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/' + props.companyValues.id, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(newInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const updateReviewJson = await updateReviewRes.json()
      if(updateReviewJson.status === 200) {
        console.log('Successfully updated review', updateReviewJson.data)
        reviews.unorganizedUserReviews.setUserReviews(userReviews => [...userReviews, updateReviewJson.data])
      }
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
              id='title' 
              name='title'
              placeholder='Title Review'
              value={values.title || props.companyValues.title}
              onChange={handleChange}
              required
            /> {/* form-control */}
          </div> {/* form-group - title */}
          <div className='form-group'>
            <label htmlFor='content'>Review:</label>
            <input 
              className='form-control'
              type='text'
              id='content' 
              name='content'
              placeholder='Add your review here...'
              rows='3'
              value={values.content || props.companyValues.content}
              onChange={handleChange}
              required
            />
          </div> {/* form-group - review*/}

          {/* Submit Area */}
          <div id='submit-area'>
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
        <button 
          className='btn btn-secondary' 
          id='cancel-edit-button'
          onClick={() => props.cancelReview()}
        >
          Cancel
        </button>
      </div> // well
    }
    </div>
  )
}

export default EditUserReview