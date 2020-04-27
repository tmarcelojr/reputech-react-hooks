import React, { useContext, useState } from 'react'
import LoadingContext from '../Contexts/LoadingContext'
import CompanyContext from '../Contexts/CompanyContext'
import CompanyRatings from '../Contexts/CompanyRatings'
import CompanyUserRatings from '../Contexts/CompanyUserRatings'
import CompanyCard from './CompanyCard'
import './custom.css'


export default function ReviewsContainer() {
  // Loading
  const loading = useContext(LoadingContext)
  // Company data
  const company = useContext(CompanyContext)
  // Company ratings
  const ratings = useContext(CompanyRatings)
  const [averageCompanyRatings, setAverageCompanyRatings] = useState([])
  const [getAverages, setGetAverages] = useState(false)
  // Company user ratings
  const averageUserRatings = useContext(CompanyUserRatings)
  const [averageCompanyUserRatings, setAverageCompanyUserRatings] = useState([])

  // Conditional to only run once 
  if(loading.isLoading === false && getAverages === false) {
    const averages = []
    const userRatingsForCompany = []

    ratings.averageRatings.map((ratings, i) => {
      averages.push(Math.round(ratings[1]*2/2))
    })

    averageUserRatings.companyUserRatings.map((userRatings, i) => {
      userRatingsForCompany.push(Math.round(userRatings*2/2))
    })
    setAverageCompanyRatings(averages)
    setAverageCompanyUserRatings(userRatingsForCompany)
    // setCompanyReviews(reviews.organizedReviews)
    setGetAverages(true)
  }
  
  return(
    <div className='my-5 company-card-container'>
      {
        loading.isLoading === false
        ?
        company.companyData.map((companyInfo, i) => {
          return(
            <div
              key={i}
              onClick={() => console.log('we clicked on company', String(companyInfo.id))}
              // onClick={() => console.log('#' + String(companyInfo.id))}
              // onClick={() => console.log(''.concat('#', String(companyInfo.id)))}
              data-toggle="modal"
              data-target={'#a' + String(companyInfo.id)}
              className='company-card'
            >
              <CompanyCard
                websiteLogo={companyInfo.website_logo}
                companyId={companyInfo.id}
                companyWebsite={companyInfo.website}
                companyName={companyInfo.name}
                averageCompanyRatings={averageCompanyRatings[i]}
                averageCompanyUserRatings={averageCompanyUserRatings[i]}
              />

            {/* <!-- Modal --> */}
            <div className="modal fade" id={'a' + String(companyInfo.id)} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {companyInfo.id}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

            </div>

          )
        })
        : null
      }
    </div>
  )
}