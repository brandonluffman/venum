import React from 'react'
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Search from '../components/Search';
import Footer from '../components/Footer';

const stocks = () => {
  return (
    <>
    <Navbar />
    <div className='stocks-container'>
      <Search />
    </div>
    <Footer />
    </>
  )
}

export default stocks