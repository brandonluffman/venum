import React from 'react'
import SimilaritySearch from '../components/SimilaritySearch'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const test = () => {
  return (
    <div>
        <Navbar />
        <div className='test-container'>
        <SimilaritySearch />
        </div>
        <Footer />
    </div>
  )
}

export default test