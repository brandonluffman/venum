import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loading from './Loading';
import { supabase } from '../utils/supabaseClient';
import { BsSearch } from 'react-icons/bs';
import LoadingSpinner from './LoadingSpinner';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [topStocks, setTopStocks] = useState([]);
  const [searchType, setSearchType] = useState('name');
  const [similarityResults, setSimilarityResults] = useState([]);
  const [responseData, setResponseData] = useState(null); // State to hold response data
  const [input, setInput] = useState("")


  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };




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


  const handleInputChange = (event) => {
    setQuery(event.target.value);
    if (searchType === 'name') {
      handleNameSearch(event.target.value);
    }
  };


  const handleNameSearch = (value) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (!value) {
      setResults([]);
      return;
    }

    setTypingTimeout(
      setTimeout(async () => {
        try {
          const response = await axios.get(`/api/search?q=${value}`);
          setResults(response.data);
        } catch (error) {
          setResults([]);
        }
      }, 200) // Delay of 0.2 seconds (200 milliseconds)
    );
  };

  const handleDescriptionSearch = async () => {
    setIsLoading(true);
    const url = 'https://summarize-332628ab34b9.herokuapp.com/items/';

    try {
      const response = await axios.post(url, { query });
      setSimilarityResults(response.data);
      const indexes = response.data.map(item => item.Index);
      const similarApiUrl = '/api/similar';
      const similarResponse = await axios.post(similarApiUrl, { indexes });
      setResponseData(similarResponse.data);
    } catch (error) {
      console.error("Error:", error);
      setSimilarityResults([]);
    }
    setIsLoading(false);
  };

  const MAX_SUMMARY_LENGTH = 100;

  const truncateString = (str, max) => {
    return str.length > max ? str.substr(0, max) + '...' : str;
  };

  // const handleSearch = async (event) => {
  //   const value = event.target.value;
  //   setQuery(value);
  
  //   if (typingTimeout) {
  //     clearTimeout(typingTimeout);
  //   }
  
  //   if (!value) {
  //     setResults([]); // Clear the results when the input is empty
  //     return;
  //   }
  //   if (searchType == 'name') {
  //         setTypingTimeout(
  //           setTimeout(async () => {
  //             try {
  //               const response = await axios.get(`/api/search?q=${value}`);
  //               setResults(response.data);
  //             } catch (error) {
  //               setResults([]);
  //             }
  //           }, 200) // Delay of 0.5 seconds (500 milliseconds)
  //         );
  //   } else {
  //       setIsLoading(true)
  //       const url = 'https://summarize-332628ab34b9.herokuapp.com/items/';

  //         try {
  //             const response = await axios.post(url, { query: value }); // Change 'item' to 'query'
  //             setSimilarityResults(response.data);
  //             const indexes = response.data.map(item => item.Index);
  //             const similarApiUrl = '/api/similar';
  //             const similarResponse = await axios.post(similarApiUrl, { indexes });
  //             setResponseData(similarResponse.data);
  //         } catch (error) {
  //           console.error("Error:", error);
  //           setSimilarityResults([]);
  //         }

  //         setIsLoading(false)
  //   }
  // };


  

  return (
    <div className='search-div'>
      {isLoading && <Loading />}

    <div className='search-outer-container'>
      {/* <div className='search-buttons-container'>
        <button>Search By Name</button>
        <button>Search By Description</button>
      </div> */}

      <div className='search-buttons-container'>
            <label className='custom-radio'>
              <input
                type="radio"
                value="name"
                checked={searchType === 'name'}
                onChange={handleSearchTypeChange}
              />
            <span>Search By Name</span>
            </label>
            <label className='custom-radio'>
              <input
                type="radio"
                value="description"
                checked={searchType === 'description'}
                onChange={handleSearchTypeChange}
              />
          <span>Search By Description</span>
          </label>
            {/* <p>Selected Search Type: {searchType}</p> */}
          </div>
      <div className='search-container'>
      <div className='search-inner-container'>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search stocks..."
            className='search-input'
          />
          {searchType === 'description' && (
            <button className='search-icon' onClick={handleDescriptionSearch}>
              <BsSearch  />
            </button>
          )}
              
                      {responseData && (
                              <ul className='similar-search-menu'>
                                  {responseData.map((result, index) => (
                                    <div className='similar-search-container' key={index}>
                                     
                                      <Link className='similar-search-link' target="_blank" rel="noreferrer" href={`/stock/${result.ticker}`}>
                                          <div className=''>
                                                        <div>
                                                              <li><img src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/ticker_images/${result.ticker.replace('-', '')}.png`} className='' width={20}></img></li>
                                                              <li >{result.ticker}</li>
                                                          </div>
                                                      <li >{result.title}</li>
                                                      {similarityResults[index] && <li>{(similarityResults[index]['Similarity Score'] * 100).toFixed(2)}%</li>}
                                          </div>
                                   
                                      <li>{truncateString(result.summary, MAX_SUMMARY_LENGTH)}</li>
                                      {/* <hr></hr> */}
                                      </Link>
                                      </div>
                                  ))}
                              </ul>
                          )}


                          {searchType == 'name' && 
                              <div className='autosuggest-container'>
                                {results.map((result) => (
                                  <div key={result.ticker}>
                                        <Link className='autosuggest-link' href={`/stock/${result.ticker}`}>
                                              <ul className='autosuggest-menu' onClick={() => setIsLoading(true)}>
                                                        <div className='autosuggest-li-container'>
                                                          <li className='autosuggest-li'><img src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/ticker_images/${result.ticker.replace('-', '')}.png`} className='screener-img' width={20}></img></li>
                                                        </div>
                                                        <div className='antiflexer autosuggest-li-flexer'>
                                                          <li className='autosuggest-li auto-title'>{result.title}</li>
                                                          <li className='autosuggest-li'>{result.ticker}</li>
                                                        </div>
                                                        <div className='autosuggest-li-flexer'>
                                                        <li className='autosuggest-li'>{result.exchange}</li>
                                                            {result.country &&
                                                            (
                                                              <li className='autosuggest-li'><img src={`/countries/${result.country.toLowerCase().replace(' ', "_")}.png`} width='20' className='country-img' /></li>
                                                            )
                                                          }
                                                        </div>
                                                </ul>
                                          </Link>
                                    </div>
                                ))}
                              </div>
                        }
        </div>

                    {/* {responseData && (
                              <ul className='similar-search-menu'>
                                  {responseData.map((result, index) => (
                                    <div className='similar-search-container' key={index}>
                                      <Link className='similar-search-link' target="_blank" rel="noreferrer" href={`/stock/${result.ticker}`}>
                                          <div className=''>
                                                        <div>
                                                              <li><img src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/ticker_images/${result.ticker}.png`} className='' width={20}></img></li>
                                                              <li >{result.ticker}</li>
                                                          </div>
                                                      <li >{result.title}</li>
                                                      {similarityResults[index] && <li>{(similarityResults[index]['Similarity Score'] * 100).toFixed(2)}%</li>}
                                          </div>
                                   
                                      <li>{truncateString(result.summary, MAX_SUMMARY_LENGTH)}</li>
                                      </Link>
                                      </div>
                                  ))}
                              </ul>
                          )}


                          {searchType == 'name' && 
                              <div className='autosuggest-container'>
                                {results.map((result) => (
                                  <div key={result.ticker}>
                                        <Link className='autosuggest-link' href={`/stock/${result.ticker}`}>
                                              <ul className='autosuggest-menu' onClick={() => setIsLoading(true)}>
                                                        <div className='autosuggest-li-container'>
                                                          <li className='autosuggest-li'><img src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/ticker_images/${result.ticker}.png`} className='screener-img' width={20}></img></li>
                                                        </div>
                                                        <div className='antiflexer autosuggest-li-flexer'>
                                                          <li className='autosuggest-li auto-title'>{result.title}</li>
                                                          <li className='autosuggest-li'>{result.ticker}</li>
                                                        </div>
                                                        <div className='autosuggest-li-flexer'>
                                                        <li className='autosuggest-li'>{result.exchange}</li>
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
                        } */}
          </div>
      </div>

        <div className='top-stocks-container'>
        {/* <h2 className='top-stocks-title'>Top Stocks</h2> */}
        {topStocks.map((stock) => (
          <div key={stock.ticker}>
            <Link className='top-stock-link' href={`/stock/${stock.ticker}`}>
              <ul className='top-stock-menu'>
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
  );
};

export default Search;