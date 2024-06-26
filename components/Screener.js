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
import { BsDot } from 'react-icons/bs';

const Screener = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [topStocks, setTopStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Adjust as needed
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
        .order('market_cap', { ascending: false });
        fetchedData = data;
        error = fetchError;

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
 const currentItems = topStocks.slice(indexOfFirstItem, indexOfLastItem);

 // Change page
 const paginate = (pageNumber) => setCurrentPage(pageNumber);
 const totalItems = topStocks.length;
 const totalPages = Math.ceil(totalItems / itemsPerPage);

 console.log('Current Page: ', currentPage)

 // Calculate which page numbers to display (e.g., 1-10)
 const startPage = Math.max(1, currentPage - 5); // Adjust if currentPage is close to the start
 const endPage = Math.min(totalPages, startPage + 9);

  return (
    <div className='screener-container'>
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
                  </tr>
              ) : pathname == '/bonds' ? (
                <tr>

                <th>Country</th>
                <th></th>
                <th>Name</th>
                <th>Coupon</th>
                <th>Yield</th>
                <th>Maturity Date</th>
                </tr>

              ):(
                <tr>

                <th>Ticker</th>
                <th></th>
                <th>Name</th>
                <th>Volume</th>
                <th>Total Assets</th>
                <th>Category</th>
                <th>Fund Family</th>
                </tr>

              )}
            </thead>
            <tbody>
        {currentItems.map((stock) => (

            <tr key={stock.ticker} href={`/stock/${stock.ticker}`} className='screener-row'>
                  {pathname === '/stocks' ? (
                    <>
                      <td>
                        <img
                          src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/ticker_images/${stock.ticker}.png`}
                          className='screener-img'
                          width={20}
                        ></img>
                      </td>
                      <td>
                        <Link className='screener-row' href={`/stock/${stock.ticker}`}>
                          <li className=''>{stock.ticker}</li>
                        </Link>
                      </td>
                      <td>
                        <li className='top-stock-li'>{stock.title}</li>
                      </td>
                      <td>
                        <li className='top-stock-li'>{stock.sector}</li>
                      </td>
                      <td>
                        <li className='top-stock-li'>{stock.industry}</li>
                      </td>
                      <td>
                        <li className='top-stock-li'>{stock.market_cap ? stock.market_cap.toLocaleString() : 'NA'}</li>
                      </td>
                      <td>
                        <li className='top-stock-li'>{stock.exchange ? stock.exchange : 'NA'}</li>
                      </td>
                    </>
                  ) : pathname == '/bonds' ? (
                    <>
                      <td>
                        <img src='/america.jpeg' className='screener-img' width={20}></img>
                      </td>
                      <td>
                        {/* <img src='/america.jpeg' className='screener-img' width={20}></img> */}
                      </td>
                      <td>
                        <li className='top-stock-li'>{stock.title}</li>
                      </td>
                      <td>
                        <li className='top-stock-li'>{stock.coupon}</li>
                      </td>
                      <td>
                        <li className='top-stock-li'>{stock.yield}</li>
                      </td>
                      <td>
                        <li className='top-stock-li'>{stock.maturitydate}</li>
                      </td>
                    </>
                  ):(
                    <>
                      <td>
                        <img
                          src={`https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/public/ticker_images/${stock.ticker}.png`}
                          className='screener-img'
                          width={20}
                        ></img>
                      </td>
                    <td>
                      <li className='top-stock-li'>{stock.ticker}</li>
                    </td>
                    <td>
                      <li className='top-stock-li'>{stock.title}</li>
                    </td>
                    <td>
                      <li className='top-stock-li'>{stock.volume}</li>
                    </td> 
                    <td>
                      <li className='top-stock-li'>{stock.totalassets}</li>
                    </td>
                    <td>
                      <li className='top-stock-li'>{stock.category}</li>
                    </td>
                    <td>
                      <li className='top-stock-li'>{stock.fundfamily}</li>
                    </td>
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