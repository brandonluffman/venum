
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Loading from './Loading';

export default function News() {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true)

    // Filter articles based on searchTerm
    const filteredArticles = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    useEffect(() => {
      // Fetch the RSS feed data from the API route
      async function fetchRSS() {
        const res = await fetch('/api/rss');
        const data = await res.json();
        setArticles(data);
        setLoading(false); // Set loading to false when done

      }
  
      fetchRSS();
    }, []);

    const formatDateTime = (date) => {
        return new Date(date).toLocaleString([], {
          month: 'short',   // E.g., "Sep"
          day: 'numeric',   // E.g., "18"
        //   year: 'numeric',  // E.g., "2024"
          hour: '2-digit',  // E.g., "09"
          minute: '2-digit',// E.g., "30"
          hour12: true      // Use AM/PM format
        });
      };

  return (
    <>
    <Navbar />
    <div className='news-container'>
      <h1>Latest Articles</h1>
      <input
          type="text"
          placeholder="Search titles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-input'
        />
   {/* Show spinner when loading */}
   {loading ? (
          <Loading />
        ) : (
          <div className='news-grid'>
            {filteredArticles.map((article, index) => (
              <div className='news-grid-item' key={index}>
                <Link href={article.link}><h3>{article.title}</h3></Link>
                <div className='news-p'>
                  <p>{article.company}</p>
                  <p>{formatDateTime(article.publishedDate)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
    <Footer />
    </>
  );
}
