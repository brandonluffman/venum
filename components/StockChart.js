import React from 'react'

const StockChart = () => {
  return (
    <div>
    {/* <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>COMPANY</th>
          <th>TICKER</th>
          <th>CIK</th>
          <th>Industry</th>
          <th>Sector</th>
          <th>Country</th>
          <th>Market Cap</th>
          <th>Exchange</th>
        </tr>
      </thead>
      <tbody>
      {feed ? (
          feed.map((item, index) => (
            <tr key={index}>
              <td><Link href={`/stock/${item.id}`}>{item.id}</Link></td>
              <td>{item.Title}</td>
              <td>{item.Ticker}</td>
              <td>{item.CIK}</td>
              <td>{item.Industry}</td>
              <td>{item.Sector}</td>
              <td>{item.Country}</td>
              <td>{item.MarketCap}</td>
              <td>{item.Exchange}</td>
            </tr>
          ))
        ) : (
            <tr key={index}>
              <td>*</td>
              <td>*</td>
              <td>*</td>
              <td>*</td>
            </tr>
        )
      }
      </tbody>
      </table> */}
          {/* <div className='stock-analytics-grid'>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>PE</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>Forward PE</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>YOY Growth</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>Margin</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>EPS Growth</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>Revenue</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>Revenue Growth</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>EBITDA</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>D/E</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>ROE</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
    </div>
    </div> */}
    </div>
  )
}

export default StockChart