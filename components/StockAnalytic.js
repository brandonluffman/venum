import React, {useState, useEffect} from 'react'

const StockAnalytic = ({stock}) => {


  return (
    <div>
          {stock && 

      <div className='stock-company-description-div'>
          <div className='stock-company-description-top'>
          <h3 className='stock-company-description-header'>Company Description</h3>
          </div>
          <div className='stock-company-description-bottom'>
            <div>
              <p>CEO</p>
              <p>{stock.CEO}</p>
            </div>
            <div>
              <p>Full Time Employees</p>
              <p>{stock.Employees.toLocaleString()}</p>
            </div>
            <div>
              <p>Sector</p>
              <p>{stock.Sector}</p>
            </div>
            <div>
              <p>Industry</p>
              <p>{stock.Industry}</p>
            </div>
            <div>
              <p>Address</p>
              <p>{stock.Full_Address}</p>
            </div>
            <div>
              <p>Website</p>
              <p>{stock.Website}</p>
            </div>
            <div>
              <p>CIK</p>
              <p>{stock.CIK}</p>
            </div>
            <div>
              <p>Market Cap</p>
              <p>{stock.Market_Cap && stock.Market_Cap.toLocaleString()}</p>
            </div>
            <div>
              <p>Business Overview</p>
              <p>{stock.Summary}</p>
            </div>
          </div>
        </div>
            }        
  </div>
  )
}


export default StockAnalytic