import React from 'react'
import PriceChart from './PriceChart'
import PortfolioChart from './PortfolioChart'
import {AiFillEye, AiFillEyeInvisible, AiFillMail} from 'react-icons/ai'
import { BsArrowUpCircleFill } from 'react-icons/bs'

const AccountPage = () => {
  return (
    <div className='account-container'>
        <div>
        <h6>Portfolio</h6>
        <h2>Hello, Brandon</h2>
        {/* <div className="portfolio-grid-item net-worth">
          <h4>Net Worth</h4>
          <h2>$10,250,368.98</h2>
        </div> */}
        <div className='portfolio-grid'>
          <div className='portfolio-grid-item'>
            <h4>Income</h4>
            <h2>$200,566</h2>
            <BsArrowUpCircleFill  className='portfolio-absolute-arrow' />

          </div>
          <div className='portfolio-grid-item'>
            <h4>Expenses</h4>
            <h2>($30,821)</h2>
            <BsArrowUpCircleFill  className='portfolio-absolute-arrow'/>

          </div>
          <div className='portfolio-grid-item'>
            <h4>Credit Score</h4>
            <h2>845</h2>
            <BsArrowUpCircleFill  className='portfolio-absolute-arrow'/>

          </div>
          <div className='portfolio-grid-item'>
            <h4>Total Debt</h4>
            <h2>$501,397</h2>
            <BsArrowUpCircleFill  className='portfolio-absolute-arrow'/>
          </div>
        </div>
        <PortfolioChart />
        <div className='account-box-container'>

        <div className='account-grid-box'>
          <h2>Upcoming Payments</h2>
          <div className='payments-grid'>
            <div>
              
            </div>
          </div>
        </div>
        <div className='account-grid-box'>
          <h2>Latest Expenses</h2>
          <div className='payments-grid'>

          </div>
        </div>
        <div className='account-grid-box'>
          <h2>Future Purchase Goals</h2>
          <div className='payments-grid'>

          </div>
        </div>
        <div className='account-grid-box'>
          <h2>Spending History</h2>
          <div className='payments-grid'>

          </div>
        </div>
        <div className='account-grid-box'>
          <h2>List of Assets</h2>
          <div className='payments-grid'>

          </div>
        </div>
        </div>




        </div>
    
    </div>
  )
}

export default AccountPage