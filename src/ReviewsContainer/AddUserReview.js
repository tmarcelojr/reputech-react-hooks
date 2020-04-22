import React, { useState } from 'react'
import useForm from '../Utilities/useForm'


const CompanyUserReviews = (companyId) => {

  //Add Review
  const createReview = async (values) => {
    try{
      const createReviewRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/' + companyId.companyId, {
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
            <div className='rating'>
              <input type='radio' id='star5' name='stars' value={5} onChange={handleChange} required/>
              <label htmlFor='star5' title='Rocks!'>5 stars</label>
              <input type='radio' id='star4' name='stars' value={4} onChange={handleChange} required/>
              <label htmlFor='star4' title='Pretty good'>4 stars</label>
              <input type='radio' id='star3' name='stars' value={3} onChange={handleChange} required/>
              <label htmlFor='star3' title='Meh'>3 stars</label>
              <input type='radio' id='star2' name='stars' value={2} onChange={handleChange} required/>
              <label htmlFor='star2' title='Kinda bad'>2 stars</label>
              <input type='radio' id='star1' name='stars' value={1} onChange={handleChange} required/>
              <label htmlFor='star1' title='Sucks big time'>1 star</label>
            </div> {/* rating */}
          </div> {/* form-group - rating */}

        </div> {/* submit-area */}
      </form> {/* review_form */}
    </div> {/* well */}
    </>
  )
}

export default CompanyUserReviews