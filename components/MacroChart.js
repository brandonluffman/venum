import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const MacroChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Upward Trend',
        data: [10, 20, 30, 40, 30, 20, 40, 50, 60, 50], // Your data points here for the upward trend
        borderColor: 'rgb(108, 184, 255)', // Line color
        backgroundColor: 'rgba(0, 0, 255, 0.1)', // Fill color under the line
        borderWidth: 1,
        tension:0.5,
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
      <Line data={data} options={options} />
    </div>
  );
};

export default MacroChart;
