// File: src/components/charts/MetricsLineChart.jsx

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MetricsLineChart({ 
  data, 
  dataKey, 
  color, 
  yAxisFormat,
  xAxisKey = 'round',
  height = 250 
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
        <XAxis 
          dataKey={xAxisKey} 
          stroke="#666"
          style={{ fontSize: '0.75rem' }}
        />
        <YAxis 
          stroke="#666"
          tickFormatter={yAxisFormat}
          style={{ fontSize: '0.75rem' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          formatter={(value) => [yAxisFormat(value), dataKey.charAt(0).toUpperCase() + dataKey.slice(1)]}
        />
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={color} 
          strokeWidth={3}
          dot={{ fill: color, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}