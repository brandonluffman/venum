import React from 'react'
// import Stocks from '../components/Stocks'
import Search from '../components/Search';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs'
import { LuCircleDot } from 'react-icons/lu'


export default function Home({ onButtonClick }) {

  return (
    <>
    <Navbar />
    {/* <button onClick={onButtonClick}>Change Background Color</button> */}
    <div className='index-outer-container'>
      <div className='index-container'>
      {/* <Search /> */}
      <h1 className='index-header'>Investment Analytics <i>Driven</i> By <span className='index-color-change'>AI</span></h1>
      <h3 className='index-subheader'>At <span className='index-subheader-brand'>VENUM</span>, our goal is to democratize investment information & tools for investors of all calibers. <i>Power</i> your portfolio with tools used by the largest financial institutions in the world.</h3>
      <div className='index-buttons'>
      <Link href='/stocks'><button className='index-btn index-search-btn' type='button'>Search for Stocks</button></Link>
      <Link href='/gpt' className='index-btn-link'><button className='index-btn' type='button'>Try the GPTFinance Beta <BsArrowRight className='index-btn-arrow' /></button></Link>
      </div>
      </div>
    </div>
    {/* <div className='breaker'>

    </div> */}




    <div className='index-preview-container'>
      <div className='index-preview-left'>
      <h6 className='index-preview-supheader'>By Investors for Investors</h6>
      <h3 className='index-preview-header'>Unlock the power of institutional-grade tools and data to make smarter investment decisions.</h3>
      <ul className='index-preview-menu'>
        {/* <li>Real Time Stock Price Information</li> */}
        <li className='index-preview-link'><LuCircleDot className='index-preview-dot' />
          <div className='index-preview-link-flexer'>
            <div className='index-preview-link-flexer-link'>Simple Interface</div>
            <div className='index-preview-link-flexer-link-2'>Key Company Financial Data & Ratios In A Simple To Use Format</div>
          </div>
        </li>
        <li className='index-preview-link'><LuCircleDot className='index-preview-dot' />
          <div className='index-preview-link-flexer'>
            <div className='index-preview-link-flexer-link'>Sentiment Aggregation</div>
            <div className='index-preview-link-flexer-link-2'>News & Social Media Aggregation with Sentiment Analysis</div>
          </div>
        </li>
        <li className='index-preview-link'><LuCircleDot className='index-preview-dot' />
          <div className='index-preview-link-flexer'>
            <div className='index-preview-link-flexer-link'>General Company Overview</div>
            <div className='index-preview-link-flexer-link-2'>View Insider Trades, Company Specs, Ownership and all other relevant information.</div>
          </div>
        </li>
        <li className='index-preview-link'><LuCircleDot className='index-preview-dot' />
          <div className='index-preview-link-flexer'>
            <div className='index-preview-link-flexer-link'>Accurate Real Time Data</div>
            <div className='index-preview-link-flexer-link-2'>30+ Years of Accurate Financial Information</div>
          </div>
        </li>
      </ul>
      </div>
      <div className='index-preview-right'>
        <img src='/analytics.png' className='index-preview-right-img'></img>
      </div>
    </div>


    <div className='index-data-container'>
        <h6 className='index-data-supheader'>Intuitive and simple to use</h6>
        <h3 className='index-data-header'>Powerful Data, Simple Access.</h3>
        <h6 className='index-data-subheader'>Choose the data access method that suits your needs and get started today.</h6>
        <div className='index-data-grid'>
          <div className='index-data-grid-item'>
            <h2>9,045</h2>
            <h2>Equities</h2>
          </div>
          <div className='index-data-grid-item'>
            <h2>30+</h2>
            <h2>Years of Financial Data</h2>
          </div>
          <div className='index-data-grid-item'>
            <h2>15</h2>
            <h2>Exchanges</h2>
          </div>
        </div>
    </div>



    <div className='index-banner-container'>
        <div className='index-banner-div'>
          <div className='index-banner-div-left'>
            <h6 className='index-banner-supheader'>Powered by GPT-4 <img src='/gpt.png' width='20' className='index-banner-gpt-img'></img></h6>
            <h3 className='index-banner-header'>GPTFinance</h3>
            <h6 className='index-banner-subheader'>Join the waitlist today to get access to the GPTFinance Beta.</h6>
            <Link href='gpt'><button type='button' className='index-banner-btn'>Join the Waitlist <BsArrowRight className='index-btn-arrow' /></button></Link>
          </div>
          <div className='index-banner-div-right'>
          <img src='/gptfinance.jpeg' width='300' className='index-banner-right-img'></img>
          <Link href='gpt'><button type='button' className='index-banner-btn index-banner-right-btn'>Join the Waitlist <BsArrowRight className='index-btn-arrow' /></button></Link>

          </div>
        </div>
    </div>
    <Footer />
    </>
  )
}
