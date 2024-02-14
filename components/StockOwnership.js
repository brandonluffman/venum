import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient';

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


  return (
    <div>
    {/* <PieChart dataa={data}/> */}
    <h3 className='institutional-ownership-header'>Top Institutional Owners</h3>
    <table className='institutional-ownership-table'>
      <thead>
        <tr>
        <th>Holder</th>
        <th>Shares</th>
        <th>Date Reported</th>
        <th>% Out</th>
        <th>Value</th>
        </tr>
      </thead>
      <tbody>
      
        {data.map((item, index) => (
          <tr className='h' key={index}>
            <td>{item.holder}</td>
            <td>{item.shares}</td>
            <td>{item.date_reported}</td>
            <td>{item.pctheld}</td>
            <td>{item.value}</td>

            </tr>
        ))}
            {/* <td>---</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
      </tr> */}
      </tbody>
    </table>
    <h3 className='institutional-ownership-header'>Top Mutual Fund Owners</h3>

    <table className='mf-ownership-table'>
      <thead>
        <tr>
        <th>Holder</th>
        <th>Shares</th>
        <th>Date Reported</th>
        <th>% Out</th>
        <th>Value</th>
        </tr>
      </thead>
      <tbody>
      {mfdata.map((item, index) => (
          <tr className='h' key={index}>
            <td>{item.holder}</td>
            <td>{item.shares}</td>
            <td>{item.date_reported}</td>
            <td>{item.pctheld}</td>
            <td>{item.value}</td>

            </tr>
        ))}
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
      </tbody>
    </table>
  </div>
  )
}

export default StockOwnership