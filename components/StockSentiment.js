import React from 'react'

const StockSentiment = () => {
  return (
    <div className='stock-sentiment-container'>
      <div className='sentiment-grid-container'>
        <div className='sentiment-grid-item'>
          <h2 className='sentiment-grid-item-header'>News</h2>
          <div className='sentiment-grid-item-div'>
          <p className='sentiment-grid-item-time'>2 hrs ago</p>
          <h2 className='sentiment-grid-item-div-header'>SOURCE</h2>
          <p className='sentiment-grid-item-content sentiment-news-content'>Best Dow Jones Stocks To Buy And Watch In August 2023: Caterpillar Surges On Earnings</p>
          </div>
        </div>
        <div className='sentiment-grid-item'>
          <h2 className='sentiment-grid-item-header'>X</h2>
          <div className='sentiment-grid-item-div'>
          <p className='sentiment-grid-item-time'>2 hrs ago</p>

          <div className='sentiment-grid-flexer'>
                <img src='/gpt.png' className='sentiment-grid-item-img'></img>

                {/* <h2 className='sentiment-grid-item-div-header'>TITLE</h2> */}
                <p className='sentiment-grid-item-content'>Best Dow Jones Stocks To Buy And Watch In August 2023: Caterpillar Surges On Earnings #AAPL</p>
            </div>
          </div>
        </div>  
        <div className='sentiment-grid-item'>
          <h2 className='sentiment-grid-item-header'>Reddit</h2>
          <div className='sentiment-grid-item-div'>
          <p className='sentiment-grid-item-time'>2 hrs ago</p>

          <div className='sentiment-grid-flexer'>
            <img src='/gpt.png' className='sentiment-grid-item-img'></img>
                {/* <h2 className='sentiment-grid-item-div-header'>TITLE</h2> */}
                <p className='sentiment-grid-item-content'>Best Dow Jones Stocks To Buy And Watch In August 2023: Caterpillar Surges On Earnings #AAPL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockSentiment

