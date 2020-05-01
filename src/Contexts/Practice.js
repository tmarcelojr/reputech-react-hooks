import React from 'react'


let ReviewsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
      console.log('we made it to add_review')
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
      return {...state, userReviews: action.value}
    case 'DELETE_REVIEW':
      return state
    case 'UPDATE_REVIEW':
      return state
    case 'FETCH_REVIEWS':
      return state
    default:
      return state
  }
}

export default ReviewsReducer