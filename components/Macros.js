import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Adjust the path as needed
import RatioChart from './RatioChart';
import MacroChart from './MacroChart';
import { BsCaretDownFill } from 'react-icons/bs';

const Macros = () => {
    const [data, setData] = useState({});
    const [chartData, setChartData] = useState({});
    const [countries, setCountries] = useState(['United States', 'Japan']);
    const [selectedCountry, setSelectedCountry] = useState('United States');


    useEffect(() => {
        const fetchData = async () => {
            const { data: economicData, error } = await supabase
                .from('macro')
                .select('*')
                .order('date', { ascending: false })
                .limit(1);

            if (error) {
                console.error('Error fetching data:', error);
                return;
            }

            if (economicData && economicData.length > 0) {
                console.log(economicData[0])
                setData(economicData[0]);
            }

            // Fetch historical data for each column
            const indicators = ['inflation', 'gdp', 'unemployment_rate', 'jobs_created', 'industrial_production', 'consumer_spending', 'home_building', 'construction_demand', 'retail_sales', 'interest_rate', 'cpi', 'm2', 'labor_force_participation'];
            const historicalData = {};

            for (const indicator of indicators) {
                const { data: historical, error } = await supabase
                    .from('macro')
                    .select(indicator)
                    .order('date', { ascending: false })
                    .limit(20);

                if (error) {
                    console.error(`Error fetching historical data for ${indicator}:`, error);
                } else {
                    historicalData[indicator] = historical.map((item) => item[indicator] !== null ? item[indicator] : null).reverse();
                }
            }

            setChartData(historicalData);
            console.log(historicalData)
        };

        fetchData();
    }, []);

       // Handle country change
        const handleCountryChange = (e) => {
            setSelectedCountry(e.target.value);
            setCurrentPage(1); // Reset to the first page
        };


    return (
        <div className='macro-container'>
            <div className='macro-top-container'>
            <h2><img src={`/countries/${selectedCountry.toLowerCase().replace(' ', "_")}.png`} width='20' /> {selectedCountry && selectedCountry}</h2>
            <h1>Economy</h1>

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

                
            </div>
            {/* <h6>Get a glimpse of the economy from a birds eye view.</h6> */}
            {/* <hr className='macro-container-hr'></hr> */}
            <div className='macro-grid-container'>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>Inflation</h3>
                        <h6 className='macro-grid-number'>{data.inflation && data.inflation}%</h6>
                        <MacroChart data={chartData.inflation} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>GDP</h3>
                        <h6 className='macro-grid-number'>{data.gdp ? data.gdp: 0}</h6>
                        <MacroChart data={chartData.gdp} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>Unemployment Rate</h3>
                        <h6 className='macro-grid-number'>{data.unemployment_rate && data.unemployment_rate}%</h6>
                        <MacroChart data={chartData.unemployment_rate} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>Jobs Created</h3>
                        <h6 className='macro-grid-number'>{data.jobs_created && data.jobs_created*1000}</h6>
                        <MacroChart data={chartData.jobs_created} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>Industrial Production</h3>
                        <h6 className='macro-grid-number'>{data.industrial_production && data.industrial_production}</h6>
                        <MacroChart data={chartData.industrial_production} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>Consumer Spending</h3>
                        <h6 className='macro-grid-number'>{data.consumer_spending ? data.consumer_spending: 0}</h6>
                        <MacroChart data={chartData.consumer_spending} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>Home Building</h3>
                        <h6 className='macro-grid-number'>{data.home_building && data.home_building}</h6>
                        <MacroChart data={chartData.home_building} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>Construction Spend</h3>
                        <h6 className='macro-grid-number'>{data.construction_demand ? data.construction_demand: 0}</h6>
                        <MacroChart data={chartData.construction_demand} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>Retail Sales</h3>
                        <h6 className='macro-grid-number'>{data.retail_sales && data.retail_sales}</h6>
                        <MacroChart data={chartData.retail_sales} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>Interest Rate</h3>
                        <h6 className='macro-grid-number'>{data.interest_rate && data.interest_rate}%</h6>
                        <MacroChart data={chartData.interest_rate} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>CPI</h3>
                        <h6 className='macro-grid-number'>{data.cpi && data.cpi}</h6>
                        <MacroChart data={chartData.cpi} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>M2 Money Supply</h3>
                        <h6 className='macro-grid-number'>{data.m2 && data.m2}</h6>
                        <MacroChart data={chartData.m2} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                        <h3 className='macro-grid-label'>Labor Force Participation</h3>
                        <h6 className='macro-grid-number'>{data.labor_force_participation && data.labor_force_participation*1000}</h6>
                        <MacroChart data={chartData.labor_force_participation} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Macros;



   {/* <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>Construction Spending</h3>
                    <h6 className='macro-grid-number'>{data.construction_spending && data.construction_spending.toLocaleString()}</h6>
                    </div>
                </div> */}