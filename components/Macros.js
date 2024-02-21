import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Adjust the path as needed
import RatioChart from './RatioChart';
import MacroChart from './MacroChart';

const Macros = () => {
    const [data, setData] = useState({});
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const { data: economicData, error } = await supabase
                .from('economic_indicators')
                .select('*')
                .order('date', { ascending: false })
                .limit(1);

            if (error) {
                console.error('Error fetching data:', error);
                return;
            }

            if (economicData && economicData.length > 0) {
                setData(economicData[0]);
            }

            // Fetch historical data for each column
            const indicators = ['unemployment_rate', 'inflation', 'interest_rates', 'greed_fear_index', 'gdp', 'consumer_spending', 'homes_on_market', 'home_building'];
            const historicalData = {};

            for (const indicator of indicators) {
                const { data: historical, error } = await supabase
                    .from('economic_indicators')
                    .select(indicator)
                    .order('date', { ascending: true });

                if (error) {
                    console.error(`Error fetching historical data for ${indicator}:`, error);
                } else {
                    historicalData[indicator] = historical.map((item) => item[indicator]);
                }
            }

            setChartData(historicalData);
        };

        fetchData();
    }, []);

    return (
        <div className='macro-container'>
            <h1>Macro Economic Indicators</h1>
            {/* <h6>Get a glimpse of the economy from a birds eye view.</h6> */}
            <hr className='macro-container-hr'></hr>
            <div className='macro-grid-container'>
                <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>Unemployment Rate</h3>
                    <h6 className='macro-grid-number'>{data.unemployment_rate && data.unemployment_rate}%</h6>
                    <MacroChart data={chartData.unemployment_rate} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>Inflation</h3>
                    <h6 className='macro-grid-number'>{data.inflation && data.inflation}%</h6>
                    <MacroChart data={chartData.inflation} />

                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                    <h3 className='macro-grid-label'>Interest Rate</h3>
                    <h6 className='macro-grid-number'>{data.interest_rates && data.interest_rates}%</h6>
                    <MacroChart data={chartData.interest_rates} />
                    </div>
                </div>
                <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>Greed/Fear Index</h3>
                    <h6 className='macro-grid-number'>{data.greed_fear_index && data.greed_fear_index}</h6>
                    <MacroChart data={chartData.greed_fear_index} />

                    </div>
                </div>
                <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>GDP</h3>
                    <h6 className='macro-grid-number'>{data.gdp && data.gdp.toLocaleString()}T</h6>
                    <MacroChart data={chartData.gdp} />

                    </div>
                </div>
                <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>Consumer Spending</h3>
                    <h6 className='macro-grid-number'>{data.consumer_spending && data.consumer_spending.toLocaleString()}B</h6>
                    <MacroChart data={chartData.consumer_spending} />

                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                    <h3 className='macro-grid-label'>Homes on the Market</h3>
                    <h6 className='macro-grid-number'>{data.homes_on_market && data.homes_on_market.toLocaleString()}</h6>
                    <MacroChart data={chartData.homes_on_market} />

                    </div>
                </div>
                <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>Home Building</h3>
                    <h6 className='macro-grid-number'>{data.home_building && data.home_building.toLocaleString()}</h6>
                    <MacroChart data={chartData.home_building} />

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