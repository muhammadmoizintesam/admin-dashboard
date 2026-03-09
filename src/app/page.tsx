'use client';

import React from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 15,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

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
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="space-y-6"
    >
      {/* Breadcrumb */}
      <motion.div variants={slideInFromLeft}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>

      {/* Page Header */}
      <motion.div
        variants={slideInFromLeft}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <motion.h1
            className="text-2xl font-bold tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
          >
            Dashboard
          </motion.h1>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
          >
            Welcome back! Here&apos;s an overview of your platform.
          </motion.p>
        </div>
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
        >
          <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</span>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      {widgetVisibility.revenueStats && (
        <motion.div
          variants={itemVariants}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={scaleIn}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <StatCard {...stat} index={index} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Charts Row 1 */}
      <motion.div
        variants={itemVariants}
        className="grid gap-6 lg:grid-cols-2"
      >
        {widgetVisibility.userGrowth && (
          <motion.div
            variants={scaleIn}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              transition: { type: "spring", stiffness: 200, damping: 25 }
            }}
          >
            <ChartCard title="User Growth" subtitle="Monthly user acquisition trends">
              <UserGrowthChart height={280} />
            </ChartCard>
          </motion.div>
        )}
        {widgetVisibility.performance && (
          <motion.div
            variants={scaleIn}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              transition: { type: "spring", stiffness: 200, damping: 25 }
            }}
          >
            <ChartCard title="Revenue Overview" subtitle="Monthly revenue performance">
              <RevenueChart height={280} />
            </ChartCard>
          </motion.div>
        )}
      </motion.div>

      {/* Charts Row 2 */}
      {widgetVisibility.performance && (
        <motion.div
          variants={scaleIn}
          whileHover={{
            scale: 1.01,
            boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
            transition: { type: "spring", stiffness: 150, damping: 30 }
          }}
        >
          <ChartCard title="System Performance" subtitle="Real-time server metrics">
            <PerformanceChart height={200} />
          </ChartCard>
        </motion.div>
      )}

      {/* Widgets Row */}
      <motion.div
        variants={itemVariants}
        className="grid gap-6 lg:grid-cols-3"
      >
        <AnimatePresence>
          {widgetVisibility.recentUsers && (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                transition: { type: "spring", stiffness: 250, damping: 20 }
              }}
            >
              <RecentUsersWidget />
            </motion.div>
          )}
          {widgetVisibility.activityFeed && (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                transition: { type: "spring", stiffness: 250, damping: 20 }
              }}
            >
              <ActivityFeedWidget />
            </motion.div>
          )}
          {widgetVisibility.taskOverview && (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                transition: { type: "spring", stiffness: 250, damping: 20 }
              }}
            >
              <TaskOverviewWidget />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Status Widgets */}
      <motion.div
        variants={itemVariants}
        className="grid gap-6 lg:grid-cols-2"
      >
        <AnimatePresence>
          {widgetVisibility.serverStatus && (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                transition: { type: "spring", stiffness: 200, damping: 25 }
              }}
            >
              <ServerStatusWidget />
            </motion.div>
          )}
          {widgetVisibility.systemHealth && (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                transition: { type: "spring", stiffness: 200, damping: 25 }
              }}
            >
              <SystemHealthWidget />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
