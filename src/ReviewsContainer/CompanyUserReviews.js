import React, { useState } from 'react'
import useForm from '../Utilities/useForm'


const CompanyUserReviews = ({companyId}) => {
  // const [reviews, setReviews] = useState([])
  // const [reviewStars, setReviewStars] = useState(0)

  // //Add Review
  // const createReview = async () => {
  //   try{
  //     const reviewToAddJson = JSON.stringify(values)
  //     const createReviewRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/' + companyId, {
  //         credentials: 'include',
  //         method: 'POST',
  //         body: (reviewToAddJson),
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //     })
  //     const createReviewJson = await createReviewRes.json()
  //     if(createReviewRes.status === 201) {
  //       setReviews(createReviewJson.data)
  //     }
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }

  // const [values, handleChange, handleSubmit] = useForm(createReview)

  return(
    <>
    <div className='well'>
      <form className='review_form'>
        <div className='form-group'>
          <label htmlFor='title'>Title:</label>
          <input 
            type='text' 
            className='form-control' 
            id='title' 
            name='title'
            placeholder='Review titles'
            // value={values.title || ''}
            // onChange={handleChange}
            required
          /> {/* form-control */}
        </div> {/* form-group - title */}

        <div className='form-group'>
          <label htmlFor='textarea'>Review:</label>
          <input 
            className='form-control'
            type='text'
            id='content' 
            name='content'
            rows='3'
            // value={values.review || ''}
            // onChange={handleChange}
            required
          />
        </div> {/* form-group - review*/}

        {/* Submit Area */}
        <div id='submit-area'>
          <div id='submit-button'>
            <button className='btn btn-danger'
              onClick={(e) => {
                e.preventDefault()
                // createReview(values.review, companyId)
              }}>
              Post Review
            </button>
          </div> {/* submit-button */}

          <div className='form-group'>
            <div className='rating'>
              {/* <input type='radio' id='star5' name='stars' value={5} onChange={setReviewStars(5)}/>
              <label htmlFor='star5' title='Rocks!'>5 stars</label>
              <input type='radio' id='star4' name='stars' value={4} onChange={setReviewStars(4)}/>
              <label htmlFor='star4' title='Pretty good'>4 stars</label>
              <input type='radio' id='star3' name='stars' value={3} onChange={setReviewStars(3)}/>
              <label htmlFor='star3' title='Meh'>3 stars</label>
              <input type='radio' id='star2' name='stars' value={2} onChange={setReviewStars(2)}/>
              <label htmlFor='star2' title='Kinda bad'>2 stars</label>
              <input type='radio' id='star1' name='stars' value={1} onChange={setReviewStars(1)}/> */}
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