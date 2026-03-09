'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { revenueData } from '@/mock-data/analytics';

interface RevenueChartProps {
  height?: number;
}

export default function RevenueChart({ height = 300 }: RevenueChartProps) {
  const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}K`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={revenueData}>
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
          tickFormatter={formatCurrency}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--popover)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
          labelStyle={{ color: 'var(--foreground)' }}
          formatter={(value: any) => [`$${Number(value)?.toLocaleString() || 0}`, '']}
        />
        <Legend />
        <Bar
          dataKey="revenue"
          fill="var(--chart-1)"
          radius={[4, 4, 0, 0]}
          name="Revenue"
        />
        <Bar
          dataKey="expenses"
          fill="var(--chart-4)"
          radius={[4, 4, 0, 0]}
          name="Expenses"
        />
        <Bar
          dataKey="profit"
          fill="var(--chart-2)"
          radius={[4, 4, 0, 0]}
          name="Profit"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
