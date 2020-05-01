import React from 'react'
import useForm from '../Utilities/useForm'

const AddUserReview = (props) => {
  //Add Review
  const createReview = async (values) => {
    try{
      const createReviewRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/' + props.companyId, {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
      })
      const createReviewJson = await createReviewRes.json()
      if(createReviewRes.status === 201) {
        console.log('Successfully added review', createReviewJson)
        props.updateCompanyCardData()
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
        <div className='form-group'>
          <label htmlFor='title'>Title:</label>
          <input 
            type='text' 
            className='form-control' 
            id='title' 
            name='title'
            placeholder='Title Review'
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
            id='content' 
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
          <div id='submit-button'>
            <button className='btn btn-danger'>
              Post Review
            </button>
          </div> {/* submit-button */}

          <div className='form-group'>
            <span className="star-rating star-5">
              <input type="radio" name='stars' value={1} onChange={handleChange} /><i></i>
              <input type="radio" name='stars' value={2} onChange={handleChange} /><i></i>
              <input type="radio" name='stars' value={3} onChange={handleChange} /><i></i>
              <input type="radio" name='stars' value={4} onChange={handleChange} /><i></i>
              <input type="radio" name='stars' value={5} onChange={handleChange} /><i></i>
            </span>
          </div> {/* form-group - rating */}

        </div> {/* submit-area */}
      </form> {/* review_form */}
    </div> {/* well */}
    </>
  )
}

export default AddUserReview