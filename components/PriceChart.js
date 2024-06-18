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
            // tension: 100,
            fill: false,
            pointRadius: 0, // Initial radius of the points on the line
            pointHoverRadius: 5, // Radius of the points on hover
        }]
    });

    const fetchStockPrices = async () => {
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 1);
    
        let { data, error } = await supabase
            .from('historical_stock_prices')
            .select('date, closing_price')
            .eq('ticker', ticker)
            .gte('date', fiveYearsAgo.toISOString().split('T')[0]) // Filter for dates in the last 5 years
            .order('date', { ascending: true });

        if (error) {
            console.error('Error fetching stock prices:', error);
            return;
        }

        const dates = data.map(item => item.date);
        const prices = data.map(item => item.closing_price.toLocaleString(2));

        setChartData({
            labels: dates,
            datasets: [{
                data: prices,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.5,
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
    };

    //     setChartData({
    //         labels: dates,
    //         datasets: [{
    //             data: prices,
    //             borderColor: 'rgb(75, 192, 192)',
    //             tension: 0.5,
    //             fill: false,
    //             backgroundColor: 'rgba(75, 192, 192, 0.3)',
    //         }]
    //     });
    // };

    useEffect(() => {
        if (ticker) {
            fetchStockPrices();
        }
    }, [ticker]);



    return (
        <div className="chartContainer">
            {/* <div>Testing</div> */}
            <Line data={chartData} ref={chartRef} style={{ width: '400px', height: '400px' }} options={{
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            display: true,
                            color: 'rgba(255, 255, 255, 0.1)', // Color of the grid lines
                            lineWidth: 1, // Width of the grid lines
                        }
                    },
                    x: {
                        type: 'time',
                        time: {
                            unit: 'month',
                            displayFormats: {
                                month: 'MMM yyyy' // Display format for the months
                            }
                        }
                        // display: false // Remove the dates from the x-axis
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
                      backgroundColor: 'rgba(75, 183, 241, 0.7)',
                      titleFontColor: 'black',
                      bodyFontColor: 'black',
                      displayColors: false, // Remove the square legend
                      titleFont: {
                          size: 14,
                          weight: 'bold',
                          color: 'black'
                      },
                      bodyFont: {
                          size: 18,
                          color: 'black'

                      },
                      width:200,
                      callbacks: {
                        label: function(context) {
                          const label = context.dataset.label || '';
                          if (context.parsed.y !== null) {
                            return `${label}: ${context.parsed.y}`;
                          }
                          return '';
                        }
                      }
                    }
                  },
                hover: {
                        mode: 'nearest', // Highlight the nearest point
                        intersect: false // Ensure the point is highlighted even when not directly over it
                    },
                    elements: {
                        point: {
                            radius: 0, // Initial radius of the points on the line
                            hoverRadius: 40, // Radius of the points on hover
                            hoverBackgroundColor: 'rgb(241, 75, 155)', // Background color of the point on hover
                            hoverBorderColor: 'rgb(255,255,255)', // Border color of the point on hover
                            hoverBorderWidth: 2, // Border width of the point on hover
                        }
                    }
            }} />
        </div>
    );
};

export default PriceChart;


           // hover: {
                    //     mode: 'nearest', // Highlight the nearest point
                    //     intersect: false // Ensure the point is highlighted even when not directly over it
                    // },
                    // elements: {
                    //     point: {
                    //         radius: 0, // Initial radius of the points on the line
                    //         hoverRadius: 5, // Radius of the points on hover
                    //         hoverBackgroundColor: 'rgb(75, 192, 192)', // Background color of the point on hover
                    //         hoverBorderColor: 'rgb(75, 192, 192)', // Border color of the point on hover
                    //         hoverBorderWidth: 2, // Border width of the point on hover
                    //     }
                    // }