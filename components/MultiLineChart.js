import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateUpwardData = (length, maxIncrement) => {
    let data = [Math.random() * maxIncrement];
    for (let i = 1; i < length; i++) {
      data.push(data[i - 1] + Math.random() * maxIncrement);
    }
    return data.map(value => value.toFixed(2));
  };

  const calculateCumulativeReturns = (percentageReturns) => {
    const cumulativeReturns = [];
    let cumulativeValue = 100000; // Start with an initial value of 100 (representing 100%)
    for (const returnPercentage of percentageReturns) {
      cumulativeValue *= (1 + returnPercentage / 100);
      cumulativeReturns.push(cumulativeValue);
    }
    return cumulativeReturns;
  };


const MultiLineChart = () => {
    const stockData = [
        -1.54, 34.11, 20.26, 31.01, 26.67, 19.53, -10.14, -13.04, -23.37, 26.38,
        8.99, 3.00, 13.62, 3.53, -38.49, 23.45, 12.78, 0.00, 13.41, 29.60,
        11.39, -0.73, 9.54, 19.42, -6.24, 28.88, 16.26, 26.89, -19.44, 24.23, 15.13
      ];

      const bondData = [
        -8.04, 23.48, 1.43, 9.94, 14.92,-8.25, 16.66, 5.57, 15.12, 0.38,
        4.49, 2.87, 1.96, 10.21, 20.10, -11.12, 8.46, 16.04, 2.97, -9.10,
        10.75, 1.28, 0.69, 2.80, -0.02, 9.64, 11.33, -4.42, -17.83, 3.88, 15.13
      ];

    const reData = [
        2.52, 1.79, 2.43, 4.02, 6.44, 7.68, 9.29, 6.68, 9.56, 9.81,
        13.64, 13.51, 1.73, -5.40, -12.00, -3.86, -4.11, -3.89, 6.44, 10.71,
        4.51, 5.20, 5.30, 6.21, 4.52, 3.69, 10.43, 18.87, 5.67, 6.29
    ]

    const goldData = [
        -2.17, 0.98, -4.59, -21.41, -0.83, 0.85, -5.44, 0.75, 25.57, 19.89,
        4.65, 17.77, 23.20, 31.92, 4.32, 25.04, 29.24, 12.02, 5.68, -27.61,
        0.12, -12.11, 8.10, 12.66, -0.93, 19.08, 24.17, -3.75, 0.55, 13.26
    ]

    const averages = [
        -2.6, -2.8, -3.0, -2.3, -1.6, -2.2, -3.4, -2.8, -1.6, -2.3,
        -2.7, -3.4, -3.2, -2.8, -3.8, 0.4, -1.6, -3.2, -2.1, -1.5,
        -1.6, -0.1, -1.3, -2.1, -2.4, -1.8, -1.2, -4.7, -8.0, -4.1
    ]
    

      const stockCumulativeReturns = calculateCumulativeReturns(stockData);
      const bondCumulativeReturns = calculateCumulativeReturns(bondData);
      const reCumulativeReturns = calculateCumulativeReturns(reData);
      const goldCumulativeReturns = calculateCumulativeReturns(goldData);
      const dollarCumulativeReturns = calculateCumulativeReturns(averages);


      const data = {
        labels: Array.from({ length: 30 }, (_, i) => 1994 + i),
        datasets: [
          {
            label: 'Stocks',
            data: stockCumulativeReturns,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.2, // Adjust tension for Stocks dataset
          },
          {
            label: 'Bonds',
            data: bondCumulativeReturns,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            tension: 0.2, // Adjust tension for Bonds dataset
          },
          {
            label: 'Real Estate',
            data: reCumulativeReturns,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            tension: 0.2, // Adjust tension for Real Estate dataset
          },
          {
            label: 'Gold',
            data: goldCumulativeReturns,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            tension: 0.2, // Adjust tension for Gold dataset
          },
          {
            label: 'U.S. Dollar',
            data: dollarCumulativeReturns,
            borderColor: 'rgba(0, 206, 86, 1)',
            backgroundColor: 'rgba(0, 206, 86, 0.2)',
            tension: 0.2, // Adjust tension for Dollar dataset
          },
        ],
      };
      

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
          grid: {
            display: false, // Remove x-axis grid lines
          },
        },
        y: {
          grid: {
            display: true, // Keep y-axis grid lines
          },
        },
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
        width:200,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              if (context.parsed.y !== null) {
                return `${label} $${parseInt(context.parsed.y.toFixed(2)).toLocaleString()}`;
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
                hoverRadius: 10, // Radius of the points on hover
                hoverBackgroundColor: 'rgb(241, 75, 155)', // Background color of the point on hover
                hoverBorderColor: 'rgb(255,255,255)', // Border color of the point on hover
                hoverBorderWidth: 2, // Border width of the point on hover
            }
        }
    // plugins: {
    //   legend: {
    //     // position: 'top',
    //     display: false,
    //   },
    //   title: {
    //     display: true,
    //     text: 'Asset Class Returns Over 30 Years',
    //   },
    // },
  };

  return <Line data={data} options={options} />;
};

export default MultiLineChart;