import React, {useContext} from 'react'
import useForm from '../Utilities/useForm'
import CompanyUserReviewsContext from '../Contexts/CompanyUserReviewsContext'

const AddUserReview = (props) => {
  const reviews = useContext(CompanyUserReviewsContext)

  //Add Review
  const createReview = async (values) => {
    // Need to turn stars into int
    let newValues = {title: values.title, content: values.content, stars: parseInt(values.stars)}
    try{
      const createReviewRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/' + props.companyId, {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(newValues),
          headers: {
            'Content-Type': 'application/json'
          }
      })
      const createReviewJson = await createReviewRes.json()
      if(createReviewRes.status === 201) {
        console.log('Successfully added review', createReviewJson)
        reviews.unorganizedUserReviews.setUserReviews(userReviews => [...userReviews, createReviewJson.data])
        props.cancelReview()
      }
    } catch(err) {
      console.log(err);
    }
  }

  const [values, handleChange, handleSubmit] = useForm(createReview)

  return(
    <>
    <div className='well px-3'>
      <form className='review-form' data-toggle='validator' onSubmit={handleSubmit}>
        <div className='form-group text-left'>
          <label htmlFor='title'>Title:</label>
          <input 
            type='text' 
            className='form-control' 
            name='title'
            placeholder='Title Review'
            value={values.title || ''}
            onChange={handleChange}
            required
          /> {/* form-control */}
        </div> {/* form-group - title */}
        <div className='form-group text-left'>
          <label htmlFor='content'>Review:</label>
          <input 
            className='form-control'
            type='text'
            name='content'
            placeholder='Add your review here...'
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
          <div id='submit-button'>
            <button className='btn btn-danger'>
              Post Review
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
    </div> {/* well */}
    </>
  )
}

export default AddUserReview