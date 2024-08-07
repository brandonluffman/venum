import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loading from './Loading';
import { supabase } from '../utils/supabaseClient';
import { BsSearch, BsX } from 'react-icons/bs';

const NavSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [topStocks, setTopStocks] = useState([]);
  const [isActive, setIsActive] = useState(false);




  useEffect(() => {
    const fetchSpecificStocks = async () => {
      const specificStocks = ['AAPL', 'AMZN', 'NVDA', 'GOOG', 'MSFT', 'TSLA', 'BRKA', 'LLY', 'JPM', "V"];
  
      const { data: fetchedData, error } = await supabase
            .from('company_info')
            .select('*')
            .in('ticker', specificStocks)
            .order('market_cap', { ascending: false });
  
      if (error) {
        console.error('Error fetching specific stocks:', error);
        return;
      }
  
      setTopStocks(fetchedData);
    };
  
    fetchSpecificStocks();
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

  const toggleSearch = () => {
    setIsActive(!isActive)
  }
  

  return (
    <div className='nav-search-div search-div'>
      {/* {isLoading && <Loading />} */}

            {isActive ? (
                <div className='nav-search-outer search-outer-container'>
                <div className='search-container'>
                <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search stock symbols..."
                className='nav-search-input search-input'
                >
                </input>

                {/* <BsSearch className='search-icon'/> */}
                <div className='autosuggest-container nav-autosuggest-container'>
                {results.map((result) => (
                    <div key={result.ticker}>
                        <Link className='autosuggest-link' href={`/stock/${result.ticker}`}>
                                <ul className='autosuggest-menu' onClick={() => setIsLoading(true)}>
                                        <div className='antiflexer autosuggest-li-flexer'>
                                            <li className='autosuggest-li auto-title'>{result.title}</li>
                                            <li className='autosuggest-li'>{result.ticker}</li>
                                        </div>
                                        {/* <div className='autosuggest-li-flexer'>
                                        <li className='autosuggest-li'>{result.exchange}</li>
                                            {result.country == 'United States' ? 
                                            (
                                                <li className='autosuggest-li'><img className='country-img' src='/america.jpeg' width='25'></img></li>
                                            )
                                            :(
                                                <li className='autosuggest-li'><img className='country-img' src='/flagquestion.png' width='25'></img></li>
                                            )}
                                        </div> */}
                                </ul>
                            </Link>
                    </div>
                ))}
                </div>
                <div className='top-stocks-container'>
                    {topStocks.map((stock) => (
                      <div key={stock.ticker}>
                        <Link className='top-stock-link' href={`/stock/${stock.ticker}`}>
                          <ul className='top-stock-menu nav-top-stock'>
                            <img src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/ticker_images/${stock.ticker}.png`} className='company-logo' width={20}></img>

                            <li className='top-stock-li'>{stock.ticker}</li>
                            {/* <li className='top-stock-li'>{stock.title}</li> */}
                            {/* <li className='top-stock-li'>{stock.exchange ? stock.exchange: exchangeDefault}</li> */}
                          </ul>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <BsX className='nav-search-icon' onClick={toggleSearch} />

                </div>
            ):(
                <BsSearch className='search-icon-relative' onClick={toggleSearch} />
            )}
    </div>
  );
};

export default NavSearch;