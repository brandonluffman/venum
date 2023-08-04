import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NewsLetterSignUpForm from '../components/NewsLetterSignUpForm'

const gpt = () => {
  return (
    <div>
      <Navbar />
      <div className='gpt-container'>
        <div className='gpt-div'>
        <h1 className='gpt-div-header'>Join the waitlist for <br></br><span className='waitlist-color-change'>GPTFinance</span></h1>
        <NewsLetterSignUpForm />

        {/* <form className='gpt-waitlist-form'>
        <input type='text' placeholder='Enter your email here ...' className='gpt-waitlist-input'></input>
        <button type='submit' className='gpt-waitlist-input-btn'>Sign Up</button>
        </form> */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default gpt