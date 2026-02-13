import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './MetricsChart.css';

function MetricsChart({ data }) {
  // Format data for recharts
  const chartData = data.map(round => ({
    round: round.round,
    accuracy: (round.accuracy * 100).toFixed(2)
  }));

  return (
    <div className="metrics-chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="round" 
            label={{ value: 'Training Round', position: 'insideBottom', offset: -5 }}
            stroke="#6b7280"
          />
          <YAxis 
            label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }}
            domain={[0, 100]}
            stroke="#6b7280"
          />
          <Tooltip 
            contentStyle={{ 
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
            formatter={(value) => [`${value}%`, 'Accuracy']}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="accuracy" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 5 }}
            activeDot={{ r: 7 }}
            name="Model Accuracy"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MetricsChart;
