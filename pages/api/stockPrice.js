// pages/api/stockPrice.js

// import yfinance from 'yfinance';
import yahooFinance from 'yahoo-finance2';

export default async function handler(req, res) {
    try {
        const { ticker } = req.query;

        if (!ticker) {
        return res.status(400).json({ error: 'Ticker symbol is required' });
        }
        const yahooFinance = require('yahoo-finance2').default;
        
        // Fetch stock data
        const results = await yahooFinance.search(ticker);
        const quote = await yahooFinance.quote(ticker);
        const { regularMarketPrice: price, currency } = quote;

        // Send response with fetched data
        console.log('Price', price)
        res.status(200).json({ price });
    } catch (error) {
        console.error('Error fetching stock data:', error);
        // Send error response
        res.status(500).json({ error: 'Internal server error' });
    }
}




//   try {
//     const { ticker } = req.query;

//     if (!ticker) {
//       return res.status(400).json({ error: 'Ticker symbol is required' });
//     }

//     const tickerData = yfinance.Ticker(ticker);
//     const data = await tickerData.history({ period: '1d' }); // Change the period as needed

//     // Assuming you want the closing price
//     const closingPrice = data[data.length - 1].Close;

//     res.status(200).json({ ticker, closingPrice });
//   } catch (error) {
//     console.error('Error fetching stock price:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }