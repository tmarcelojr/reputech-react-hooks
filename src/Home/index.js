import React from 'react'
import './index.css'
import image from '../Images/pngguru.com.png'

export default function Home() {
  return(
    <div className='py-5 my-5 home-page-container'>
      <div className="section-one">
        <div className='text-left mx-3'>
          <p className='slogan'>FIND THE</p>
          <p className='slogan'><i style={{ color: 'rgb(232, 100, 95' }}>RIGHT</i> COMPANY</p>
          <p className='slogan'>FOR YOU.</p>
          <p className='slogan-sentence'>RepuTech is a tool that compares existing company ratings from the web and RepuTech users. Start your journey to a happy worklife.</p>
        </div> {/* text-right */}
        <div>
        </div>
        <div className='home-page-picture ml-auto'>
          <img id='home-page-image' src={image} alt='Woman holding laptop' />
        </div>
        <div className="separator">
          <svg className="separator__svg" width="100%" height="400" viewBox="0 0 100 100" preserveAspectRatio="none" fill="#44A36F" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M 100 100 V 10 L 0 100"/>
            <path d="M 30 73 L 100 18 V 10 Z" fill="#308355" strokeWidth="0"/>
            </svg>
        </div> {/* separator */}
      </div> {/* section-one */}
    </div> // home-page-container
  )
}