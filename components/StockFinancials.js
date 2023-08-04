import React from 'react'

const StockFinancials = () => {

  const status = 0;

  const numberOfColumns = 10;

  // Create an array with 10 '---' values
  const data = Array.from({ length: numberOfColumns }, (_, index) => '---');

  return (
    <div>
      {/* Stock Financials Coming Soon */}
      <div>
      {/* <StockChart data={data} /> */}
      
      <table className='stock-financials-table'>
        <thead>
          <tr>
            <th></th>
            <th>2013</th>
            <th>2014</th>
            <th>2015</th>
            <th>2016</th>
            <th>2017</th>
            <th>2018</th>
            <th>2019</th>
            <th>2020</th>
            <th>2021</th>
            <th>2022</th>
          </tr>
        </thead>
        <tbody>
          <tr className='stock-financial-side-header-row'>
            <th className='stock-financial-side-header'>Income Statement</th>
            {data.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
          <tr>
            <th>Revenue</th>
            {data.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
          <tr>
            <th>COGS</th>
            {data.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
          <tr>
            <th>Gross Profit</th>
            {data.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
          <tr>
            <th>Gross Profit Ratio</th>
            {data.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
          <tr>
            <th>Operating Expenses</th>
            {data.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
          <tr>
            <th>R&D Expenses</th>
          </tr>
          <tr>
            <th>Selling, G&A Exp.</th>
          </tr>
          <tr>
            <th>General and Admin. Exp</th>
          </tr>
          <tr>
            <th>Selling and Marketing Exp.</th>
          </tr>
          <tr>
            <th>Other Expenses</th>
          </tr>
          <tr>
            <th>COGS and Expenses</th>
          </tr>
          <tr>
            <th>Interest Income</th>
          </tr>
          <tr>
            <th>Interest Expense</th>
          </tr>
          <tr>
            <th>Depreciation and Amortization</th>
          </tr>
          <tr>
            <th>EBITDA</th>
          </tr>
          <tr>
            <th>EBITDA Ratio</th>
          </tr>
          <tr>
            <th>Operating Income</th>
          </tr>
          <tr>
            <th>Operating Income Ratio</th>
          </tr>
          <tr>
            <th>Total Other Income Exp.(Gains)</th>
          </tr>
          <tr>
            <th>Income Before Tax</th>
          </tr>
          <tr><th>Income Before Tax ratio</th></tr>
          <tr><th>Income Tax Expense (Gain)</th></tr>
          <tr><th>Net Income</th></tr>
          <tr><th>Net Income Ratio</th></tr>
          <tr><th>EPS</th></tr>
          <tr><th>EPS Diluted</th></tr>
          <tr><th>Weighted Avg. Shares Outs.</th></tr>
          <tr><th>Weighted Avg. Shares Outs. Dil.</th></tr>
          <tr><th>SEC Link</th></tr>
          <tr className='stock-financial-side-header-row'><th className='stock-financial-side-header'>Balance Sheet</th></tr>
          <tr><th>Cash and Cash Equivalents</th></tr>
          <tr><th>Short-Term Investments</th></tr>
          <tr><th>Cash & Short-Term Investments</th></tr>
          <tr><th>Net Receivables</th></tr>
          <tr><th>Inventory</th></tr>
          <tr><th>Other Current Assets</th></tr>
          <tr><th>Total Current Assets</th></tr>
          <tr><th>PP&E</th></tr>
          <tr><th>Goodwill</th></tr>
          <tr><th>Intangible Assets</th></tr>
          <tr><th>Goodwill and Intangible Assets</th></tr>
          <tr><th>Investments</th></tr>
          <tr><th>Tax Assets</th></tr>
          <tr><th>Other Non-Current Assets</th></tr>
          <tr><th>Total Non-Current Assets</th></tr>
          <tr><th>Other Assets</th></tr>
          <tr><th>Total Assets</th></tr>
          <tr><th>Accounts Payable</th></tr>
          <tr><th>Short-Term Debt</th></tr>
          <tr><th>Tax Payable</th></tr>
          <tr><th>Deferred Revenue</th></tr>
          <tr><th>Other Current Liabilities</th></tr>
          <tr><th>Total Current Liabilities</th></tr>
          <tr><th>Long-Term Debt</th></tr>
          <tr><th>Deferred Revenue</th></tr>
          <tr><th>Deferred Tax Liabilities</th></tr>
          <tr><th>Other Non-Current Liabilities</th></tr>
          <tr><th>Total Non-Current Liabilities</th></tr>
          <tr><th>Other Liabilities</th></tr>
          <tr><th>Capital Lease Obligations</th></tr>
          <tr><th>Total Liabilities</th></tr>
          <tr><th>Preferred Stock</th></tr>
          <tr><th>Common Stock</th></tr>
          <tr><th>Retained Earnings</th></tr>
          <tr><th>Other Compreh. Income(Loss)</th></tr>
          <tr><th>Other Total Stockhold. Equity</th></tr>
          <tr><th>Total Stockholders Equity</th></tr>
          <tr><th>Total Liab.&Stockhold. Equity</th></tr>
          <tr><th>Minority Interest</th></tr>
          <tr><th>Total Liabilities & Equity</th></tr>
          <tr><th>SEC Link</th></tr>
          <tr className='stock-financial-side-header-row'><th className='stock-financial-side-header'>Cash Flow Statement</th></tr>
          <tr><th>Net Income</th></tr>
          <tr><th>Depreciation and Amortization</th></tr>
          <tr><th>Deferred Income Tax</th></tr>
          <tr><th>Stock Based Compensation</th></tr>
          <tr><th>Change in Working Capital</th></tr>
          <tr><th>Accounts Receivable</th></tr>
          <tr><th>Inventory</th></tr>
          <tr><th>Accounts Payable</th></tr>
          <tr><th>Other Working Capital</th></tr>
          <tr><th>Other Non-Cash Items</th></tr>
          <tr><th>Cash Provided by Operating Activities</th></tr>
          <tr><th>CAPEX</th></tr>
          <tr><th>Acquisitions Net</th></tr>
          <tr><th>Purchases of Investments</th></tr>
          <tr><th>Sales/Maturities of Investments</th></tr>
          <tr><th>Other Investing Activities</th></tr>
          <tr><th>Cash Used for Investing Activities</th></tr>
          <tr><th>Debt Repayment</th></tr>
          <tr><th>Common Stock Issued</th></tr>
          <tr><th>Common Stock Repurchased</th></tr>
          <tr><th>Dividends Paid</th></tr>
          <tr><th>Other Financing Activities</th></tr>
          <tr><th>Cash Used/Provided by Financing Activities</th></tr>
          <tr><th>Effect of Forex Changes on Cash</th></tr>
          <tr><th>Net Change In Cash</th></tr>
          <tr><th>Cash at the End of Period</th></tr>
          <tr><th>Cash at the Beginning of Period</th></tr>
          <tr><th>Free Cash Flow</th></tr>
          <tr><th>SEC Link</th></tr>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default StockFinancials