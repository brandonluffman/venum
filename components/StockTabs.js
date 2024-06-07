import React, {useState} from 'react'
import StockAnalytic from './StockAnalytic';
import StockFinancials from './StockFinancials';
import StockSentiment from './StockSentiment';
// import StockAnalysis from './StockAnalysis';
import StockOwnership from './StockOwnership';
import StockRatios from './StockRatios';
import StockEarnings from './StockEarnings'
// import StockSummary from './StockSummary';
// import StockFinancials from './StockFinancials';
// import StockSentiment from './StockSentiment';
// import StockAnalysis from './StockAnalysis';
// import StockOwnership from './StockOwnership';

const StockTabs = ({ stock }) => {
    const [selectedOption, setSelectedOption] = useState('option1');
    
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    return (
      <div>
        <div className='stock-tabs-container'>
        <div className='stock-tab'>
          <input
            type="radio"
            id="option1"
            value="option1"
            checked={selectedOption === 'option1'}
            onChange={handleOptionChange}
            className='stock-tab-input'
          />
          <label className='stock-tab-label' htmlFor="option1">Summary</label>
        </div>
        <div className='stock-tab'>
          <input
            type="radio"
            id="option2"
            value="option2"
            checked={selectedOption === 'option2'}
            onChange={handleOptionChange}
            className='stock-tab-input'
          />
          <label className='stock-tab-label' htmlFor="option2">Financials</label>
        </div>
        <div className='stock-tab'>
          <input
            type="radio"
            id="option3"
            value="option3"
            checked={selectedOption === 'option3'}
            onChange={handleOptionChange}
            className='stock-tab-input'
          />
          <label className='stock-tab-label' htmlFor="option3">Sentiment</label>
        </div>
        <div className='stock-tab'>
          <input
            type="radio"
            id="option4"
            value="option4"
            checked={selectedOption === 'option4'}
            onChange={handleOptionChange}
            className='stock-tab-input'
          />
          <label className='stock-tab-label' htmlFor="option4">Ratios</label>
        </div>
        <div className='stock-tab'>
          <input
            type="radio"
            id="option5"
            value="option5"
            checked={selectedOption === 'option5'}
            onChange={handleOptionChange}
            className='stock-tab-input'
          />
          <label className='stock-tab-label' htmlFor="option5">Ownership</label>
        </div>
        <div className='stock-tab'>
          <input
            type="radio"
            id="option6"
            value="option6"
            checked={selectedOption === 'option6'}
            onChange={handleOptionChange}
            className='stock-tab-input'
          />
          <label className='stock-tab-label' htmlFor="option6">Earnings</label>
        </div>
        </div>
        <div>
          {selectedOption === 'option1' && <StockAnalytic stock={stock} />  }
          {selectedOption === 'option2' && <StockFinancials stock={stock} />  }
          {selectedOption === 'option3' && <StockSentiment />  }
          {selectedOption === 'option4' && <StockRatios stock={stock} />  }
          {selectedOption === 'option5' && <StockOwnership stock={stock} />  }
          {selectedOption === 'option6' && <StockEarnings stock={stock} />  }

        </div>

      </div>
    );
  };
  
export default StockTabs