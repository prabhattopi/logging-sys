import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function AnalyticsDashboard({ logs }) {
  const data = useMemo(() => {
    const counts = logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {});

    return [
      { name: 'Error', count: counts.error || 0, fill: '#f5222d' },
      { name: 'Warn', count: counts.warn || 0, fill: '#faad14' },
      { name: 'Info', count: counts.info || 0, fill: '#1890ff' },
      { name: 'Debug', count: counts.debug || 0, fill: '#52c41a' },
    ];
  }, [logs]);

  return (
    <div className="analytics-dashboard">
      <h3>Log Levels Overview</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}