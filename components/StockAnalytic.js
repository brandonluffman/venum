import React, {useState, useEffect} from 'react'
import PriceChart from './PriceChart'
import Link from 'next/link'

const StockAnalytic = ({stock}) => {


  return (
    <div>
                  {stock.ticker &&    <PriceChart ticker={stock.ticker} />}

          {stock && 

      <div className='stock-company-description-div'>

          <div className='stock-company-description-top'>
          <h3 className='stock-company-description-header'>Company Description</h3>
          </div>
          <div className='stock-company-description-bottom'>
            <div>
              <p>CEO</p>
              {stock.ceo && <p>{stock.ceo}</p>}
            </div>
            <div>
              <p>Full Time Employees</p>
              {stock.employees &&<p>{stock.employees.toLocaleString()}</p>}
            </div>
            <div>
              <p>Sector</p>
              {stock.sector &&<p>{stock.sector}</p>}
            </div>
            <div>
              <p>Industry</p>
              {stock.industry &&<p>{stock.industry}</p>}
            </div>
            <div>
              <p>Address</p>
              {stock.full_address &&<p>{stock.full_address}</p>}
            </div>
            <div>
              <p>Website</p>
              {stock.website &&<p><Link rel='noreferrer' target="_blank" href={stock.website}>{stock.website}</Link></p>}
            </div>
            <div>
              <p>CIK</p>
              {stock.cik &&<p>{stock.cik}</p>}
            </div>
            <div>
              <p>Market Cap</p>
              {stock.market_cap && <p>{parseInt(stock.market_cap, 10).toLocaleString()}</p>}
            </div>
            <div>
              <p>Business Overview</p>
              {stock.summary &&<p>{stock.summary}</p>}
            </div>
          </div>
        </div>
            }        
  </div>
  )
}


export default StockAnalytic