import React from 'react'
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Head from 'next/head';
import SimilaritySearch from '../components/SimilaritySearch';
import Screener from '../components/Screener';

const etfs = () => {
  return (
    <>
         <Head>
          <title>Venum | ETFs</title>
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
    <div className='asset-top-container'>
      <div>
        <h1>ETFs</h1>
        <h3>Exchange Traded Funds</h3>
        </div>
    </div>
    <div>
     <Screener />   
    </div>
    <Footer />
    </>
  )
}

export default etfs