import React from 'react'
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Search from '../components/Search';
import Footer from '../components/Footer';
import prisma from '../lib/prisma';

const stocks = ({ feed }) => {
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

export async function getStaticProps() {
  try {
    // Fetch the data using Prisma
    const feed = await prisma.company_info.findMany({
      take: 100, // Limit the number of results to 100
    });

    // Convert bigint values to strings
    const serializedFeed = feed.map((item) => ({
      ...item,
      MarketCap: item.MarketCap !== null ? item.MarketCap.toString() : null,
    }));

    return {
      props: { feed: serializedFeed },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { feed: [] }, // Return an empty feed if there's an error
      revalidate: 10,
    };
  }
}