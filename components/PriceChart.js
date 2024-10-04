import { Line } from 'react-chartjs-2';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '../utils/supabaseClient'; // Adjust the path as needed
import Chart from 'chart.js/auto'; // Updated import statement
import 'chartjs-adapter-date-fns';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const PriceChart = ({ ticker }) => {
    const chartRef = useRef(null); // Create a reference to the canvas element

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 5,
        }]
    });

    const [timeframe, setTimeframe] = useState('1y'); // Default to 1 year

    // Define how many years ago to fetch based on selected timeframe
    const timeframeMapping = {
        '6m': 0.5,
        '1y': 1,
        '5y': 5,
        '10y': 10,
        'all': 100, // Arbitrary large number to fetch all
    };

    const fetchStockPrices = async () => {
        const yearsAgo = timeframeMapping[timeframe];
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - yearsAgo);

        let { data, error } = await supabase
            .from('historical_stock_prices')
            .select('date, closing_price')
            .eq('ticker', ticker)
            .gte('date', startDate.toISOString().split('T')[0]) // Filter for dates based on the timeframe
            .order('date', { ascending: true });

        if (error) {
            console.error('Error fetching stock prices:', error);
            return;
        }

        const dates = data.map(item => item.date);
        const prices = data.map(item => item.closing_price.toLocaleString(1));

        // Filter for every other data point for 5y and 10y timeframes
        if (timeframe === '5y' || timeframe === '10y' || timeframe === 'all') {
            const filteredData = data.filter((_, index) => index % 5 === 0); // Select every other element
            const filteredDates = filteredData.map(item => item.date);
            const filteredPrices = filteredData.map(item => item.closing_price.toLocaleString(1));

            setChartData({
                labels: filteredDates,
                datasets: [{
                    data: filteredPrices,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0,
                    fill: true,
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            return null;
                        }

                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.3)');
                        gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');

                        return gradient;
                    }
                }]
            });
        } else {
            // For other timeframes, use all data
            setChartData({
                labels: dates,
                datasets: [{
                    data: prices,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0,
                    fill: true,
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            return null;
                        }

                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.3)');
                        gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');

                        return gradient;
                    }
                }]
            });
        }
    };

    useEffect(() => {
        if (ticker) {
            fetchStockPrices();
        }
    }, [ticker, timeframe]); // Fetch data when ticker or timeframe changes

    const handleTimeframeChange = (newTimeframe) => {
        setTimeframe(newTimeframe);
    };

    return (
        <div className="chartContainer">
            <div className="toggle-buttons">
                {['6m', '1y', '5y', '10y', 'all'].map((time) => (
                    <button
                        key={time}
                        onClick={() => handleTimeframeChange(time)}
                        className={`toggle-button ${time === timeframe ? 'active' : ''}`}
                    >
                        {time.toUpperCase()}
                    </button>
                ))}
            </div>
            <Line
                data={chartData}
                ref={chartRef}
                style={{ width: '400px', height: '400px' }}
                options={{
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                display: true,
                                color: 'rgba(255, 255, 255, 0.1)',
                                lineWidth: 1,
                            }
                        },
                        x: {
                            type: 'time',
                            time: {
                                unit: timeframe === '5y' || timeframe === '10y' || timeframe === 'all' ? 'year' : 'month', // Show years for long timeframes
                                tooltipFormat: 'MMM dd yyyy', // Format for tooltip
                            },
                            ticks: {
                                callback: (value) => {
                                    const date = new Date(value);
                                    return timeframe === '5y' || timeframe === '10y' || timeframe === 'all' ? date.getFullYear() : date.toLocaleDateString(); // Show year for long timeframes, full date otherwise
                                }
                            }
                            // time: {
                            //     unit: 'month',
                            //     tooltipFormat: 'MMM dd yyyy'
                            // }
                        }
                    },
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: true,
                            mode: 'nearest',
                            intersect: false,
                            border: '1px solid white',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            titleFont: {
                                size: 14,
                                weight: 'bold',
                                color: 'black',
                            },
                            bodyFont: {
                                size: 18,
                                color: 'black',
                                weight: 'bold'
                            },
                            titleColor: 'black',
                            bodyColor: 'black',
                            displayColors: false,
                            width: 200,
                            callbacks: {
                                label: function (context) {
                                    const label = context.dataset.label || '';
                                    if (context.parsed.y !== null) {
                                        return `${label} $${context.parsed.y}`;
                                    }
                                    return '';
                                }
                            }
                        }
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: false
                    },
                    elements: {
                        point: {
                            radius: 0,
                            hoverRadius: 40,
                            hoverBackgroundColor: 'rgb(241, 75, 155)',
                            hoverBorderColor: 'rgb(255,255,255)',
                            hoverBorderWidth: 2,
                        }
                    }
                }}
            />
        </div>
    );
};

export default PriceChart;


// const PriceChart = ({ ticker }) => {
//     const chartRef = useRef(null); // Create a reference to the canvas element

 
//     const [chartData, setChartData] = useState({
//         labels: [],
//         datasets: [{
//             data: [],
//             borderColor: 'rgb(75, 192, 192)',
//             // tension: 100,
//             fill: false,
//             pointRadius: 0, // Initial radius of the points on the line
//             pointHoverRadius: 5, // Radius of the points on hover
//         }]
//     });

//     const fetchStockPrices = async () => {
//         const fiveYearsAgo = new Date();
//         fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    
//         let { data, error } = await supabase
//             .from('historical_stock_prices')
//             .select('date, closing_price')
//             .eq('ticker', ticker)
//             .gte('date', fiveYearsAgo.toISOString().split('T')[0]) // Filter for dates in the last 5 years
//             .order('date', { ascending: true });

//         if (error) {
//             console.error('Error fetching stock prices:', error);
//             return;
//         }

//         const dates = data.map(item => item.date);
//         const prices = data.map(item => item.closing_price.toLocaleString(2));

//         console.log('Dates', dates)

//         setChartData({
//             labels: dates,
//             datasets: [{
//                 data: prices,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0,
//                 fill: true,
//                 backgroundColor: (context) => {
//                     const chart = context.chart;
//                     const { ctx, chartArea } = chart;

//                     if (!chartArea) {
//                         return null;
//                     }

//                     const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
//                     gradient.addColorStop(0, 'rgba(75, 192, 192, 0.3)');
//                     gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');

//                     return gradient;
//                 }
//             }]
//         });
//     };


//     useEffect(() => {
//         if (ticker) {
//             fetchStockPrices();
//         }
//     }, [ticker]);



//     return (
//         <div className="chartContainer">
//             <Line data={chartData} ref={chartRef} style={{ width: '400px', height: '400px' }} options={{
//                 scales: {
//                     y: {
//                         beginAtZero: false,
//                         grid: {
//                             display: true,
//                             color: 'rgba(255, 255, 255, 0.1)', // Color of the grid lines
//                             lineWidth: 1, // Width of the grid lines
//                         }
//                     },
//                     x: {
//                         type: 'time',
//                         time: {
//                             unit: 'month',
//                             tooltipFormat: 'MMM dd yyyy' 
//                         }
//                     }
//                 },
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                       display: false,
//                     },
//                     tooltip: {
//                       enabled: true,
//                       mode: 'nearest',
//                       intersect: false,
//                       border: '1px solid white',
//                       backgroundColor: 'rgba(255, 255, 255, 0.7)',
//                       titleFont: {
//                         size: 14,
//                         weight: 'bold',
//                         color: 'black', // corrected color property placement
//                     },
//                     bodyFont: {
//                         size: 18,
//                         color: 'black', // corrected color property placement
//                         weight: 'bold'
//                     },
//                     titleColor: 'black', // added this to ensure title color
//                     bodyColor: 'black', // added this to ensure body color
//                     displayColors: false, // Remove the square legend
//                     width:200,
//                       callbacks: {
//                         label: function(context) {
//                           const label = context.dataset.label || '';
//                           if (context.parsed.y !== null) {
//                             return `${label} $${context.parsed.y}`;
//                           }
//                           return '';
//                         }
//                       }
                
//                     }
//                   },
//                 hover: {
//                         mode: 'nearest', // Highlight the nearest point
//                         intersect: false // Ensure the point is highlighted even when not directly over it
//                     },
//                     elements: {
//                         point: {
//                             radius: 0, // Initial radius of the points on the line
//                             hoverRadius: 40, // Radius of the points on hover
//                             hoverBackgroundColor: 'rgb(241, 75, 155)', // Background color of the point on hover
//                             hoverBorderColor: 'rgb(255,255,255)', // Border color of the point on hover
//                             hoverBorderWidth: 2, // Border width of the point on hover
//                         }
//                     }
//             }} />
//         </div>
//     );
// };

// export default PriceChart;
