'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  index?: number;
}

export default function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon: Icon,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary/10',
  index = 0,
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        delay: index * 0.1,
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 30,
      },
    },
  };

  const iconVariants = {
    hidden: { rotate: -180, scale: 0 },
    visible: {
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: index * 0.1 + 0.2,
      },
    },
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const valueVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 250,
        damping: 20,
        delay: index * 0.1 + 0.1,
      },
    },
  };

  const changeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        delay: index * 0.1 + 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      layout
    >
      <Card className="relative overflow-hidden group">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <motion.p
                className="text-sm font-medium text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {title}
              </motion.p>
              <motion.p
                variants={valueVariants}
                className="text-2xl font-bold tracking-tight"
              >
                {value}
              </motion.p>
              {change !== undefined && (
                <motion.div
                  variants={changeVariants}
                  className="flex items-center gap-1.5"
                >
                  <motion.span
                    className={cn(
                      'flex items-center text-sm font-medium',
                      isPositive && 'text-emerald-600 dark:text-emerald-400',
                      isNegative && 'text-red-600 dark:text-red-400',
                      !isPositive && !isNegative && 'text-muted-foreground'
                    )}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {isPositive && (
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <TrendingUp className="w-4 h-4 mr-0.5" />
                      </motion.div>
                    )}
                    {isNegative && (
                      <motion.div
                        animate={{ y: [0, 2, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <TrendingDown className="w-4 h-4 mr-0.5" />
                      </motion.div>
                    )}
                    {isPositive && '+'}
                    {change}%
                  </motion.span>
                  <span className="text-sm text-muted-foreground">{changeLabel}</span>
                </motion.div>
              )}
            </div>
            <motion.div
              className={cn('p-3 rounded-xl relative', iconBgColor)}
              variants={iconVariants}
              whileHover="hover"
            >
              {/* Icon glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-primary/20 blur-md"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <Icon className={cn('w-6 h-6 relative z-10', iconColor)} />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
