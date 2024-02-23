import React from 'react'
import SentimentGauge from './SentimentGauge'

const StockSentiment = () => {
  const sentimentValue = 0.5;
  return (
    <div className='stock-sentiment-container'>
      {/* <h6>Sentiment Score</h6> */}
        {/* <SentimentGauge sentiment={sentimentValue} /> */}

      <div className='sentiment-grid-container'>
          <div className='sentiment-grid-item'>
            <div className='glass'><p>Digital Market News Is Reserved for Premium Members</p></div>
            <img src='/news-logo.png' className='sentiment-header-img'></img>
            <h2 className='sentiment-grid-item-header'>News</h2>
            <div className='sentiment-grid-item-div glass-effect'>
              <div className='sentiment-grid-flexer'>
                <h2 className='sentiment-grid-item-div-header'>SOURCE</h2>
                <p className='sentiment-grid-item-time'>1 hr ago</p>
              </div>
              <p className='sentiment-grid-item-content sentiment-news-content'>Best Dow Jones Stocks To Buy And Watch In August 2023: Caterpillar Surges On Earnings</p>
            </div>
            <div className='sentiment-grid-item-div glass-effect'>
              <div className='sentiment-grid-flexer'>
                <h2 className='sentiment-grid-item-div-header'>SOURCE</h2>
                <p className='sentiment-grid-item-time'>1 hr ago</p>
              </div>
              <p className='sentiment-grid-item-content sentiment-news-content'>Best Dow Jones Stocks To Buy And Watch In August 2023: Caterpillar Surges On Earnings</p>
            </div>
            <div className='sentiment-grid-item-div glass-effect'>
              <div className='sentiment-grid-flexer'>
                <h2 className='sentiment-grid-item-div-header'>SOURCE</h2>
                <p className='sentiment-grid-item-time'>1 hr ago</p>
              </div>
              <p className='sentiment-grid-item-content sentiment-news-content'>Best Dow Jones Stocks To Buy And Watch In August 2023: Caterpillar Surges On Earnings</p>
            </div>
        
          </div>
        <div className='sentiment-grid-item'>
        <div className='glass'><p>Digital Market News Is Reserved for Premium Members</p></div>
          <img src='/x-logo.png' className='sentiment-header-img'></img>
          <h2 className='sentiment-grid-item-header'>X</h2>
          <div className='sentiment-grid-item-div glass-effect'>
          <p className='sentiment-grid-item-time'>2 hrs ago</p>
            <div className='sentiment-grid-flexer'>
                <img src='/x-logo.png' className='sentiment-grid-item-img grid-item-img-white'></img>
                <p className='sentiment-grid-item-content'>Best Dow Jones Stocks To Buy And Watch In August 2023: Caterpillar Surges On Earnings #AAPL</p>
            </div>
          </div>
          <div className='sentiment-grid-item-div glass-effect'>
          <p className='sentiment-grid-item-time'>2 hrs ago</p>
            <div className='sentiment-grid-flexer'>
                <img src='/x-logo.png' className='sentiment-grid-item-img grid-item-img-white'></img>
                <p className='sentiment-grid-item-content'>Best Dow Jones Stocks To Buy And Watch In August 2023: Caterpillar Surges On Earnings #AAPL</p>
            </div>
          </div>
          <div className='sentiment-grid-item-div glass-effect'>
          <p className='sentiment-grid-item-time'>2 hrs ago</p>
            <div className='sentiment-grid-flexer'>
                <img src='/x-logo.png' className='sentiment-grid-item-img grid-item-img-white'></img>
                <p className='sentiment-grid-item-content'>Best Dow Jones Stocks To Buy And Watch In August 2023: Caterpillar Surges On Earnings #AAPL</p>
            </div>
          </div>
        </div>  
        <div className='sentiment-grid-item'>
        <div className='glass'><p>Digital Market News Is Reserved for Premium Members</p></div>

          <img src='/reddit-logo.png' className='sentiment-header-img'></img>
          <h2 className='sentiment-grid-item-header'>Reddit</h2>
          <div className='sentiment-grid-item-div glass-effect'>
          <p className='sentiment-grid-item-time'>2 days ago</p>
          <div className='sentiment-grid-flexer'>
            <img src='/reddit-logo.png' className='sentiment-grid-item-img'></img>
            <p className='sentiment-grid-item-content'>Best Dow Jones Stocks To Buy And Watch In August 2023: Caterpillar Surges On Earnings #AAPL</p>
          </div>
          </div>
          <div className='sentiment-grid-item-div glass-effect'>
          <p className='sentiment-grid-item-time'>2 days ago</p>
          <div className='sentiment-grid-flexer'>
            <img src='/reddit-logo.png' className='sentiment-grid-item-img'></img>
            <p className='sentiment-grid-item-content'>Best Dow Jones Stocks To Buy And Watch In August 2023: Caterpillar Surges On Earnings #AAPL</p>
          </div>
          </div>
          <div className='sentiment-grid-item-div glass-effect'>
          <p className='sentiment-grid-item-time'>2 days ago</p>
          <div className='sentiment-grid-flexer'>
            <img src='/reddit-logo.png' className='sentiment-grid-item-img'></img>
            <p className='sentiment-grid-item-content'>Best Dow Jones Stocks To Buy And Watch In August 2023: Caterpillar Surges On Earnings #AAPL</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockSentiment

