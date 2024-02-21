import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const MacroChart = ({ data }) => {
  const chartData = {
    labels: Array.from({ length: data ? data.length : 0 }, (_, i) => i + 1), // Generate labels based on data length
    datasets: [
      {
        label: 'Trend',
        data: data || [], // Use the passed data or an empty array if not provided
        borderColor: 'rgb(108, 184, 255)', // Line color
        backgroundColor: 'rgba(0, 0, 255, 0.1)', // Fill color under the line
        borderWidth: 1,
        tension: 0.5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className='macro-chart-div'>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MacroChart;
