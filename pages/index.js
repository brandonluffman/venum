import React, { useState, useEffect } from 'react'
// import Stocks from '../components/Stocks'
import Search from '../components/Search';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs'
import { LuCircleDot } from 'react-icons/lu'
import Head from 'next/head';
import { supabase } from '../utils/supabaseClient';
import MultiLineChart from '../components/MultiLineChart';


export default function Home({ onButtonClick }) {
  const [topStocks, setTopStocks] = useState([]);


  return (
    <>
      <Head>
          <title>Venum | Investment Analytics Driven By AI</title>
          <meta name="description" content="Investment analytics driven by AI." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="robots" content="index, follow" />
          <link rel="icon" href="/favicon.jpeg" />
          <link rel="apple-touch-icon" href="/favicon.jpeg" /> 
          <link rel="canonical" href="https://venum.vercel.app/"/>
          <meta property="og:type" content="article" />
           <meta property="og:title" content="Venum" />
           <meta property="og:description" content="Investment analytics driven by AI." />
           <meta property="og:image" content="/favicon.jpeg" />
           <meta property="og:url" content="https://venum.vercel.app/" />
           <meta property="og:site_name" content="Venum" />
           {/* <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "Organization",
               "url": "https://www.rankiai.com",
               "logo": "https://www.ranki.ai/public/favicon.png"
             })}}
         /> */}
        </Head>
    <Navbar />
    {/* <button onClick={onButtonClick}>Change Background Color</button> */}
    <div className='index-outer-container'>
      <div className='index-container'>
      {/* <Search /> */}
      <h1 className='index-header'>Investment Analytics <i>Driven</i> By <span className='index-color-change'>AI</span></h1>
      <Search />
      {/* <h3 className='index-subheader'>At <span className='index-subheader-brand'>VENUM</span>, our goal is to democratize investment information & tools for investors of all calibers. <i>Power</i> your portfolio with tools used by the largest financial institutions in the world.</h3> */}
      {/* <div className='index-buttons'>
      <Link href='/stocks'><button className='index-btn index-search-btn' type='button'>Search for Stocks</button></Link>
      <Link href='/gpt' className='index-btn-link'><button className='index-btn try-gpt-btn' type='button'>Try the GPTFinance Beta <BsArrowRight className='index-btn-arrow' /></button></Link>
      </div> */}
      </div>
    </div>


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
        <h6 className='index-data-supheader'>Comprehensive suite of investments.</h6>
        <h3 className='index-data-header'>All Investment Classes</h3>
        <h6 className='index-data-subheader'>Get access to every class of assets globally.</h6>


        <div className='index-classes-grid'>
                <div className='index-classes-grid-item'>
                  <div><img src='equities.png' width={30}></img><h2>Stocks</h2></div>
                </div>
                <div className='index-classes-grid-item'>
                  <div><img src='bonds.png' width={30}></img><h2>Bonds</h2></div>
                </div>
                <div className='index-classes-grid-item'>
                  <div><img src='cash.webp' width={40}></img><h2>Cash Equivalents</h2></div>
                </div>
                <div className='index-classes-grid-item'>
                  <div><img src='etf.png' width={40}></img><h2>ETFs</h2></div>
                </div>
                <div className='index-classes-grid-item'>
                  <div><img src='mutual.webp' width={40}></img><h2>Mutual Funds</h2></div>
                </div>
                <div className='index-classes-grid-item'>
                  <div><img src='commodities.webp' width={40}></img><h2>Commodities</h2></div>
                </div>
                <div className='index-classes-grid-item'>
                  <div><img src='futures.webp' width={40}></img><h2>Futures</h2></div>
                  {/* <div className='index-classes-dropdown'>
                    Hello Test
                  </div> */}
                </div>
                <div className='index-classes-grid-item'>
                  <div><img src='forex.webp' width={40}></img><h2>Forex</h2></div>
                </div>
                <div className='index-classes-grid-item'>
                  <div><img src='crypto.webp' width={40}></img><h2>Cryptocurrency</h2></div>
                </div>
                {/* <div className='index-classes-grid-item'>
                  <div><h2>Real Estate</h2></div>
                </div>
                <div className='index-classes-grid-item'>
                  <div><h2>Private Equity</h2></div>
                </div>
                <div className='index-classes-grid-item'>
                  <div><h2>Hedge Funds</h2></div>
                </div> */}
                {/* <div className='index-classes-grid-item'>
                  <div><h2>Collectibles</h2></div>
                </div> */}
                {/* <div className='index-classes-grid-item'>
                  <div><h2>Indices</h2></div>
                </div>
                <div className='index-classes-grid-item'>
                  <div><h2>Economy</h2></div>
                </div> */}
          </div>
    </div>

    <div className='index-data-container index-why-container'>
        <h6 className='index-data-supheader'>Intuitive and simple to use</h6>
        <h3 className='index-data-header'>Why Invest?</h3>
        <h6 className='index-data-subheader index-why-subheader'>See how a $100,000 investment in each asset class 30 years ago compares to holding dollars today.</h6>
        <div className='index-why-grid'>
         <div className='index-why-legend'>
          <div className='index-why-legend-item'>
                        <div className='legend-item-name'><div className='legend-dot'></div><h3>Stocks</h3></div>
                        <div className='legend-change-container'><h3>$100,000</h3><BsArrowRight /><h3>$1,022,471</h3></div>
                        {/* <div className='index-why-returns'>
                        <div className='index-why-return'><h3>Average Return</h3> <h3>9.84%</h3></div>
                        <div className='index-why-return'><h3>Cumulative Return</h3> <h3>305.09%</h3></div>
                        </div> */}

          </div>
          <div className='index-why-legend-item'>
                      <div className='legend-item-name'><div className='legend-dot'></div><h3>Bonds</h3></div>
                      <div className='legend-change-container'><h3>$100,000</h3><BsArrowRight /><h3>$333,615</h3></div>
                      {/* <div className='index-why-returns'>
                      <div className='index-why-return'><h3>Average Return</h3> <h3>4.88%</h3></div>
                      <div className='index-why-return'><h3>Cumulative Return</h3> <h3>151.32%</h3></div>
                      </div> */}

          </div>
          <div className='index-why-legend-item'>
                  <div className='legend-item-name'><div className='legend-dot'></div><h3>Real Estate</h3></div>
                  <div className='legend-change-container'><h3>$100,000</h3><BsArrowRight /><h3>$400,578</h3></div>
                  {/* <div className='index-why-returns'>
                  <div className='index-why-return'><h3>Average Return</h3> <h3>4.92%</h3></div>
                  <div className='index-why-return'><h3>Cumulative Return</h3> <h3>147.68%</h3></div>
                  </div> */}
          </div>
          <div className='index-why-legend-item'>
                  <div className='legend-item-name'><div className='legend-dot'></div><h3>Gold</h3></div>
                  <div className='legend-change-container'><h3>$100,000</h3><BsArrowRight /><h3>$529,096</h3></div>
                  {/* <div className='index-why-returns'>
                  <div className='index-why-return'><h3>Average Return</h3> <h3>6.70%</h3></div>
                  <div className='index-why-return'><h3>Cumulative Return</h3> <h3>200.98%</h3></div>
                  </div> */}

          </div>
          <div className='index-why-legend-item'>
                  <div className='legend-item-name'><div className='legend-dot'></div><h3>U.S. Dollar</h3></div>
                  <div className='legend-change-container'><h3>$100,000</h3><BsArrowRight /><h3 className='red'>$46,245</h3></div>
                  {/* <div className='index-why-returns'>
                  <div className='index-why-return'><h3>Average Return</h3><h3 className='red'>-2.52%</h3></div>
                  <div className='index-why-return'><h3>Cumulative Return</h3> <h3 className='red'>-75.8%</h3></div>
                  </div> */}
          </div>
          </div>
          <div className='index-why-grid-container'>
         <MultiLineChart />
         </div>
        </div>
        {/* <div>
          <div>
            Stocks

          </div>
        </div> */}
    </div>


    {/* <div className='index-data-container'>
        <h6 className='index-data-supheader'>As inflation rises, the value of a dollar decreases.</h6>
        <h3 className='index-data-header'>Put your money to work.</h3>
        <h6 className='index-data-subheader'>Choose the data access method that suits your needs and get started today.</h6>
        <div className='index-data-grid'>
          <h2> *** ADD INVESTMENT CALCULATOR</h2>
          <h2> *** ADD Portfolio Allocation Tool</h2>

       </div>
    </div> */}


    {/* <div className='index-data-container'>
        <h3 className='index-data-header'>Powerful Data, Simple Access.</h3>
        <h6 className='index-data-subheader'>Choose the data access method that suits your needs and get started today.</h6>
        <div className='index-data-grid'>
          <div className='index-data-grid-item'>
            <div>
            <h2>9,045</h2>
            <h2>Equities</h2>
            </div>
          </div>
          <div className='index-data-grid-item'>
          <div>
            <h2>30+</h2>
            <h2>Years of Data</h2>
            </div>
          </div>
          <div className='index-data-grid-item'>
          <div>
            <h2>15</h2>
            <h2>Exchanges</h2>
            </div>
          </div>
        </div>
    </div> */}



    {/* <div className='index-banner-container'>
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
    </div> */}
    <Footer />
    </>
  )
}
