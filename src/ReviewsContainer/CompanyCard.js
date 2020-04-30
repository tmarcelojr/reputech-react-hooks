import React, { useState, useContext } from 'react'
import StarRatings from 'react-star-ratings'
import CompanyUserReviews from './CompanyUserReviews'
import { FcComments } from "react-icons/fc";
import useForm from '../Utilities/useForm'

const CompanyCard = ({
  companyId,
  companyName, 
  websiteLogo, 
  companyWebsite,
  averageCompanyRatings, 
  averageCompanyUserRatings
}) => {

  //Add Review
  const createReview = async (values) => {
    // console.log('this is our values inside createreview', {values,  companyId})
    try{
      const createReviewRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/' + companyId, {
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
    
  // useForm needs to be after fetch calls to avoid errors of initialization
  const [values, handleChange, handleSubmit] = useForm(createReview)
 
  return(
    <div className='company-card'>
    {/* Company Card */}
    <div className='card mb-5'>
      <div className='row no-gutters' style={{ width: '35rem', height: '15rem' }}>
        <div id='img-container' className='col-md-3'>
          <img src={websiteLogo} style={{ height: '100px', width: '100px'}} className='card-img' alt='company logo' />
        </div> { /* col-md-2 */ }
        <div className='col-md-8 text-left'>
          <div className='card-body'>
            <button className='card-title'>
              <strong>{companyName}</strong>
            </button> {/* card-title */}
            <div id='star_container'>
              <div className='star-line'>
                <div>
                  <h6 className='company_rating'>{averageCompanyRatings}</h6>
                </div>
                <div>
                  <StarRatings 
                    rating={averageCompanyRatings} 
                    starRatedColor='orange'
                    numberOfStars={5}
                    starDimension='20px'
                    name='rating'
                  />
                </div>
              </div> {/* star-line */}
              <small><i>Reputech rating:</i></small>
              <div className='star-line'>
                <div>
                  <h6 className='company_rating'>{averageCompanyUserRatings}</h6>
                </div>
                <div>
                  <StarRatings 
                    rating={averageCompanyUserRatings}
                    starRatedColor='crimson'
                    numberOfStars={5}
                    starDimension='20px'
                    name='rating'
                  />
                </div>
              </div> {/* star-line */}
            </div> {/* star-container */}
          </div> {/* card-body */}
          <p className='card-text'>For more information:  
          <a 
            target='_blank'
            href={'http://' + companyWebsite}
            rel='noopener noreferrer'
            > {companyWebsite}</a></p>
          </div> {/* col-md-8 */}
        <div className='reviews-button-area'>
          <button
            data-toggle="modal"
            data-target={'#a' + String(companyId)}
          >
            <FcComments />
          </button>


          {/* <!-- Modal --> */}
          <div className="modal fade" id={'a' + String(companyId)} tabIndex="-1" role="dialog" aria-labelledby={'a' + String(companyId)} aria-hidden="true" >
            <div className="modal-dialog" role="document">
              <div className="modal-content"  style={{ width: '50rem' }}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Company Reviews</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal-body">
                  
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
                {/* <CompanyUserReviews
                  companySelectedId={companySelectedId}
                  reviews={reviews}
                /> */}
                </div> {/* modal-body */}
              </div> {/* modal-content */}
            </div> {/* modal-dialog */}

            <CompanyUserReviews 
              companyId={companyId}
            />

          </div> {/* modal-fade */}
        </div> {/* reviews-button-area */}
      </div> {/* row no-gutters */}
    </div> {/* card mb-5 */}
    </div> 
  )
}

export default CompanyCard