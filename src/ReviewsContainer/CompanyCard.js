import React, { useContext, useState } from 'react'
import StarRatings from 'react-star-ratings'
import CompanyUserReviews from './CompanyUserReviews'
import AddUserReview from './AddUserReview'
import EditUserReview from './EditUserReview'
import UserContext from '../Contexts/UserContext'
import { FcComments, FcLike, FcLikePlaceholder } from "react-icons/fc";

const CompanyCard = ({
  companyId,
  companyName, 
  websiteLogo, 
  companyWebsite,
  averageCompanyRatings, 
  averageCompanyUserRatings,
  addToFavorites,
  removeFromFavorites
}) => {

  const user = useContext(UserContext)
  const [editReview, setEditReview] = useState()
  const [addReview, setAddReview] = useState(false)
  const [favorite, setFavorite] = useState(false)

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
            <div className='card-title'>
              <strong>{companyName}</strong>
            </div> {/* card-title */}
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
            className='company-reviews-button'
          >
            <FcComments />
          </button>
          
          <div onClick={() => 
            favorite === true 
            ? 
            setFavorite(false)
            :
            (addToFavorites(), setFavorite(true))
            }>
            {
              favorite === false
              ?
              <button 
                className='company-reviews-button'
              >
                <FcLikePlaceholder />
              </button>
              :
              <button 
                className='company-reviews-button'
              >
                <FcLike />
              </button>
            }
          </div>

          <div><button onClick={() => removeFromFavorites()}>delete</button></div>

          {/* <!-- Modal --> */}
          <div className="modal fade" id={'a' + String(companyId)} tabIndex="-1" role="dialog" aria-labelledby={'a' + String(companyId)} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{companyName} Reviews</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body text-right">
                  {
                    user.user === null
                    ? null
                    :
                    <button 
                      className='btn btn-success my-2'
                      onClick={() => setAddReview(true)}
                    >
                      Add Review
                    </button>
                  }
                  {
                    user.user !== null && addReview === true
                    ? 
                    <AddUserReview 
                      companyId={companyId}
                      cancelReview={() => setAddReview(false)}
                    />
                    : null
                  }
                  {
                    editReview === undefined
                    ?
                    <CompanyUserReviews 
                      companyId={companyId} 
                      editReview={(values) => setEditReview(values)}
                    />
                    : null
                  }
                  {
                    editReview !== undefined
                    ? 
                    <EditUserReview 
                      companyValues={editReview}
                      cancelReview={() => setEditReview(undefined)}
                    />
                    : null
                  }
                </div> {/* modal-body */}
              </div> {/* modal-content */}
            </div> {/* modal-dialog */}
          </div> {/* modal-fade */}

        </div> {/* reviews-button-area */}
      </div> {/* row no-gutters */}
    </div> {/* card mb-5 */}
    </div> 
  )
}

export default CompanyCard
