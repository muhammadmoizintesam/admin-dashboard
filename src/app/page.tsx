'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  Activity,
  Server,
  Cpu,
  HardDrive,
} from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import StatCard from '@/components/cards/StatCard';
import ChartCard from '@/components/cards/ChartCard';
import WidgetCard from '@/components/cards/WidgetCard';
import UserGrowthChart from '@/components/charts/UserGrowthChart';
import PerformanceChart from '@/components/charts/PerformanceChart';
import RevenueChart from '@/components/charts/RevenueChart';
import RecentUsersWidget from '@/components/widgets/RecentUsersWidget';
import ActivityFeedWidget from '@/components/widgets/ActivityFeedWidget';
import TaskOverviewWidget from '@/components/widgets/TaskOverviewWidget';
import ServerStatusWidget from '@/components/widgets/ServerStatusWidget';
import SystemHealthWidget from '@/components/widgets/SystemHealthWidget';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { formatCurrency, formatNumber } from '@/utils/helpers';
import { revenueData, serverMetrics } from '@/mock-data/analytics';

export default function DashboardPage() {
  const { settings } = useSettings();
  const { widgetVisibility } = settings;

  const stats = [
    {
      title: 'Total Revenue',
      value: formatCurrency(revenueData[revenueData.length - 1].revenue * 12),
      change: 12.5,
      icon: DollarSign,
      iconColor: 'text-emerald-600',
      iconBgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    {
      title: 'Active Users',
      value: formatNumber(4750),
      change: 15.3,
      icon: Users,
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Total Orders',
      value: formatNumber(2847),
      change: -2.4,
      icon: ShoppingCart,
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Growth Rate',
      value: '+23.5%',
      change: 8.1,
      icon: TrendingUp,
      iconColor: 'text-amber-600',
      iconBgColor: 'bg-amber-100 dark:bg-amber-900/30',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      {widgetVisibility.revenueStats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} index={index} />
          ))}
        </div>
      )}

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {widgetVisibility.userGrowth && (
          <ChartCard title="User Growth" subtitle="Monthly user acquisition trends">
            <UserGrowthChart height={280} />
          </ChartCard>
        )}
        {widgetVisibility.performance && (
          <ChartCard title="Revenue Overview" subtitle="Monthly revenue performance">
            <RevenueChart height={280} />
          </ChartCard>
        )}
      </div>

      {/* Charts Row 2 */}
      {widgetVisibility.performance && (
        <ChartCard title="System Performance" subtitle="Real-time server metrics">
          <PerformanceChart height={200} />
        </ChartCard>
      )}

      {/* Widgets Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {widgetVisibility.recentUsers && <RecentUsersWidget />}
        {widgetVisibility.activityFeed && <ActivityFeedWidget />}
        {widgetVisibility.taskOverview && <TaskOverviewWidget />}
      </div>

      {/* Status Widgets */}
      <div className="grid gap-6 lg:grid-cols-2">
        {widgetVisibility.serverStatus && <ServerStatusWidget />}
        {widgetVisibility.systemHealth && <SystemHealthWidget />}
      </div>
    </motion.div>
  );
}
