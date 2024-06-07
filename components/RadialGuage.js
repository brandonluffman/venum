// components/RadialGauge.js
import React, { useState, useEffect } from 'react';

const RadialGauge = ({ value, maxValue }) => {
  const [color, setColor] = useState("")
  const percentage = (value / maxValue) * 100;
  
  const radius = 40;
  const strokeWidth = 10;
  const circumference = radius * 2 * Math.PI;
  const progress = percentage / 100 * circumference;
  const offset = circumference - progress;

  useEffect(() => {
    if (value < 33) {
      setColor('red');
    } else if (value >= 33 && value < 67) {
      setColor('yellow');
    } else {
      setColor('green');
    }
  }, [value]);
  return (
    <svg width="100" height="100">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        stroke="#eee"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        stroke={color}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="straight"
      />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fontSize="16" color="white">
        {value}
      </text>
    </svg>
  );
};

export default RadialGauge;
