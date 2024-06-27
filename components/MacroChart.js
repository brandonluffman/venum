import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const MacroChart = ({ data }) => {
  const chartData = {
    labels: Array.from({ length: data ? data.length : 0 }, (_, i) => i + 1), // Generate labels based on data length
    datasets: [
      {
        label: '',
        data: data || [], // Use the passed data or an empty array if not provided
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
        pointRadius: 0, // Initial radius of the points on the line
        pointHoverRadius: 5, // Radius of the points on hover
      },
    ],
  };

  const options = {
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
          tooltipFormat: 'MMM dd yyyy' 
        }
      }
    },
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
          color: 'black', // corrected color property placement
        },
        bodyFont: {
          size: 18,
          color: 'black', // corrected color property placement
          weight: 'bold'
        },
        titleColor: 'black', // added this to ensure title color
        bodyColor: 'black', // added this to ensure body color
        displayColors: false, // Remove the square legend
        width: 200,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            if (context.parsed.y !== null) {
              return `${label} ${context.parsed.y}`;
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


// import React from 'react';
// import { Bar } from 'react-chartjs-2';

// const MacroChart = ({ data }) => {
//   const chartData = {
//     labels: Array.from({ length: data ? data.length : 0 }, (_, i) => i + 1), // Generate labels based on data length
//     datasets: [
//       {
//         label: 'Trend',
//         data: data || [], // Use the passed data or an empty array if not provided
//         backgroundColor: 'rgba(108, 184, 255, 0.7)', // Bar color
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         display: false, // Hide x-axis
//       },
//       y: {
//         display: false, // Hide y-axis
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         enabled: true,
//         mode: 'index',
//         intersect: false,
//         callbacks: {
//           label: function(context) {
//             const label = context.dataset.label || '';
//             if (context.parsed.y !== null) {
//               return `${label}: ${context.parsed.y}`;
//             }
//             return '';
//           }
//         }
//       }
//     },
//     indexAxis: 'x', // Display bars vertically
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   return (
//     <div className='macro-chart-div'>
//       <Bar data={chartData} options={options} />
//     </div>
//   );
// };

// export default MacroChart;
