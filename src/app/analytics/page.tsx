'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, DollarSign, Eye, Clock } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import StatCard from '@/components/cards/StatCard';
import ChartCard from '@/components/cards/ChartCard';
import UserGrowthChart from '@/components/charts/UserGrowthChart';
import RevenueChart from '@/components/charts/RevenueChart';
import PerformanceChart from '@/components/charts/PerformanceChart';
import { revenueData } from '@/mock-data/analytics';
import { formatCurrency, formatNumber } from '@/utils/helpers';

export default function AnalyticsPage() {
  const stats = [
    { title: 'Page Views', value: formatNumber(284750), change: 12.5, icon: Eye, iconColor: 'text-blue-600', iconBgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Unique Visitors', value: formatNumber(45230), change: 8.3, icon: Users, iconColor: 'text-purple-600', iconBgColor: 'bg-purple-100 dark:bg-purple-900/30' },
    { title: 'Bounce Rate', value: '32.4%', change: -2.1, icon: TrendingUp, iconColor: 'text-amber-600', iconBgColor: 'bg-amber-100 dark:bg-amber-900/30' },
    { title: 'Avg. Session', value: '4m 32s', change: 15.2, icon: Clock, iconColor: 'text-emerald-600', iconBgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Analytics</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your platform&apos;s performance and user engagement.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => <StatCard key={stat.title} {...stat} index={i} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="User Growth" subtitle="Monthly user acquisition">
          <UserGrowthChart height={280} />
        </ChartCard>
        <ChartCard title="Revenue Analytics" subtitle="Monthly revenue breakdown">
          <RevenueChart height={280} />
        </ChartCard>
      </div>

      <ChartCard title="System Performance" subtitle="Real-time performance metrics">
        <PerformanceChart height={250} />
      </ChartCard>
    </motion.div>
  );
}
