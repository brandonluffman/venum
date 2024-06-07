import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Adjust the path as needed
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
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
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    
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
        const prices = data.map(item => item.closing_price);

        setChartData({
            labels: dates,
            datasets: [{
                data: prices,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false,
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
            <Line data={chartData} style={{ width: '400px', height: '400px' }} options={{
                scales: {
                    y: {
                        beginAtZero: false
                    },
                    x: {
                        display: false // Remove the dates from the x-axis
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