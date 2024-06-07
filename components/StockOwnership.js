import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient';
import PieChart from './PieChart';
import { Pie } from 'react-chartjs-2';
import { Legend } from 'chart.js';

const StockOwnership = ({ stock }) => {
  const [data, setData] = useState([]);
  const [mfdata, setMFData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      console.log('ticker', stock)
        const { data: institutional_data, error } = await supabase
            .from('institutional_ownership')
            .select('*')
            .eq('ticker', stock.ticker.toString());

        const { data: mf_data, errortwo } = await supabase
          .from('mf_ownership')
          .select('*')
          .eq('ticker', stock.ticker.toString());

        if (error) {
            console.error('Error fetching data:', error);
            return;
        }

        if (errortwo) {
          console.error('Error fetching data:', errortwo);
          return;
      }

        if (institutional_data) {
            setData(institutional_data);
            console.log('Got some')
            console.log(institutional_data)
        }
        if (mf_data) {
          setMFData(mf_data);
          console.log('Got some')
          console.log(mf_data)
      }
    };

    fetchData();
}, []);

const preparePieChartData = (data) => {
  const labels = data.map(item => item.holder);
  const percentages = data.map(item => item.pctheld);
  return {
    labels: labels,
    datasets: [
      {
        data: percentages,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderWidth: 1,
      Legend: null
      }
    ],
    Legend: false
  };
};

const preparePieChartData2 = (mfdata) => {
  const labels = mfdata.map(item => item.holder);
  const percentages = mfdata.map(item => item.pctheld);
  return {
    labels: labels,
    datasets: [
      {
        data: percentages,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderWidth: 1,
      Legend: null
      }
    ],
    Legend: false
  };
};



  return (
    <div className='main-ownership-container'>
      <div className='pie-chart-container'>
        <div>
        <h2>Institutional Ownership</h2>

      <Pie data={preparePieChartData(data)}  options={{
    plugins: {
      legend: {
        display: false
      }
    }
  }}   />
  </div>
  <div>
    <h2>Mututal Fund Ownership</h2>
      <Pie data={preparePieChartData2(mfdata)} options={{
    plugins: {
      legend: {
        display: false
      }
    }
  }}   />
</div>
      </div>
      <div className='ownership-tables-container'>
        <div className='ownership-table'>
    <h3 className='institutional-ownership-header'>Top Institutional Owners</h3>
    <table className='institutional-ownership-table'>
      <thead>
        <tr>
        <th>Holder</th>
        <th>Shares</th>
        {/* <th>Date Reported</th> */}
        <th>% Out</th>
        <th>Value</th>
        </tr>
      </thead>
      <tbody>
      
        {data.map((item, index) => (
          <tr className='h' key={index}>
            <td>{item.holder}</td>
            <td>{item.shares}</td>
            {/* <td>{item.date_reported}</td> */}
            <td>{item.pctheld}</td>
            <td>{item.value}</td>

            </tr>
        ))}
      </tbody>
    </table>
    </div>
    <div className='ownership-table'>
    <h3 className='institutional-ownership-header'>Top Mutual Fund Owners</h3>

    <table className='mf-ownership-table'>
      <thead>
        <tr>
        <th>Holder</th>
        <th>Shares</th>
        {/* <th>Date Reported</th> */}
        <th>% Out</th>
        <th>Value</th>
        </tr>
      </thead>
      <tbody>
      {mfdata.map((item, index) => (
          <tr className='h' key={index}>
            <td>{item.holder}</td>
            <td>{item.shares.toLocaleString()}</td>
            {/* <td>{item.date_reported}</td> */}
            <td>{item.pctheld}</td>
            <td>{item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>

            </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
  </div>
  )
}

export default StockOwnership



      {/* {data && data.mutual_fund_holders.map((item, index) => (
            <tr key={index}>
            <td>{item.holder}</td>
            <td>{item.shares}</td>
            <td>{item.date_reported}</td>
            <td>{item.perc_out}</td>
            <td>{item.value}</td>
            </tr>
    ))} */}
          {/* {data && data.top_institutional_holders.map((item, index) => (
            <tr key={index}>
            <td>{item.holder}</td>
            <td>{item.shares}</td>
            <td>{item.date_reported}</td>
            <td>{item.perc_out}</td>
            <td>{item.value}</td>
            </tr>
    ))} */}