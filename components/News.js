
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Loading from './Loading';
import { RxReload } from 'react-icons/rx';

export default function News() {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true)


    const fetchArticles = async () => {
        setLoading(true); // Set loading to true when fetching
        try {
            const res = await fetch('/api/rss'); // Adjust the endpoint as needed
            const data = await res.json();
            setArticles(data);
        } catch (error) {
            console.error('Failed to fetch articles', error);
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    // Fetch articles when component mounts
    useEffect(() => {
        fetchArticles();
    }, []);

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className='news-flex'>
      <h1>Latest Articles</h1>
      <button onClick={fetchArticles} className='reload-button'><RxReload /></button>
      </div>
      <input
          type="text"
          placeholder="Search titles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-input'
        />
                
   {loading ? (
          <Loading />
        ) : (
          <div className='news-grid'>
            {filteredArticles.map((article, index) => (
              <div className='news-grid-item' key={index}>
                <Link rel="noreferrer" target="_blank" href={article.link}><h3>{article.title}</h3></Link>
                <div className='news-p'>
                  <p className='news-company'>{article.company}</p>
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
