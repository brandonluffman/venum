import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

const PriceChart = () => {
    // Initializing with a structure that avoids 'undefined' issues
    const [chartData, setChartData] = useState({
        labels: [], // Empty labels array
        datasets: [{ // One dataset with empty data array
            // label: 'Stock Price',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            fill: false,
        }]
    });

    const generateDummyData = () => {
        const dates = ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05"];
        const prices = [120, 150, 130, 160, 170];

        setChartData({
            labels: dates,
            datasets: [{
                // label: none,
                data: prices,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false,
            }]
        });
    };

    useEffect(() => {
        generateDummyData();
    }, []);

    return (
        <div className="chartContainer">

    <Line data={chartData} style={{ width: '400px', height: '400px' }} options={{
        scales: {
            y: {
                beginAtZero: false
            }
        },
        maintainAspectRatio: false, // Allows independent width and height control
        plugins: {
            legend: {
              display: false, // This will hide the legend
            },
          },
    }} />
    </div>
    );
};

export default PriceChart;