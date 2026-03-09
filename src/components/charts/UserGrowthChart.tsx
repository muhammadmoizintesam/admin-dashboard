'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { userGrowthData } from '@/mock-data/analytics';

interface UserGrowthChartProps {
  height?: number;
}

export default function UserGrowthChart({ height = 300 }: UserGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={userGrowthData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="month"
          className="text-xs"
          tick={{ fill: 'var(--muted-foreground)' }}
          axisLine={{ stroke: 'var(--border)' }}
        />
        <YAxis
          className="text-xs"
          tick={{ fill: 'var(--muted-foreground)' }}
          axisLine={{ stroke: 'var(--border)' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--popover)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
          labelStyle={{ color: 'var(--foreground)' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="users"
          stroke="var(--chart-1)"
          strokeWidth={2}
          dot={false}
          name="Total Users"
        />
        <Line
          type="monotone"
          dataKey="newUsers"
          stroke="var(--chart-2)"
          strokeWidth={2}
          dot={false}
          name="New Users"
        />
        <Line
          type="monotone"
          dataKey="activeUsers"
          stroke="var(--chart-3)"
          strokeWidth={2}
          dot={false}
          name="Active Users"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
