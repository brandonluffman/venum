import { Line } from 'react-chartjs-2';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '../utils/supabaseClient'; // Adjust the path as needed
import Chart from 'chart.js/auto'; // Updated import statement
import 'chartjs-adapter-date-fns';
import { faker } from '@faker-js/faker'; // Install faker if you don't have it

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

const PortfolioChart = () => {
    const chartRef = useRef(null); // Create a reference to the canvas element

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            fill: true, // Set fill to true for gradient
            pointRadius: 0,
            pointHoverRadius: 5,
            backgroundColor: '' // Placeholder for gradient
        }]
    });

    useEffect(() => {
        // Generate fake data for 150 days
        const days = 150;
        let labels = [];
        let data = [];
        let value = 1000; // Starting value of the portfolio

        // Generate random increasing values for portfolio
        for (let i = 1; i <= days; i++) {
            labels.push(`${i}`);
            value += parseFloat(faker.finance.amount(0, 50)); // Ensure the result is parsed to a number
            data.push(value);
        }

        // Access canvas element to create gradient
        const chart = chartRef.current;
        const ctx = chart && chart.ctx;

        if (ctx) {
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(75, 192, 192, 0.5)');
            gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');

            // Update the chart data state with gradient
            setChartData({
                labels,
                datasets: [{
                    label: 'Portfolio Value',
                    data,
                    borderColor: 'rgb(75, 192, 192)',
                    fill: true,
                    backgroundColor: gradient, // Set gradient as background color
                    pointRadius: 0,
                    pointHoverRadius: 5,
                }]
            });
        }
    }, []);

    return (
        <div className="portfolio-container">
            <Line
                data={chartData}
                ref={chartRef}
                style={{ width: '1200px', height: '400px' }}
                options={{
                    scales: {
                        y: {
                            display: false,
                            beginAtZero: false,
                            grid: {
                                display: false,
                                color: 'rgba(255, 255, 255, 0.1)',
                                lineWidth: 1,
                            }
                        },
                        x: {
                            grid: {
                                display: false,
                                color: 'rgba(255, 255, 255, 0.1)',
                                lineWidth: 1,
                            }
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
                            border: '1px solid black',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
                            titleColor: 'white',
                            bodyColor: 'white',
                            displayColors: false,
                            width: 200,
                            callbacks: {
                                label: function (context) {
                                    const label = context.dataset.label || '';
                                    if (context.parsed.y !== null) {
                                        return `${label} $${context.parsed.y.toLocaleString(2)}`;
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

export default PortfolioChart;