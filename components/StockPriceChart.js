import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const StockPriceChart = ({ stockData }) => {

  console.log(stockData)

    // const getMonthFromDate = (date) => {
    //     return new Date(date).toLocaleString('en-us', { month: 'short' });
    //   };
    
    //   const labels = stockData.map((item, index) => {
    //     if (index % 5 === 0) {
    //       return getMonthFromDate(item.date);
    //     }
    //     return ''; // Empty string for labels to be skipped
    //   });

    const labels = ['hello', 'got it']
    
  const chartData = {
    // labels: labels, // Use month as labels
    datasets: [
      {
        label: 'Stock Price',
        data: stockData.map(item => item.close_price),
        fill: false,
        borderColor: 'rgb(104, 205, 255)', // Custom line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Custom background color
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Custom data point color
        height: 700,
        tension: 1, // Adjust the tension value to make the line less sharp
        pointRadius: 0, // Remove the data points
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    height: 700,

    scales: {
      x: {
        display: true,
        grid: {
          display: false, // Hide grid lines on the x-axis
        },
      },
      y: {
        display: true,
        grid: {
          display: false, // Hide grid lines on the y-axis
        },
        ticks: {
          callback: (value) => '$' + value, // Add '$' prefix to y-axis tick labels
        },
      },
    },
    plugins: {
      title: {
        display: false,
        text: 'Stock Price Chart', // Custom chart title
        font: {
          size: 20, // Custom font size for the title
        },
      },
      legend: {
        display: false,
        position: 'bottom', // Position the legend at the bottom
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Custom tooltip background color
        bodyFont: {
          size: 14, // Custom font size for tooltip text
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};



export default StockPriceChart;
