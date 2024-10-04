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