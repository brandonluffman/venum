import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const pricing = () => {
  return (
    <div>
        <Navbar />
            <div className='pricing-container'>
                <div className='pricing-grid-div'>
                    <div className='pricing-grid-item'>
                        Basic
                    </div>  
                    <div className='pricing-grid-item'>
                        Pro
                    </div>
                    <div className='pricing-grid-item'>
                        Amateur
                    </div>
                </div>
            </div>
        <Footer />
    </div>
  )
}

export default pricing