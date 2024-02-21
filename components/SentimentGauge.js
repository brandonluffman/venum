import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const SentimentGauge = ({ sentiment }) => {
  const gaugeValue = (sentiment + 1) / 2; // Convert sentiment value (-1 to 1) to a gauge value (0 to 1)
  const data = {
    datasets: [
      {
        data: [gaugeValue, 1 - gaugeValue],
        backgroundColor: ['rgb(75, 183, 241)', '#EEEEEE'],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        radius: '90%',
        cutout: '75%',
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div style={{ width: '200px', height: '100px', position: 'relative', margin: '0 auto', marginBottom: '4rem' }}>
      <Doughnut data={data} options={options} />
      <div style={{
        position: 'absolute',
        top: '70%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '20px',
        fontWeight: 'normal',
      }}>
        {`${(gaugeValue * 100).toFixed(0)}%`}
      </div>
    </div>
  );
};

export default SentimentGauge;
