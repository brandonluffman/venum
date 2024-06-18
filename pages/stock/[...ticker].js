// import { PrismaClient } from '@prisma/client';
// import prisma from '../../lib/prisma';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from 'react';
import StockTabs from '../../components/StockTabs';
import Footer from '../../components/Footer';
// import StockPriceChart from '../../components/StockPriceChart';
import { supabase, storage } from '../../utils/supabaseClient'
// import PriceChart from '../../components/PriceChart';
import Head from 'next/head';
import Loading from '../../components/Loading';

const StockDetails = ({ stock }) => {

  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);



  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`/api/stockPrice?ticker=${stock.ticker}`);
        const data = await response.json();
        if (response.ok) {
          console.log(data.price)
          setPrice(data.price);
        } else {
          console.error('Error fetching stock price:', data.error);
        }
      } catch (error) {
        console.error('Error fetching stock price:', error);
      }
    };

    // const fetchImage = async () => {
    //   try {
    //     console.log('Ticker', stock.ticker)
    //     const { publicURL, error } = await supabase
    //       .storage
    //       .from('ticker_images') 
    //       .getPublicUrl(`${stock.ticker}.png`);

    //     if (error) {
    //       console.error('Error fetching image URL:', error.message);
    //       return;
    //     }

    //     console.log('Public URL', publicURL)

    //     setImageUrl(publicURL);
    //   } catch (error) {
    //     console.error('Error fetching image URL:', error.message);
    //   }
    // };

    if (stock.ticker) {
      fetchPrice();
      // fetchImage();
    }
  }, [stock.ticker]);


  if (isLoading) {
    return <Loading />;
  }

  
  return (
    <>
         <Head>
          <title>Venum | {stock?.title && stock.ticker}</title>
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
        {/* {imageUrl ? <img src={imageUrl} alt='Company Logo' className='company-logo' />: <div>No Image</div>} */}

        {stock && stock.industry && stock.sector && <h6 className='stock-company-industry'><span className='stock-company-industry-span'>{stock.industry}</span> &#8226; {stock.sector}</h6>}
          <div className='stock-name-div'>
            {/* <img className='stock-img' src='/appl.png'></img> */}
            {/* <img src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/ticker_images/${stock.ticker}.png`} className='company-logo stock-img'></img> */}
            <img
                src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/ticker_images/${stock.ticker}.png`}
                className='company-logo stock-img'
                onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = '/favicon.ico'; // Use fallback image
                }}
                // alt='Company Logo'
            />
            <div className='ticker-country-div'>
              {stock && stock.ticker &&<h2 className='stock-ticker-name'>{stock.ticker}</h2>  }
              {stock && stock.country && stock.country === 'United States' ? (
                  <img className='country-img' src='/america.jpeg' width='25' alt='USA' />
                ) : (
                  <div>{stock.country}</div>
                )}
            </div>



            {stock && stock.title && <h1 className='stock-company-name'>{stock.title}</h1>}

            {stock && price ? ( 
                    <div className='stock-company-price-div'>
                    <h3 className='stock-company-price'>${price.toLocaleString(2)} <span className='stock-usd'>USD</span></h3>
                    {/* {data[1] > 0 ? (<h3 className='stock-daily-change daily-change-green'>+{data[1].toLocaleString(2)}</h3>):(<h3 className='stock-daily-change daily-change-red'>{data[1].toLocaleString(2)}</h3>)}
                    {data[1] > 0 ? (<h3 className='stock-percent-change daily-change-green'>+{data[2].toLocaleString(2)}%</h3>):(<h3 className='stock-percent-change daily-change-red'>{data[2].toLocaleString(2)}%</h3>)} */}
                   </div>
                   ):(
                    <div>
                      Retreiving...
                      </div>
                   )
                }
            </div>
          {/* <div>
            <h1>Testing</h1>
          </div> */}

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
