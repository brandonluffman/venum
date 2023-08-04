import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma'; // Import the Prisma client instance
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from 'react';
import StockTabs from '../../components/StockTabs'
import Footer from '../../components/Footer';
import StockPriceChart from '../../components/StockPriceChart';

// const dummyStockData = [];

// // Generating 100 test examples
// for (let i = 0; i < 100; i++) {
//   const date = new Date(2023, 6, 1 + i); // Start from July 1, 2023
//   const close = Math.random() * 100 + 100; // Generate random close prices between 100 and 200
//   dummyStockData.push({ date: date.toISOString().split('T')[0], close: close.toFixed(2) });
// }
// console.log(dummyStockData);

const StockDetails = ({ stock, stockPrices }) => {
  console.log(stock)
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8000/current_price/${stock.Ticker}`);
  //       const jsonData = await response.json();
  //       console.log(jsonData)
  //       setData(jsonData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // console.log(data)
  // const marketNumber = stock.MarketCap
  // const decimalValue = (marketNumber / 1000000000000).toFixed(2);
          {/* {stock && <h3 className='stock-company-price'>{decimalValue} <span className='stock-usd'>USD</span></h3>} */}
          {/* {stock && <h3 className='stock-company-price'>{data} <span className='stock-usd'>USD</span></h3>} */}
          {/* <h6 className='stock-company-exchange'>Exchange: {stock.Exchange}</h6> */}
          {/* <h6 className='stock-company-cik'>CIK{stock.CIK}</h6> */}
  return (
    <div className='stock-outer-container'>
      <Navbar />
      <div className='stock-container'>
        Hello
      {/* <h6 className='stock-company-industry'><span className='stock-company-industry-span'>{stock.Industry}</span> &#8226; {stock.Sector}</h6>
        <div className='stock-name-div'>

          <img className='stock-img' src='/appl.png'></img>
          <div className='ticker-country-div'>
          <h2 className='stock-ticker-name'>{stock.Ticker}</h2>  

          {stock.Country == 'United States' ? 
          (
            <img className='country-img' src='/america.jpeg' width='25'></img>
          )
          :(
            <div>No Country</div>
          )}
          </div>
          <h1 className='stock-company-name'>{stock.Title}</h1>

        </div>
        <div>
        <StockPriceChart stockData={stock} />
        </div>
        <StockTabs stock={stock}/> */}
    </div>

    <Footer />
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const { id } = context.query; // 'id' will be the dynamic part of the URL

//   try {
//     // Fetch the stock details using the Prisma client
//     const stock = await prisma.company_info.findUnique({
//       where: {
//         id: parseInt(id), // Convert 'id' to an integer as Prisma expects
//       },
//     });

//     // Convert bigint values to strings
//     const serializedStock = {
//       ...stock,
//       MarketCap: stock.MarketCap.toString(),
//     };

//     return {
//       props: { stock: serializedStock },
//     };
//   } catch (error) {
//     console.error('Error fetching stock details:', error);
//     return {
//       notFound: true,
//     };
//   }
// }


export async function getServerSideProps(context) {
  const { ticker } = context.query; // 'ticker' will be the dynamic part of the URL
  console.log(`TICKER: ${ticker}`)

  // if (!ticker || typeof ticker !== 'string') {
  //   // Check if 'ticker' is missing or not a string
  //   return {
  //     notFound: true,
  //   };
  // }

  try {
    // Fetch the stock details using the Prisma client based on the ticker (case-insensitive search)
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
      MarketCap: stock.MarketCap.toString(),
    };

    // Fetch the stock prices based on the ticker from the stock_prices table
    const stockPrices = await prisma.stock_prices.findMany({
      where: {
        ticker_symbol: ticker,
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Combine the stock data and stock prices
    const data = {
      stock: serializedStock,
      prices: stockPrices,
    };

    return {
      props: { data },
    };
  } catch (error) {
    console.error('Error fetching stock details:', error);
    return {
      notFound: true,
    };
  }
}

export default StockDetails; 



