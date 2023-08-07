import React from 'react'

const StockOwnership = () => {
  const holders = {
    holder: 'Vanguard',
    shares: '15,985,879',
  }
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
      <tr>
            <td>---</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
      </tr>
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
      <tr>
            <td>---</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
      </tr>
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