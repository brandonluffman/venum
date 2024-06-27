import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Head from 'next/head';
import SimilaritySearch from '../components/SimilaritySearch';
import axios from 'axios';
import Loading from './Loading';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';
import { BsCaretDown, BsCaretDownFill, BsDot } from 'react-icons/bs';
import { RxLockClosed } from 'react-icons/rx';

const Screener = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [topStocks, setTopStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Adjust as needed
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const fetchSpecificStocks = async () => {
      let fetchedData;
      let error;

      console.log('Pathname: ', pathname);

      if (pathname === '/stocks') {
        const { data, error: fetchError } = await supabase
        .from('company_info')
        .select('*')
        .not('market_cap', 'is', null)
        .order('market_cap', { ascending: false })
        .limit(200);
        fetchedData = data;
        error = fetchError;
        const uniqueCountries = [...new Set(fetchedData.map(stock => stock.country))];
        console.log('Countries', uniqueCountries)
        setCountries(uniqueCountries);

        console.log(fetchedData)
      } else if (pathname === '/etfs') {
        const { data, error: fetchError } = await supabase
          .from('etfs')
          .select('*')
          .order('totalassets', { ascending: false });
        fetchedData = data;
        error = fetchError;
      } else if (pathname === '/bonds') {
        const { data, error: fetchError } = await supabase
        .from('bonds')
        .select('*');
      fetchedData = data;
      error = fetchError;
      const uniqueCountries = [...new Set(fetchedData.map(bond => bond.country))];
      setCountries(uniqueCountries);
      }  else if (pathname === '/forex') {
        const { data, error: fetchError } = await supabase
          .from('forex')
          .select('*');
        fetchedData = data;
        error = fetchError;
      } else if (pathname === '/futures') {
        const { data, error: fetchError } = await supabase
          .from('futures')
          .select('*');
        fetchedData = data;
        error = fetchError;
      } else if (pathname === '/indices') {
        const { data, error: fetchError } = await supabase
          .from('indices')
          .select('*');
        fetchedData = data;
        error = fetchError;
      }

      if (error) {
        console.error('Error fetching specific stocks:', error);
        return;
      }

      setTopStocks(fetchedData);
    };

    fetchSpecificStocks();
  }, [pathname]);



 // Pagination logic

 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const filteredItems = selectedCountry
   ? topStocks.filter(stock => stock.country === selectedCountry)
   : topStocks;
 const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

 // Change page
 const paginate = (pageNumber) => setCurrentPage(pageNumber);
 const totalItems = filteredItems.length;
 const totalPages = Math.ceil(totalItems / itemsPerPage);
 const startPage = Math.max(1, currentPage - 5); // Adjust if currentPage is close to the start
 const endPage = Math.min(totalPages, startPage + 9);


   // Handle country change
   const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const uniqueCountries = [...new Set(topStocks.map(stock => stock.country))];

  const calculateTimeToMaturity = (maturityDateString) => {
    const maturityDate = new Date(maturityDateString);
    const currentDate = new Date();
    const timeDifference = maturityDate.getTime() - currentDate.getTime();
    const daysToMaturity = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Calculate days difference

    return `${daysToMaturity} days`; // Adjust formatting as needed
  };


  async function checkImageExists(url) {
    try {
      const response = await fetch(url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
  
  async function findImageURL(basePath, country) {
    const extensions = ['png', 'jpg', 'jpeg', 'gif'];
    const countryFormatted = country.toLowerCase().replace(' ', '_');
    for (let ext of extensions) {
      const url = `${basePath}${countryFormatted}.${ext}`;
      const exists = await checkImageExists(url);
      if (exists) {
        return url;
      }
    }
    return null;
  }


  return (
    <div className='screener-container'>
      <div className='radio-buttons-container'>
              <div className='radio-buttons'>
              <h3>{selectedCountry ? <div><img src={`/countries/${selectedCountry.toLowerCase().replace(' ', "_")}.png`} width='20' /> {selectedCountry}<BsCaretDownFill /></div> : <div>Select a country <BsCaretDownFill /></div>}</h3>
                <div className='radio-drop'>
                  {countries.length > 0 && countries.map((country, index) => (

                    <div key={index} className='country-dropdown'>
                      <img src={`/countries/${country.toLowerCase().replace(' ', "_")}.png`} width='20' />
                      <input
                        type="radio"
                        id={`country-${index}`}
                        name="country"
                        value={country}
                        checked={selectedCountry === country}
                        onChange={handleCountryChange}
                      />
                      <label htmlFor={`country-${index}`}>{country}</label>
                    </div>
                  ))}
                  </div>
                </div>
                  {pathname == '/bonds' && 
                <div className='radio-buttons'>
                  <h3>Select type <BsCaretDownFill /></h3>
                  <div className='radio-drop'>
                    <div className='country-dropdown'>
                      <input
                        type="radio"
                        id={`Government`}
                        name="Government"
                        // value={country}
                        // checked={selectedCountry === country}
                        // onChange={handleCountryChange}
                      />
                      <label htmlFor={`Government`}>Government</label>
                    </div>
                    <div className='country-dropdown'>
                      <input
                        type="radio"
                        id={`Corporate`}
                        name="Corporate"
                        // value={country}
                        // checked={selectedCountry === country}
                        // onChange={handleCountryChange}
                      />
                      <label htmlFor={`Corporate`}><RxLockClosed /> Corporate</label>
                    </div>
                  </div>
                </div>
                  }
                </div>
      
            <ul className='pagination'>
                  {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
                    <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active-pag' : ''}`}>
                      <button onClick={() => paginate(pageNumber)} className='page-link'>
                        {pageNumber}
                      </button>
                    </li>
                  ))}
            </ul>



          <table className='screener-table'>
            <thead>
                {pathname === '/stocks' ? (
                <tr>

                <th>Ticker</th>
                <th></th>
                <th>Name</th>
                <th>Sector</th>
                <th>Industry</th>
                <th>Market Cap</th>
                <th>Exchange</th>
                <th>Country</th>

                  </tr>
              ) : pathname == '/bonds' ? (
                <tr>

                <th>Country</th>
                <th>Ticker</th>
                <th>Name</th>
                <th>Coupon</th>
                <th>Yield</th>
                <th>Maturity Date</th>
                <th>Time To Maturity</th>

                </tr>

              ): pathname == '/etfs' ?(
                <tr>

                <th>Ticker</th>
                <th></th>
                <th>Name</th>
                <th>Volume</th>
                <th>Total Assets</th>
                <th>Category</th>
                <th>Fund Family</th>
                </tr>

              ):(
                <tr>

                <th></th>
                <th>Ticker</th>
                <th>Name</th>
                </tr>
              )}
            </thead>
            <tbody>
        {currentItems.map((stock) => (

            <tr key={stock.ticker} href={`/stock/${stock.ticker}`} className='screener-row'>
                  {pathname === '/stocks' ? (
                    <>
                      <td><img src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/ticker_images/${stock.ticker}.png`} className='screener-img' width={30}></img></td>
                      <td><Link className='screener-row' href={`/stock/${stock.ticker}`}><li className=''>{stock.ticker}</li></Link></td>
                      <td><li className='top-stock-li'>{stock.title}</li></td>
                      <td><li className='top-stock-li'>{stock.sector}</li></td>
                      <td><li className='top-stock-li'>{stock.industry}</li></td>
                      <td><li className='top-stock-li'>{stock.market_cap ? parseInt(stock.market_cap).toLocaleString() : 'NA'}</li></td>
                      <td><li className='top-stock-li'>{stock.exchange ? stock.exchange : 'NA'}</li></td>
                      <td><li className='top-stock-li'>{stock.country && <div className='top-stock-country-div'><img src={`/countries/${stock.country.toLowerCase().replace(' ', "_")}.png`} width='30' /></div>}</li></td>

                    </>
                  ) : pathname == '/bonds' ? (
                    <>
                      <td><li className='top-stock-li'><img src={`/countries/${stock.country.toLowerCase().replace(' ', "_")}.png`} width='30' /> </li></td>
                      <td><li className='top-stock-li'>{stock.ticker}</li></td>
                      <td><li className='top-stock-li'>{stock.name}</li></td>
                      <td><li className='top-stock-li'>{stock.coupon}</li></td>
                      <td><li className='top-stock-li'>{stock.yield}</li></td>
                      <td><li className='top-stock-li'>{stock.maturitydate}</li></td>
                      <td><li className='top-stock-li'>{calculateTimeToMaturity(stock.maturitydate)}</li></td>

                    </>
                  ): pathname == '/etfs' ? (
                    <>
                    <td><img src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/etf_images/${stock.ticker}.svg`} className='screener-img' width={30}></img></td>
                    <td><li className='top-stock-li'>{stock.ticker}</li></td>
                    <td><li className='top-stock-li'>{stock.title}</li></td>
                    <td><li className='top-stock-li'>{stock.volume && parseInt(stock.volume).toLocaleString()}</li></td> 
                    <td><li className='top-stock-li'>{stock.totalassets && parseInt(stock.totalassets).toLocaleString()}</li></td>
                    <td><li className='top-stock-li'>{stock.category}</li></td>
                    <td><li className='top-stock-li'>{stock.fundfamily}</li></td>
                  </>
                  ): pathname == '/futures' ? (
                    <>
                    <td><img src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/futures_images/${stock.ticker.replace('!', '')}_.svg`} className='screener-img' width={20}></img></td>
                    <td><li className='top-stock-li'>{stock.ticker}</li></td>
                    <td><li className='top-stock-li'>{stock.name}</li></td>
                  </>
                  ):(
                    <>
                    <td><img src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/index_images/${stock.ticker.replace('!', '')}.svg`} className='screener-img' width={20}></img></td>
                    <td><li className='top-stock-li'>{stock.ticker}</li></td>
                    <td><li className='top-stock-li'>{stock.name}</li></td>
                  </>
                  )}
              </tr>

        ))}
        </tbody>
        </table>
        <ul className='pagination'>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
          <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active-pag' : ''}`}>
            <button onClick={() => paginate(pageNumber)} className='page-link'>
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Screener;