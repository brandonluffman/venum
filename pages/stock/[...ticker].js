// import { PrismaClient } from '@prisma/client';
// import prisma from '../../lib/prisma';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from 'react';
import StockTabs from '../../components/StockTabs';
import Footer from '../../components/Footer';
import StockPriceChart from '../../components/StockPriceChart';
import { supabase } from '../../utils/supabaseClient'
import PriceChart from '../../components/PriceChart';
import Head from 'next/head';

const StockDetails = ({ stock }) => {

  const [data, setData] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`https://enigmatic-shelf-22572-e002d447b394.herokuapp.com/current_price/${stock.Ticker}`);
  //       const jsonData = await response.json();
  //       // console.log(jsonData)
  //       setData(jsonData);
  //     } catch (error) {
  //       // console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
         <Head>
          <title>Venum | {stock?.title && stock.title}</title>
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
    <div className='stock-outer-container'>
      
      <Navbar />
      <div className='stock-container'>
        <div className='stock-inside-container'>
        {/* <StockPriceChart stockData={data} /> */}

        {stock && stock.industry && stock.sector && <h6 className='stock-company-industry'><span className='stock-company-industry-span'>{stock.industry}</span> &#8226; {stock.sector}</h6>}
          <div className='stock-name-div'>

            <img className='stock-img' src='/appl.png'></img>
            <div className='ticker-country-div'>
              {stock && stock.ticker &&<h2 className='stock-ticker-name'>{stock.ticker}</h2>  }
              {stock && stock.country && stock.country === 'United States' ? (
                  <img className='country-img' src='/america.jpeg' width='25' alt='USA' />
                ) : (
                  <div>{stock.country}</div>
                )}
            </div>
            
            {stock && stock.title && <h1 className='stock-company-name'>{stock.title}</h1>}

            {stock && data && ( 
                    <div className='stock-company-price-div'>
                    <h3 className='stock-company-price'>{data[0].toLocaleString(2)} <span className='stock-usd'>USD</span></h3>
                    {data[1] > 0 ? (<h3 className='stock-daily-change daily-change-green'>+{data[1].toLocaleString(2)}</h3>):(<h3 className='stock-daily-change daily-change-red'>{data[1].toLocaleString(2)}</h3>)}
                    {data[1] > 0 ? (<h3 className='stock-percent-change daily-change-green'>+{data[2].toLocaleString(2)}%</h3>):(<h3 className='stock-percent-change daily-change-red'>{data[2].toLocaleString(2)}%</h3>)}
                   </div>
                   )}

            </div>
          <div>
          </div>

        </div>

        <StockTabs stock={stock}/>
      </div>
      <Footer />
    </div>
    </>
  );
};


export async function getServerSideProps(context) {
  const { ticker } = context.query;

  try {
    let { data: stock, error } = await supabase
      .from('company_info')
      .select('*')
      .eq('ticker', ticker.toString())
      .single();

    if (error) {
      throw error;
    }

    if (!stock) {
      return { notFound: true };
    }

    // Assuming MarketCap or other numeric fields don't need serialization with Supabase
    return {
      props: { stock },
    };
  } catch (error) {
    console.error('Error fetching stock details:', error);
    return {
      notFound: true,
    };
  }
}





export default StockDetails;
