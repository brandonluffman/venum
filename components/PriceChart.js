import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Adjust the path as needed
import Chart from 'chart.js/auto'; // Updated import statement

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
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            fill: false,
            pointRadius:0,
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
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.3)',
            }]
        });
    };

    useEffect(() => {
        if (ticker) {
            fetchStockPrices();
        }
    }, [ticker]);

    return (
        <div className="chartContainer">
            <div>Testing</div>
            <Line data={chartData} style={{ width: '400px', height: '400px' }} options={{
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
                      mode: 'index',
                      intersect: false,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      titleFont: {
                          size: 16,
                          weight: 'bold',
                          color: 'black'
                      },
                      bodyFont: {
                          size: 14,
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
            }} />
        </div>
    );
};

export default PriceChart;