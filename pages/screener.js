import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const screener = ({feed}) => {
  console.log(feed)
  return (
    <div>
      <Navbar />
      <div className='screener-container'>
      <table className='screener-table'>
        <thead className='screener-thead'>
          <tr>
          <th>Ticker</th>
          <th>Title</th>
          <th>Market Cap</th>
          <th>Country</th>
          </tr>
        </thead>
        <tbody className='screener-tbody'>
        {feed.map((item) => (
              <tr key={item.id}> {/* Assuming each item in feed has an 'id' property */}
                <td>{item.Ticker}</td>
                <td>{item.Title}</td>
                <td>{item.Market_Cap && item.Market_Cap}</td>
                <td>{item.Country && item.Country}</td>


              </tr>
            ))}
        </tbody>
      </table>
      </div>
    <Footer />
    </div>
  )
}

export default screener

export async function getStaticProps() {
  try {
    // Fetch the data using Prisma
    const feed = await prisma.company_info.findMany({
      take: 10, // Limit the number of results to 100
    });

    // Convert bigint values to strings
    const serializedFeed = feed.map((item) => ({
      ...item,
      MarketCap: item.Market_Cap !== null ? item.Market_Cap.toString() : null,
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
