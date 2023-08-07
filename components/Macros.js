import React from 'react'
// import RatioChart from './RatioChart'

const Macros = () => {
     const data = [
    {
      y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      type: 'box',
      orientation: 'h',
      name: 'Box Plot',
    },
  ];
  return (
    <div className='macro-container'>
        {/* <h1>Macros</h1> */}
        <div className='macro-grid-container'>
            <div className='macro-grid-item'>
                <h3 className='macro-grid-label'>Homes on the Market</h3>
                <h6 className='macro-grid-number'>2.3</h6>
                {/* <RatioChart /> */}
            </div>
            <div className='macro-grid-item'>
                <h3 className='macro-grid-label'>Unemployment Rate</h3>
                <h6 className='macro-grid-number'>2.3</h6>
           
            </div>
            <div className='macro-grid-item'>
                <h3 className='macro-grid-label'>Inflation</h3>
                <h6 className='macro-grid-number'>2.3</h6>
            </div>
            <div className='macro-grid-item'>
                <h3 className='macro-grid-label'>Interest Rates</h3>
                <h6 className='macro-grid-number'>2.3</h6>
            </div>
            <div className='macro-grid-item'>
                <h3 className='macro-grid-label'>Greed/Fear Index</h3>
                <h6 className='macro-grid-number'>2.3</h6>
            </div>
            <div className='macro-grid-item'>
                <h3 className='macro-grid-label'>GDP</h3>
                <h6 className='macro-grid-number'>2.3</h6>
            </div>
            <div className='macro-grid-item'>
                <h3 className='macro-grid-label'>Consumer Spending</h3>
                <h6 className='macro-grid-number'>2.3</h6>
            </div>
            <div className='macro-grid-item'>
                <h3 className='macro-grid-label'>Home Building</h3>
                <h6 className='macro-grid-number'>2.3</h6>
            </div>
            <div className='macro-grid-item'>
                <h3 className='macro-grid-label'>Construction Spending</h3>
                <h6 className='macro-grid-number'>2.3</h6>
            </div>
            <div className='macro-grid-item'>
                <h3 className='macro-grid-label'>Retail Sales</h3>
                <h6 className='macro-grid-number'>2.3</h6>
            </div>
        </div>

    </div>
  )
}

export default Macros