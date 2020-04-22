import React, { useContext, useState } from 'react'
import StarRatings from 'react-star-ratings'
import { FaCaretDown } from 'react-icons/fa'
import CompanyUserReviews from './CompanyUserReviews'
import CompanyUserReviewsContext from '../Contexts/CompanyUserReviewsContext'
import LoadingContext from '../Contexts/LoadingContext'

const CompanyCard = ({
  companyId,
  companyName, 
  websiteLogo, 
  companyWebsite,
  averageCompanyRatings, 
  averageCompanyUserRatings
}) => {

  const reviews = useContext(CompanyUserReviewsContext)

  return(
    <>
    {/* Company Card */}
    <div className='card mb-5'>
      <div className='row no-gutters'>
        <div id='img-container' className='col-md-2'>
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

        {/* {User Reviews Container} */}
        <div className='review-box'>
          <button
            id='collapse-button'
            className='btn btn-primary' 
            type='button' 
            data-toggle='collapse' 
            data-target={'#a' + companyId} 
            aria-expanded='false' 
            aria-controls={'a' + companyId}
          >
            <FaCaretDown />
          </button>
          <div className='collapse text-left' id={'a' + companyId}>
            <CompanyUserReviews
              reviews={reviews.organizedReviews[companyId - 1]}
              companyId={companyId}
            />
          </div> {/* collapse */}
        </div> {/* review_box */}
      </div> {/* row no-gutters */}   
    </div> {/* card mb-5 */}
    </>
  )
}

export default CompanyCard