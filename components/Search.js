import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loading from './Loading';
import { supabase } from '../utils/supabaseClient';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [topStocks, setTopStocks] = useState([]);
  const exchangeDefault = 'NA'
  useEffect(() => {
    const fetchTopStocks = async () => {
      const { data: fetchedData, error } = await supabase
            .from('company_info')
            .select('*')
            .eq('exchange', 'NMS')
            .order('market_cap', { ascending: true })
            .limit(10);

        if (error) {
            console.error('Error fetching stocks for screener:', error);
            return;
        }

        setTopStocks(fetchedData);
    };
  
    fetchTopStocks();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
  
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
  
    if (!value) {
      setResults([]); // Clear the results when the input is empty
      return;
    }
  
    setTypingTimeout(
      setTimeout(async () => {
        try {
          const response = await axios.get(`/api/search?q=${value}`);
          // console.log(response.data)
          setResults(response.data);
        } catch (error) {
          // console.error('Error fetching search results:', error);
          setResults([]);
        }
      }, 200) // Delay of 0.5 seconds (500 milliseconds)
    );
  };
  

  return (
    <div>
      {isLoading && <Loading />}

      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search stock symbols..."
        className='search-input'
      />
      <div className='autosuggest-container'>
        {results.map((result) => (
          <div key={result.ticker}>
          <Link className='autosuggest-link' href={`/stock/${result.ticker}`}>
          <ul className='autosuggest-menu' onClick={() => setIsLoading(true)}>
            <li className='autosuggest-li'>{result.ticker}</li>
            <li className='autosuggest-li'>&#x2022;</li>
            <li className='autosuggest-li'>{result.title}</li>
            <div className='autosuggest-li-flexer'>
            <li className='autosuggest-li'>{result.exchange}</li>
            {/* <li className='autosuggest-li'>{result.Country}</li> */}
            {result.country == 'United States' ? 
            (
              <li className='autosuggest-li'><img className='country-img' src='/america.jpeg' width='25'></img></li>
            )
            :(
              <li className='autosuggest-li'><img className='country-img' src='/flagquestion.png' width='25'></img></li>
            )}
            </div>
            </ul>
            </Link>
            </div>
        ))}
      </div>
      <div className='top-stocks-container'>
  <h2 className='top-stocks-title'>Top Stocks</h2>
  {topStocks.map((stock) => (
    <div key={stock.ticker}>
      <Link className='top-stock-link' href={`/stock/${stock.ticker}`}>
        <ul className='top-stock-menu'>
          <li className='top-stock-li'>{stock.ticker}</li>
          {/* <li className='top-stock-li'>&#x2022;</li> */}
          <li className='top-stock-li'>{stock.title}</li>
          <li className='top-stock-li'>{stock.exchange ? stock.exchange: exchangeDefault}</li>
        </ul>
      </Link>
    </div>
  ))}
</div>
    </div>
  );
};

export default Search;