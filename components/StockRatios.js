import React from 'react'
import RatioChart from './RatioChart'

const StockRatios = () => {
  const ratios = [
    { label: 'PE', value: '28.1' },
    { label: 'Forward PE', value: '27.7' },
    { label: 'YOY Growth', value: '-0.47' },
    { label: 'Margin', value: '45.8' },
    { label: 'EPS Growth', value: '6.43' },
    { label: 'Revenue', value: '383B' },
    { label: 'Revenue Growth', value: '2.1%' },
    { label: 'EBITDA', value: '130.1B' },
    { label: 'D/E', value: '47.2%' },
    { label: 'ROE', value: '156.1%' },
  ];

  return (
    <div className='stock-ratios-container'>
      <h2>** This data is not accurate. This page is currently in development.</h2>
      <div className='stock-analytics-grid'>
        {ratios.map((ratio, index) => (
          <div key={index} className='stock-analytics-item'>
            {/* <div className='glass'><p className='ratio-glass-p'>Stock Ratios are Reserved for Premium Members</p></div> */}
            <h3 className='stock-analytics-label'>{ratio.label}</h3>
            <h6 className='stock-analytics-number'>{ratio.value}</h6>
            <RatioChart />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockRatios;