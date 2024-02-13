// import { PrismaClient } from '@prisma/client';
// import prisma from '../../lib/prisma';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from 'react';
import StockTabs from '../../components/StockTabs';
import Footer from '../../components/Footer';
import StockPriceChart from '../../components/StockPriceChart';

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
    <div className='stock-outer-container'>
      <Navbar />
      <div className='stock-container'>
        <div className='stock-inside-container'>
        {/* <StockPriceChart stockData={data} /> */}
        {stock && stock.Industry && stock.Sector && <h6 className='stock-company-industry'><span className='stock-company-industry-span'>{stock.Industry}</span> &#8226; {stock.Sector}</h6>}
          <div className='stock-name-div'>

            <img className='stock-img' src='/appl.png'></img>
            <div className='ticker-country-div'>
              {stock && stock.Ticker &&<h2 className='stock-ticker-name'>{stock.Ticker}</h2>  }
              {stock && stock.Country && stock.Country === 'United States' ? (
                  <img className='country-img' src='/america.jpeg' width='25' alt='USA' />
                ) : (
                  <div>{stock.Country}</div>
                )}
            </div>
            {stock && stock.Title && <h1 className='stock-company-name'>{stock.Title}</h1>}
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
  );
};


export async function getServerSideProps(context) {
  const { ticker } = context.query; // 'ticker' will be the dynamic part of the URL
  console.log(ticker)
  try {
    const stock = await prisma.company_info.findFirst({
      where: {
        Ticker: {
          equals: ticker.toString(),
        },
      },
    });

    if (!stock) {
      return {
        notFound: true,
      };
    }

    // Convert bigint values to strings in the stock data (if needed)
    const serializedStock = {
      ...stock,
      MarketCap: stock.MarketCap !== undefined ? stock.MarketCap.toString() : null,
    };

    // Fetch the stock prices based on the ticker from the stock_prices table
    // const stockPrices = await prisma.stock_prices.findMany({
    //   where: {
    //     ticker_symbol: ticker.toString(),
    //   },
    //   orderBy: {
    //     date: 'asc',
    //   },
    //   // take: 100000, // Limit the result to the first 100 rows

    // });

    // // console.log(stockPrices)

    // const serializedStockPrices = stockPrices.map((price) => ({
    //   ...price,
    //   date: price.date.toISOString(), 
    //   close_price: price.close_price.toString(), // Convert Decimal to string
    // }));

    // // Combine the stock data and stock prices
    // const data = {
    //   stock: serializedStock,
    //   // prices: stockPrices,
    // };

    return {
      props: { stock: serializedStock },
    };
  } catch (error) {
    console.error('Error fetching stock details:', error);
    return {
      notFound: true,
    };
  }
}





export default StockDetails;