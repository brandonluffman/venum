import React from 'react'
import RatioChart from './RatioChart'

const StockRatios = () => {
  const data = [
    {
      y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      type: 'box',
      orientation: 'h',
      name: 'Box Plot',
    },
  ];
  return (
    <div>
    <div className='stock-analytics-grid'>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>PE</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
      <RatioChart />

    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>Forward PE</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
      <RatioChart />
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>YOY Growth</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
      <RatioChart />
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>Margin</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
      <RatioChart />
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>EPS Growth</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
      <RatioChart />
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>Revenue</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
      <RatioChart />
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>Revenue Growth</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
      <RatioChart />
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>EBITDA</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
      <RatioChart />
    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>D/E</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
      <RatioChart />

    </div>
    <div className='stock-analytics-item'>
      <h3 className='stock-analytics-label'>ROE</h3>
      <h6 className='stock-analytics-number'>2.3</h6>
      <RatioChart />

    </div>
    </div>
    </div>
  )
}

export default StockRatios