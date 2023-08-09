import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import NewsLetterSignUpForm from '../components/NewsLetterSignUpForm'
// import EmailForm from '../components/EmailForm'

const waitlist = () => {
  return (
    <div>
      <Navbar />
      <div className='gpt-container'>
        <div className='gpt-div'>
        <h1 className='gpt-div-header'>Join the waitlist for <br></br><span className='waitlist-color-change'>GPTFinance</span></h1>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default waitlist