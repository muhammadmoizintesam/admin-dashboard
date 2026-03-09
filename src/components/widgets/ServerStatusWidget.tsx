'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, HardDrive, Wifi, Activity } from 'lucide-react';
import { serverMetrics } from '@/mock-data/analytics';
import { Progress } from '@/components/ui/progress';
import WidgetCard from '@/components/cards/WidgetCard';

export default function ServerStatusWidget() {
  const metrics = [
    {
      label: 'CPU Usage',
      value: serverMetrics.cpuUsage,
      icon: Cpu,
      color: serverMetrics.cpuUsage > 80 ? 'text-red-500' : 'text-emerald-500',
    },
    {
      label: 'Memory Usage',
      value: serverMetrics.memoryUsage,
      icon: HardDrive,
      color: serverMetrics.memoryUsage > 80 ? 'text-red-500' : 'text-blue-500',
    },
    {
      label: 'Disk Usage',
      value: serverMetrics.diskUsage,
      icon: HardDrive,
      color: serverMetrics.diskUsage > 80 ? 'text-red-500' : 'text-purple-500',
    },
  ];

  return (
    <WidgetCard title="Server Status" subtitle="Real-time server metrics">
      <div className="space-y-4">
        {/* Status Header */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              All Systems Operational
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{serverMetrics.uptime}% uptime</span>
        </div>

        {/* Metrics Grid */}
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-sm">{metric.label}</span>
                </div>
                <span className="text-sm font-medium">{metric.value}%</span>
              </div>
              <Progress
                value={metric.value}
                className={`h-1.5 ${
                  metric.value > 80 ? '[&>div]:bg-red-500' : '[&>div]:bg-primary'
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Response Time</span>
            </div>
            <p className="text-lg font-semibold">{serverMetrics.responseTime}ms</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <Wifi className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Connections</span>
            </div>
            <p className="text-lg font-semibold">{serverMetrics.activeConnections.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}
