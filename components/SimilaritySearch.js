import React, {useState} from 'react'
import axios from 'axios';
import Link from 'next/link';

const SimilaritySearch = () => {
    const [description, setDescription] = useState('');
    const [similarityResults, setSimilarityResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [responseData, setResponseData] = useState(null); // State to hold response data

    const handleSimilarity = async () => {
        event.preventDefault();
        setIsLoading(true)
        console.log('Submitted Button');
        const item = description; // Access input value directly from state
        console.log('Value', item);
      
        if (!item) {
          setSimilarityResults([]); // Clear the results when the input is empty
          return;
        }
        
        // const url = 'http://localhost:8000/items/';
        const url = 'https://venum.vercel.app/items/';

        try {
            const response = await axios.post(url, { query: item }); // Change 'item' to 'query'
            console.log("Response data:", response.data);
          setSimilarityResults(response.data);
          const indexes = response.data.map(item => item.Index);
            console.log('Indexes: ', indexes)
          const similarApiUrl = '/api/similar';
          const similarResponse = await axios.post(similarApiUrl, { indexes });
          console.log("Similar response data:", similarResponse.data);
            setResponseData(similarResponse.data);
        } catch (error) {
          console.error("Error:", error);
          setSimilarityResults([]);
        }
        setIsLoading(false)
      }

      const MAX_SUMMARY_LENGTH = 100; // Set your maximum length here

const truncateString = (str, max) => {
  return str.length > max ? str.substr(0, max) + '...' : str;
};


  return (
    <div className='similar-search-main-container'>
        {isLoading && <div className='loading'>Loading</div>}
        <h6 className='beta-tag'>Beta</h6>
        <h4>Find Companies by Similarity using Machine Learning</h4>
        <input
            type="text"
            value={description}
            placeholder="Search by description..."
            className='search-input'
            onChange={(e) => setDescription(e.target.value)}
        />
        <button type="button" className='similar-search-btn' onClick={handleSimilarity}>Search</button>
        <div className='similar-search-container'>
        {responseData && (
                <ul className='similar-search-menu'>
                    {responseData.map((result, index) => (
                        <Link className='similar-search-link' target="_blank" rel="noreferrer" key={index} href={`/stock/${result.ticker}`}>
                            <div>
                        <li >{result.ticker}</li>
                        <li >{result.title}</li>
                        <li>{(similarityResults[index]['Similarity Score'] * 100).toFixed(2)}%</li>
                        </div>
                        <div>
                        <li>{truncateString(result.summary, MAX_SUMMARY_LENGTH)}</li>
                        </div>
                        <hr></hr>
                        </Link>
                    ))}
                </ul>
            )}
            </div>
    </div>
  )
}

export default SimilaritySearch