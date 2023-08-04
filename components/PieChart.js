import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({dataa}) => {


  // console.log(data.major_holders.shares_held_insiders)


  const pieData = dataa && {
    labels: ['Retail', 'Institutional', 'Other'],
    datasets: [
      {
        data: [
          dataa.major_holders.shares_held_insiders.replace('%', ''),
          dataa.major_holders.shares_held_institutions.replace('%', ''),
          dataa.major_holders.shares_held_institutions.replace('%', ''),
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
    },
    labels: {
      fontColor: '#fff',
      fontSize: 100,
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      padding: 10,
    },
    font: {
      family: 'Arial',
      size: 14,
      style: 'normal',
    },
    width: 300,
    height: 300,
  };

  if (!dataa) {
    return <div>Loading...</div>; // Display a loading indicator while data is being fetched
  }

  return <Pie className="pie-chart" data={pieData} options={options} />;
};

export default PieChart;