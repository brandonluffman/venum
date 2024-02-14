import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Adjust the path as needed
import RatioChart from './RatioChart';
import MacroChart from './MacroChart';

const Macros = () => {
    const [data, setData] = useState([]);
    // const data = [
    //     {
    //       y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //       type: 'box',
    //       orientation: 'h',
    //       name: 'Box Plot',
    //     },
    //   ];
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
                    <MacroChart />
                    </div>
                </div>
                <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>Inflation</h3>
                    <h6 className='macro-grid-number'>{data.inflation && data.inflation}%</h6>
                    <MacroChart />

                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                    <h3 className='macro-grid-label'>Interest Rate</h3>
                    <h6 className='macro-grid-number'>{data.interest_rates && data.interest_rates}%</h6>
                    <MacroChart />
                    </div>
                </div>
                <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>Greed/Fear Index</h3>
                    <h6 className='macro-grid-number'>{data.greed_fear_index && data.greed_fear_index}</h6>
                    <MacroChart />

                    </div>
                </div>
                <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>GDP</h3>
                    <h6 className='macro-grid-number'>{data.gdp && data.gdp.toLocaleString()}T</h6>
                    <MacroChart />

                    </div>
                </div>
                <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>Consumer Spending</h3>
                    <h6 className='macro-grid-number'>{data.consumer_spending && data.consumer_spending.toLocaleString()}B</h6>
                    <MacroChart />

                    </div>
                </div>
                <div className='macro-grid-item'>
                    <div className='antiflexer'>
                    <h3 className='macro-grid-label'>Homes on the Market</h3>
                    <h6 className='macro-grid-number'>{data.homes_on_market && data.homes_on_market.toLocaleString()}</h6>
                    <MacroChart />

                    </div>
                </div>
                <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>Home Building</h3>
                    <h6 className='macro-grid-number'>{data.home_building && data.home_building.toLocaleString()}</h6>
                    <MacroChart />

                    </div>
                </div>
                {/* <div className='macro-grid-item'>
                <div className='antiflexer'>

                    <h3 className='macro-grid-label'>Construction Spending</h3>
                    <h6 className='macro-grid-number'>{data.construction_spending && data.construction_spending.toLocaleString()}</h6>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Macros;
