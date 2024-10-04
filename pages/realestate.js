import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import RealEstate from '../components/RealEstate'

const realestate = () => {

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
      <RealEstate />
  <Footer />
  </>
)
}


export default realestate