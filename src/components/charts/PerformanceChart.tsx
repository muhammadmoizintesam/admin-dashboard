'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { performanceData } from '@/mock-data/analytics';

interface PerformanceChartProps {
  height?: number;
}

export default function PerformanceChart({ height = 300 }: PerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={performanceData}>
        <defs>
          <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="time"
          className="text-xs"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
          axisLine={{ stroke: 'hsl(var(--border))' }}
        />
        <YAxis
          className="text-xs"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
          axisLine={{ stroke: 'hsl(var(--border))' }}
          domain={[0, 100]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="cpu"
          stroke="hsl(var(--chart-1))"
          fillOpacity={1}
          fill="url(#colorCpu)"
          strokeWidth={2}
          name="CPU %"
        />
        <Area
          type="monotone"
          dataKey="memory"
          stroke="hsl(var(--chart-2))"
          fillOpacity={1}
          fill="url(#colorMemory)"
          strokeWidth={2}
          name="Memory %"
        />
        <Area
          type="monotone"
          dataKey="network"
          stroke="hsl(var(--chart-3))"
          fillOpacity={1}
          fill="url(#colorNetwork)"
          strokeWidth={2}
          name="Network %"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
