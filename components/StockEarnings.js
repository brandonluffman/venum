import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient';
import RadialGauge from './RadialGuage';
import { RxDownload } from 'react-icons/rx';

const StockEarnings = ({stock}) => {
  const [earningsCalls, setEarningsCalls] = useState([])
  const [selectedTranscriptId, setSelectedTranscriptId] = useState(null); // Track the selected transcript_id

  useEffect(() => {
    const fetchEarningsCalls = async () => {
  
      const { data: fetchedData, error } = await supabase
            .from('earnings_calls')
            .select('*')
            .eq('ticker', stock.ticker)
            ;  

      if (error) {
        console.error('Error fetching specific stocks:', error);
        return;
      }

      // console.log(fetchedData)
  
      // setEarningsCalls(fetchedData);

      const earningsByYear = fetchedData.reduce((acc, curr) => {
        // Extract year from the title using a regular expression
        const yearMatch = curr.title.match(/\b\d{4}\b/);
        const year = yearMatch ? yearMatch[0] : 'Unknown';
        
        // Add the current call to the corresponding year's array
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(curr);
        
        return acc;
      }, {});
  
      console.log(earningsByYear);
  
      setEarningsCalls(earningsByYear);
    };
  
    fetchEarningsCalls();
  }, []);

  const handleTranscriptClick = (transcriptId) => {
    setSelectedTranscriptId(transcriptId);
    console.log('TranscriptID', transcriptId)
  };

  return (
    <div>
        <div className='earnings-container'>
              <h1>Earnings Calls</h1> 
              {selectedTranscriptId != null && (
                <div className='earnings-transcript-summary'>
                    <div className='earnings-summary-container'>
                        <h2>Sentiment</h2>
                        <RadialGauge value={70} maxValue={100} />
                        <RadialGauge value={30} maxValue={100} />
                        <h2>Word Cloud</h2>
                        <div className='flexer'>
                            <div>Bad (2)</div>
                            <div>Revenues (5)</div>
                        </div>
                        <h2>Summary</h2>
                        <p>
                        In the latest earnings call for Apple Inc., held on April 30, 2024, Apple&apos;s executives discussed the company&apos;s performance over the past quarter. Despite facing challenges in the supply chain, such as semiconductor shortages, the company reported strong financial results, with revenue reaching $89.6 billion and earnings per share exceeding analyst expectations. Key highlights from the call included the continued growth of Apple&apos;s services segment, driven by robust demand for Apple Music and iCloud subscriptions, as well as the successful launch of the iPhone 15 series. Looking ahead, Apple expressed optimism about future growth opportunities, citing the expansion of its ecosystem with new hardware and software offerings, as well as its commitment to sustainability initiatives. Overall, the earnings call provided valuable insights into Apple&apos;s strategy and outlook for the upcoming quarters.
                        </p>
                        <h2>Common Analyst Questions</h2>
                        <ol>
                            <li>Shannon Cross</li>
                        </ol>
                    </div>
                <div className='earnings-transcript'>
                    <h2>Transcript</h2>
                    {/* Find the earnings call with the selected transcript_id */}
                    {Object.values(earningsCalls).flat().find(earnings => earnings.transcript_id === selectedTranscriptId) &&
                    <div>
                        <Link href={Object.values(earningsCalls).flat().find(earnings => earnings.transcript_id === selectedTranscriptId).audio } target="_blank" rel='noreferrer'>Audio <RxDownload /></Link>
                    <div dangerouslySetInnerHTML={{ __html: Object.values(earningsCalls).flat().find(earnings => earnings.transcript_id === selectedTranscriptId).transcript }} />
                    </div>
                    }
                </div>
                </div>
                )}
                    {/* {earningsCalls && earningsCalls['2024'] && (
                        <div>
                            <div className='earnings-transcript'>
                            <div dangerouslySetInnerHTML={{ __html: earningsCalls['2024'][earningsCalls['2024'].length - 1].transcript }} />
                            </div>
                        </div>
                        )} */}
              <div className='earnings-grid'>
              {earningsCalls.length > 0 ? Object.keys(earningsCalls)
                .sort((a, b) => b - a) // Sort the years in descending order
                .map(year => (
                  <div key={year} className='earnings-bubble'>
                    <h3>{year}</h3>
                    {earningsCalls[year].map((earnings, index) => (
                  <div key={index} onClick={() => handleTranscriptClick(earnings.transcript_id)}>
                  <h4>{earnings.title}</h4>
                        {/* <div dangerouslySetInnerHTML={{ __html: earnings.transcript }} /> */}
                      </div>
                    ))}
                  </div>
                )):(
                  <div>
                    <h2>Sorry, no earnings call data to show for {stock.title}</h2>
                  </div>
                )}

                </div>
              </div>    
        </div>
  )
}

export default StockEarnings



              {/* {earningsCalls && earningsCalls.length > 0 && (
                  earningsCalls.map((earnings, index) => (
                    <div key={index}>
                      <h4>{earnings.title}</h4>
                       <div dangerouslySetInnerHTML={{ __html: earnings.transcript }} /> 
                    </div>
                  ))
                )} */}
